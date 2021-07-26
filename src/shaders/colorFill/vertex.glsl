varying vec4 vModelPosition;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float curve = (modelPosition.y * modelPosition.y);
    modelPosition.z += curve;

    

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vModelPosition = modelPosition;
}