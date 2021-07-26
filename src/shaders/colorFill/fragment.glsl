uniform float uTime;

varying vec4 vModelPosition;


void main() 
{
    gl_FragColor = vec4(-vModelPosition.y - 5.0 + uTime * 2.0, 0.4, 0.8, 1.0);
}