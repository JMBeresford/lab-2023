void main() {
  vec4 modelPos = modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;
}