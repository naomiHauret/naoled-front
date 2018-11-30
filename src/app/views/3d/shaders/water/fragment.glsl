precision highp float;
 
varying vec4 vPosition;
varying float offset;
varying float vColorChange;

uniform sampler2D textureSampler;

#pragma loader: import {rgb2hsv} from '../utils/rgb2hsv.glsl';

void main(void) {
  
  vec4 colorClean = vec4(.0 , (0.5 + vPosition.y * 0.1), 0.6, 0.8);
  vec4 colorTrash = vec4(vec3(.15 ,0.14, 0.02) * (0.5 + vPosition.y * 0.1), 0.9);

  vec4 color = mix(colorClean, colorTrash, vColorChange); 

  gl_FragColor = color;
}