#define CROSS_WIDTH 2.0

uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec2 st = vUv * uResolution;

  float d = distance(st, uMouse) / min(uResolution.x, uResolution.y);

  float horizontal = smoothstep(CROSS_WIDTH, 0.0, abs(st.x - uMouse.x));
  float vertical = smoothstep(CROSS_WIDTH, 0.0, abs(st.y - uMouse.y));

  float crosshairs = max(horizontal, vertical) * 0.25;
  float fade = smoothstep(0.15, 0.8, d);

  vec4 reticle = vec4(crosshairs * fade);

  gl_FragColor = reticle;
}