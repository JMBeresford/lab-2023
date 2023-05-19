uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;

varying float vHeight;

void main() {
  vec3 color = vec3(0.0);
  vec3 colors[5] = vec3[](uColor1, uColor2, uColor3, uColor4, uColor5);

  for (int i = 0; i < 5; i++) {
    float prevStop = max(float(i - 1) / 4.0, 0.0);
    float stop = float(i) / 4.0;

    color = mix(color, colors[i], smoothstep(prevStop, stop, vHeight));
  }

  // #if defined(TONE_MAPPING)
  // color = toneMapping(color);
  // #endif
  #include <encodings_fragment>

  gl_FragColor = vec4(color, 1.0);
}