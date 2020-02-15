#version 100
precision mediump float;

uniform float uTime;
uniform float uAnimation;
uniform float uBorderSmoothing;
uniform vec2 uResolution;

uniform sampler2D uTexture;

varying vec2 vCoordinates;

// EXCERCISE 1
// Make an animation
// when uAnimation == 0 the texture should be black
// when uAnimation == 1 the texture should be white
// in any point in between we should see some percentage of the
// of the noise moving from one color to the other
float exercise1(float noise) {
    return 0.0;
}

// EXCERCISE 2
// Same as the previous exercise but try to make things appear vertically
// For example the part on the top or bottom is the first last to appear
float exercise2(float noise) {
    return exercise1(noise);
}

// EXCERCISE 3
// We need a bit more of control.
// Right now the transition is a bit rough, try to use
// `uBorderSmoothing` parameter to add some blending on the edges.
float exercise3(float noise) {
    return exercise2(noise);
}

void main() {
    float noise = texture2D(uTexture, vCoordinates).r;
    vec3 color = vec3( exercise3(noise) );
    gl_FragColor = vec4(color, 1.0);
}
