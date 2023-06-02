uniform sampler2D uMask;

varying vec3 vPos;

void main() {
  float mask = texture2D(uMask, gl_PointCoord.xy).r;

  float opacity = mask * smoothstep(50.0, 10.0, distance(vPos, cameraPosition));
  opacity = min(opacity, 0.5);

  gl_FragColor = vec4(opacity);
}