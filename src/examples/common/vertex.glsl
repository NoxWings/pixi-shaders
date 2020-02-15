#version 100
precision mediump float;

attribute vec2 aVertexPosition;
attribute vec3 aColor;
attribute vec2 aCoordinates;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec3 vColor;
varying vec2 vCoordinates;

void main() {
    vColor = aColor;
    vCoordinates = aCoordinates;
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
}
