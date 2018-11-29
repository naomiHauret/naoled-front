precision highp float;
 
varying vec4 vPosition;
varying float offset;

uniform sampler2D textureSampler;

#pragma loader: import {rgb2hsv} from '../utils/rgb2hsv.glsl';

void main(void) {
  
  vec3 color = vec3(.0, (0.5 + vPosition.y * 0.1) , 0.6);

  gl_FragColor = vec4(color, 0.8);
}