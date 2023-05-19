precision highp float;
#define MAX_STEPS (75)
#define MAX_DIST (12.0)

uniform vec2 uResolution;
#ifndef INTERSECTION_ONLY
uniform sampler2D uLowRes;
#endif
uniform samplerCube envMap;
uniform float uTime;
uniform float uSurfaceThreshold;
uniform float envMapIntensity;
uniform float uFov;
uniform float uMix;
uniform int uCount;
uniform int uAO;
uniform float[MAX_SPHERES] uRadii;
uniform float[MAX_SPHERES] uSeeds;
uniform float[MAX_SPHERES] uSpeeds;
uniform vec3[MAX_SPHERES] uEndPositions;
uniform vec3[MAX_SPHERES] uStartPositions;
uniform vec2 uMouse;
uniform float uMouseRadius;

varying vec2 vUv;

mat3 rotateY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
}

mat3 raymarchCamera(vec3 ro, vec3 ta, vec3 up) {
  vec3 cw = normalize(ta - ro);
  vec3 cp = up;
  vec3 cu = normalize(cross(cw, cp));
  vec3 cv = normalize(cross(cu, cw));
  return mat3(cu, cv, cw);
}

vec3 getEnvMap(vec3 camToPoint, vec3 norm) {
  vec3 n = normalize(norm);
  // n *= rotateY(uTime * 0.5);
  // camToPoint *= rotateY(uTime * 0.5);
  vec3 r = refract(n, camToPoint, 0.0);
  vec3 envColor = textureCube(envMap, r).rgb;
  float f0 = 0.02;
  vec3 f90 = vec3(1.0);
  vec3 f = f0 + (f90 - f0) * pow(1.0 - max(dot(n, r), 0.0), 3.0);

  vec3 diffuse = envColor * (1.0 / 3.141592) * envMapIntensity;
  vec3 fresnel = f * envColor;

  return diffuse + fresnel;
}

float smin(float a, float b) {
  float h = max(uMix - abs(a - b), 0.0);
  return min(a, b) - h * h * 0.25 / uMix;
}

vec4 getSphere(int i, vec3 mouse) {
  float radius = max(uRadii[i], 0.15);
  float seed = uSeeds[i];
  float speed = uSpeeds[i];
  vec3 start = uStartPositions[i] * speed;
  vec3 end = uEndPositions[i] * speed;

  float progress = smoothstep(0.0, 1.0, (sin((uTime + seed) * 0.85 * speed) + 1.0) * 0.5);
  // float distFromMidProgress = 1.0 - distance(0.5, progress) * 2.0;

  vec3 p = mix(start, end, progress);
  p *= rotateY(uTime * 0.15 * speed);
  float distanceFromMouse = length(p - mouse);
  vec3 dirFromMouse = normalize(p - mouse);
  p += dirFromMouse * uMouseRadius * smoothstep(1.0, 0.0, distanceFromMouse);

  // radius *= smoothstep(0.0, 1.0, distFromMidProgress);

  #ifdef INTERSECTION_ONLY
  radius = max(radius * 1.2, 0.065);
  #else
  radius *= smoothstep(0.2, 0.3, distance(p, cameraPosition));
  #endif

  return vec4(p, radius);
}

float getDist(vec3 p, vec3 mouse) {
  float mr = 0.25;
  #ifdef INTERSECTION_ONLY
  mr *= 1.2;
  #endif

  vec4 mainSphere = vec4(mouse, mr);
  float dm = length(p - mainSphere.xyz) - mainSphere.w;
  float d = dm;

  for (int i = 0; i < uCount; i++) {
    vec4 sphere = getSphere(i, mouse);
    float di = length(p - sphere.xyz) - sphere.w;
    d = smin(d, di);
  }

  return d;
}

float raymarchAO(vec3 pos, vec3 normal, vec3 mouse) {
  float occ = 0.0;
  float sca = 0.75;
  for (int i = 0; i < uAO; i++) {
    float hr = 0.01 + 0.12 * float(i) / float(uAO);
    vec3 aopos = pos + normal * hr;
    float dd = getDist(aopos, mouse);
    occ += (hr - dd) * sca;
    sca *= 0.95;
    if (occ > 0.35)
      break;
  }

  return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
}

float rayMarch(vec3 ro, vec3 rd, vec3 mouse) {
  float d0 = 0.0;
  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * d0;
    float dS = getDist(p, mouse);
    d0 += dS;
    float threshold = uSurfaceThreshold;
    #ifdef INTERSECTION_ONLY
    threshold = 0.005;
    #endif
    if (dS < threshold) {
      break;
    }

    if (d0 >= MAX_DIST) {
      return -1.0;
    }
  }
  return d0;
}

vec3 getNormal(vec3 p, vec3 mouse) {
  float d = getDist(p, mouse);
  vec2 e = vec2(0.001, 0.0);

  float xD = getDist(p + e.xyy, mouse);
  float yD = getDist(p + e.yxy, mouse);
  float zD = getDist(p + e.yyx, mouse);
  vec3 n = normalize(vec3(xD, yD, zD) - d) / e.x;

  return normalize(n);
}

vec3 getLight(vec3 p, vec3 mouse) {
  vec3 camToPoint = normalize(p - cameraPosition);
  vec3 N = getNormal(p, mouse);
  float ao = raymarchAO(p, N, mouse);

  return getEnvMap(camToPoint, N) * ao;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv *= uResolution.xy / uResolution.y;
  vec2 mUv = uMouse * uResolution.xy / uResolution.y;
  vec4 col = vec4(0.0);

  #ifndef INTERSECTION_ONLY
  vec4 intersected = texture2D(uLowRes, vUv);
  if (intersected.r == 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }
  #endif

  // cam init
  vec3 ro = cameraPosition;
  mat3 cam = raymarchCamera(ro, vec3(0.0), vec3(0.0, 1.0, 0.0));
  vec3 rd = cam * normalize(vec3(uv, uFov));

  // intersect mouse projected from camera with XY plane
  vec3 plane = vec3(0.0, 0.0, 1.0);
  vec3 mouseDir = cam * normalize(vec3(mUv, uFov));
  float a = dot(mouseDir, plane);
  float md = -dot(plane, ro) / a;
  vec3 mouse = ro + mouseDir * md;

  // raymarch
  float d = rayMarch(ro, rd, mouse);

  if (d == -1.0) {
    return;
  }

  // lighting
  vec3 p = ro + rd * d;
  vec4 light;
  #ifdef INTERSECTION_ONLY
  light = vec4(1.0);
  #else
  light = vec4(getLight(p, mouse), 1.0);
  #endif

  col += light;

  #if defined(TONE_MAPPING)
  col.rgb = toneMapping(col.rgb);
  #endif

  gl_FragColor = vec4(col);
}