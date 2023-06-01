#define FADE_END 0.495
#define FADE_WIDTH 0.01

#define GLOW_END 0.385
#define GLOW_WIDTH 0.035

#define FOG_DENSITY 0.3

uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vPos;
varying float vFogDepth;

#pragma glslify: snoise3 = require('glsl-noise/simplex/3d');

float random(float x) {
  return fract(sin(x) * 43758.5453123);
}

void main() {
  float t = uTime * 0.25;
  vec2 transformedUv = vUv;

  transformedUv.y += t * 0.015;
  vec2 gridSt = fract(transformedUv * 100.0);
  vec2 st = abs(gridSt - 0.5);
  float gridX = smoothstep(FADE_END - FADE_WIDTH, FADE_END, st.x) * 1.25;
  gridX += smoothstep(FADE_END - FADE_WIDTH * 5.0, FADE_END, st.x);

  float gridY = smoothstep(FADE_END - FADE_WIDTH, FADE_END, st.y) * 1.25;
  gridY += smoothstep(FADE_END - FADE_WIDTH * 5.0, FADE_END, st.y);

  float camFade = exp(-FOG_DENSITY * FOG_DENSITY * vFogDepth * vFogDepth);

  vec2 glowSt = (transformedUv * 100.0) + 0.5;

  float colId = floor(glowSt.x);
  float colOffset = random(colId) * 10.0;
  float glowCol = max(0.01, pow(abs(sin(glowSt.y + colOffset + t)), 3.0));

  // handle opacity for vertical glow
  glowCol *= gridX * camFade;

  float rowId = floor(glowSt.y);
  float rowOffset = random(rowId) * 10.0;
  float glowRow = max(0.01, pow(abs(sin(glowSt.x + rowOffset + t)), 3.0));

  // handle opacity for horizontal glow
  glowRow *= gridY * camFade;

  float glow = 0.175 * camFade;
  glow += glowCol + glowRow;

  float opacity = glow;
  vec3 color = uColor * 1.25 * opacity;

  gl_FragColor = vec4(color, opacity);

  #include <tonemapping_fragment>
}