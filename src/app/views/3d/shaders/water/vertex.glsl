precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 worldViewProjection;
uniform float time;
uniform float colorChange;
uniform float amplitudeChange;

varying vec4 vPosition;
varying float vColorChange;
varying float offset;


void main(void) {

  float y = mix(0.2, 0.02, amplitudeChange) * (sin(1. * (position.x + time * 0.7)) * 2. - 1.);

  vec3 newPos = vec3(position.x, position.y + y, position.z);

  vPosition = vec4(newPos, 1.0);

  offset = y;
  vColorChange = colorChange;

  gl_Position = worldViewProjection * vec4(newPos, 1.0);

}