varying float vHeight;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vHeight = (position.y + 1.0) * 0.5;
}