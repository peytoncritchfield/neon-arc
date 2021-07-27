varying vec4 vModelPosition;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // float curve = (sin(modelPosition.y / 6.5) * 20.0);
    // modelPosition.z += curve;

    float innerSquare = 400.0 - modelPosition.x * modelPosition.x;
    float curve = sqrt(innerSquare);
    modelPosition.z += curve;    

// float curve = abs(sin(modelPosition.y / 10.0));
// modelPosition.z += curve;
    

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vModelPosition = modelPosition;
}