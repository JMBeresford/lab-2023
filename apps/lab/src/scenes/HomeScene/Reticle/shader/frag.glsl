#define CROSS_WIDTH 1.0

#define INNER_CLUSTER_RADIUS 0.05
#define INNER_CLUSTER_WIDTH 0.0025

uniform vec2 uMouse;
uniform vec2 uMouseInnerCluster;
uniform vec2 uResolution;
uniform float uTime;
uniform float uHovered; // [0 <-> 1]
uniform sampler2D uReticleBase;
uniform sampler2D uReticleDashed;
uniform sampler2D uReticleHalf;

varying vec2 vUv;

mat2 rotate2d(float theta) {
  return mat2(cos(theta), -sin(theta), sin(theta), cos(theta));
}

vec2 getClusterSt() {
  vec2 st = (vUv * uResolution) - (uMouse);
  st /= min(uResolution.x, uResolution.y);
  st *= 10.0;

  return st;
}

float getCrosshairs(vec2 st) {
  float distance = distance(st, uMouse) / min(uResolution.x, uResolution.y);
  float horizontal = smoothstep(CROSS_WIDTH, 0.0, abs(st.x - uMouse.x));
  float vertical = smoothstep(CROSS_WIDTH, 0.0, abs(st.y - uMouse.y));

  float crosshairs = max(horizontal, vertical);
  float fade = smoothstep(0.15, 0.8, distance);

  return clamp(crosshairs * fade, 0.0, 1.0);
}

float getCluster() {
  vec2 baseSt = getClusterSt() + 0.5;
  float base = texture2D(uReticleBase, baseSt).r;

  float dashedRadius = 1.0 - 0.3 * uHovered;
  vec2 dashedSt = getClusterSt() * rotate2d(uTime * 0.5) * dashedRadius + 0.5;
  float dashed = texture2D(uReticleDashed, dashedSt).r * uHovered;

  float halfRadius = 1.0 - 0.45 * uHovered;
  vec2 halfSt = getClusterSt() * rotate2d(-uTime * 0.75) * halfRadius + 0.5;
  float halfCircle = texture2D(uReticleHalf, halfSt).r * uHovered;

  float cluster = base + dashed + halfCircle;

  return clamp(cluster, 0.0, 1.0);
}

void main() {
  vec2 st = vUv * uResolution;

  float crosshairs = getCrosshairs(st);
  float cluster = getCluster();

  float staticOpacityElements = crosshairs;
  staticOpacityElements *= 0.25;

  float dynamicOpacityElements = cluster;
  dynamicOpacityElements *= clamp(uHovered, 0.25, 1.0); // to be made into uniform

  vec4 reticle = vec4(staticOpacityElements + dynamicOpacityElements);

  gl_FragColor = reticle;
}