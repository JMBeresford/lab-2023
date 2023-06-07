uniform float uTime;
uniform float uDpr;

attribute vec3 aPositionEnd;

varying vec3 vPos;

float rand(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
}

void main() {
  float offset = 2500.0 * rand(position);
  float t = fract((uTime + offset) * 0.015);
  vec3 pos = mix(position, aPositionEnd, t);

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);
  vec4 modelViewPos = viewMatrix * modelPos;

  gl_Position = projectionMatrix * modelViewPos;
  gl_PointSize = uDpr * 35.0 / -modelViewPos.z;
  vPos = modelPos.xyz;
}