uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec3 vPos;

#pragma glslify: snoise4 = require('glsl-noise/simplex/4d');
#pragma glslify: cnoise4 = require('glsl-noise/classic/4d');

void main() {
  float t = uTime * 0.05;
  vec3 p = vPos * 0.015;

  float fog = snoise4(vec4(p, t));
  vec3 fogColor = mix(uColor1, uColor2, cnoise4(vec4(p, t * 2.5)));

  float height = smoothstep(0.0, 20.0, vPos.y);
  vec3 color = mix(uColor1 * 0.015, fogColor, height);
  color = mix(color, fogColor, fog);

  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
  // #include <encodings_fragment>
}