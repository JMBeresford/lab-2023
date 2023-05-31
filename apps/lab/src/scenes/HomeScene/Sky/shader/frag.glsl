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
  vec3 fogColor = mix(uColor1, uColor2, cnoise4(vec4(p, t)));

  float height = smoothstep(10.0, 40.0, vPos.y);
  vec3 color = mix(fogColor * 0.015, fogColor, height + fog);

  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
}