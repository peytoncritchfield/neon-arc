uniform float uTime;

varying vec4 vModelPosition;
float r = 0.0;
float g = 0.0;
float b = 0.0;
float increment = 0.1;


    float getLocation(float value)
    {
        float startPosition = 10.0;
        float yPosition = -vModelPosition.x;

        return yPosition - startPosition + uTime * 2.0;

        // return value - 20.0;
        // return -vModelPosition.y - 10.0 + uTime * 2.0;
    }
    float getColor(float maximum, float color) 
    {

        if (color == 0.0) {
            if (maximum <= r) return maximum;
            r = r + increment;

            return getLocation(r);
        }

        if (color == 0.5) {
            if (maximum <= g) return maximum;
            g = g + increment;

            return getLocation(g);
        }

        if (color == 1.0) {
            if (maximum <= b) return maximum;
            b = b + increment;

            return getLocation(b);
        }


        // if (maximum <= coloring) return maximum;

        // return coloring = coloring + color;

        // return -vModelPosition.y - 10.0 + uTime * 2.0;


        // if (maximum >= coloring) return maximum;

        // return coloring++;
    }

void main() 
{
    // vec3 color = (0.271, 0.807, 0.227);

    // float colorFill = -vModelPosition.y - 10.0 + uTime * 2.0;

    // gl_FragColor = vec4(getColor(0.27, 0.0), getColor(0.80, 0.5), getColor(0.22, 1.0), 1.0);
    gl_FragColor = vec4(0.09, 0.47, 0.95, -vModelPosition.x - 50.0 + uTime * 10.0);

}

