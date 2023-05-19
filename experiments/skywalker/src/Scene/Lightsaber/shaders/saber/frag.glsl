uniform vec3 uColor;

void main() {
  vec3 color = max(uColor, vec3(0.2));
  gl_FragColor = vec4(normalize(color), 1.0);

  gl_FragColor.xyz *= 5.0;
}