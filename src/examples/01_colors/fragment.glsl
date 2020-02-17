#version 100
precision mediump float;

uniform float uTime;
uniform float uAnimation;
uniform vec2 uResolution;

varying vec2 vCoordinates;

void main() {
    vec3 color = vec3(0);

    // Example: Display uv coordinates
    color = vec3(vCoordinates.x, vCoordinates.y, 0.0); // simple solution
    color = vec3(vCoordinates, 0.0);                   // Using swizzling

    // Exercise 2: Display black and white a horizontal gradient
    color = vec3(vCoordinates.x);                       // expands 1 value to all componnts xyz

    // Exercise 2b: Display a diagonal gradient
    color = vec3((vCoordinates.x + vCoordinates.y) / 2.0);

    // Exercise 3: Make a "loading bar" driven by the uAnimation parameter
    color = (vCoordinates.x < uAnimation) ? vec3(1, 0, 1) : vec3(0);

    // Exercise 4: Draw a circle
    // Exercise 4b: Why is the circle acually an ellipse? could you fix it?
    float radius = uAnimation;
    vec2 coords = vCoordinates * 2.0 - 1.0;
    coords.x *= uResolution.x / uResolution.y; // 4b
    color = (length(coords) < radius) ? vec3(1.0): vec3(0.0); // 4a if/ternary
    color = vec3( 1.0 - step(radius, length(coords)) );       // 4a without branch
    color = vec3( smoothstep(radius, uAnimation - 0.01, length(coords)) ); // 4a with antialiasing

    gl_FragColor = vec4(color, 1.0);
}
