varying vec2 vUv;

#include <envmap_pars_vertex>

void main() {
  gl_Position = vec4(position, 1.0);
  vUv = uv;
}