#define CROSS_WIDTH 1.0

uniform vec2 uMouse;
uniform vec2 uMouseInnerCluster;
uniform vec2 uResolution;
uniform float uTime;
uniform float uHovered; // [0 <-> 1]
uniform float uVisible; // [0 <-> 1]
uniform sampler2D uReticleBase;
uniform sampler2D uReticleDashed;
uniform sampler2D uReticleHalf;

varying vec2 vUv;

mat2 rotate2d(float theta) {
  return mat2(cos(theta), -sin(theta), sin(theta), cos(theta));
}

vec2 getReticleSt(vec2 mouse) {
  vec2 st = (vUv * uResolution) - (mouse);
  st /= 60.0;

  return st;
}

float getInnerCluster() {
  vec2 st = getReticleSt(uMouseInnerCluster) * 1.25 + 0.5;

  float innerCluster = texture2D(uReticleBase, st).r;

  return clamp(innerCluster, 0.0, 1.0);
}

float getCluster() {
  vec2 baseSt = getReticleSt(uMouse) + 0.5;
  float base = texture2D(uReticleBase, baseSt).r;

  float dashedRadius = 1.0 - 0.3 * uHovered;
  vec2 dashedSt = getReticleSt(uMouse) * rotate2d(uTime * 0.5) * dashedRadius + 0.5;
  float dashed = texture2D(uReticleDashed, dashedSt).r * uHovered;

  // float halfRadius = 1.0 - 0.45 * uHovered;
  // vec2 halfSt = getReticleSt(uMouse) * rotate2d(-uTime * 0.75) * halfRadius + 0.5;
  // float halfCircle = texture2D(uReticleHalf, halfSt).r * uHovered;

  float cluster = base + dashed;// + halfCircle;

  return clamp(cluster, 0.0, 1.0);
}

void main() {
  float innerCluster = getInnerCluster();
  float cluster = getCluster();

  float staticOpacityElements = innerCluster;
  staticOpacityElements *= 0.25;

  float dynamicOpacityElements = cluster;
  dynamicOpacityElements *= clamp(uHovered, 0.25, 1.0); // to be made into uniform

  vec4 reticle = vec4(staticOpacityElements + dynamicOpacityElements) * uVisible;

  gl_FragColor = reticle;
}