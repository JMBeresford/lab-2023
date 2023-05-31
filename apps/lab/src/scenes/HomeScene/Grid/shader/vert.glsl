varying vec2 vUv;
varying vec3 vPos;
varying float vFogDepth;

void main() {
  vec4 modelPos = modelMatrix * vec4(position, 1.0);
  vec4 modelViewPos = viewMatrix * modelPos;
  gl_Position = projectionMatrix * modelViewPos;
  vUv = uv;
  vPos = modelPos.xyz;
  vFogDepth = -modelViewPos.z;
}