#version 100
precision mediump float;

uniform float uTime;
uniform float uAnimation;
uniform vec2 uResolution;

varying vec2 vCoordinates;

void main() {
    vec3 color = vec3(0);

    // Example: Display uv coordinates

    // Exercise 2: Display black and white a horizontal gradient

    // Exercise 2b: Display a diagonal gradient

    // Exercise 3: Make a "loading bar" driven by the uAnimation parameter

    // Exercise 4: Draw a circle
    // Exercise 4b: Why is the circle acually an ellipse? could you fix it?

    gl_FragColor = vec4(color, 1.0);
}
