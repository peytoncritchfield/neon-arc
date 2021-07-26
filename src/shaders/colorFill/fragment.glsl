uniform float uTime;

varying vec4 vModelPosition;


void main() 
{
    
    gl_FragColor = vec4(vModelPosition.y - 10.0 + uTime, 0.3, 0.8, 1.0);
}