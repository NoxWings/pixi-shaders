attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition() {
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

void main() {
    gl_Position = filterVertexPosition();
    vTextureCoord = aVertexPosition * (outputFrame.zw * inputSize.zw);
    vFilterCoord = vTextureCoord * inputSize.xy / outputFrame.zw;
}
