uniform float uTime;
uniform float uAnimation;
uniform float uBorderWidth;
uniform float uBorderSmoothing;
uniform vec3  uBorderColor;
uniform float uBorderColorMultiplier;
uniform vec2 uResolution;

uniform sampler2D uSampler;
uniform sampler2D uTexture;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

float smoothBand(float value, float smoothing, float t) {
    return smoothstep(value, value + smoothing, t * (1. + smoothing));
}

float getDissolved() {
    float noise = texture2D(uTexture, vFilterCoord).r;

    float width = max(uBorderWidth, 0.001);
    float smoothing = max(uBorderSmoothing, 0.001);

    float band = 1.0 - smoothBand(vFilterCoord.y, width, uAnimation);
    float dissolve = smoothBand(noise, smoothing, band);
    return dissolve;
}

void main(void){
    vec4 mainTexture = texture2D(uSampler, vTextureCoord);
    float dissolved = getDissolved();

    float contactSmoothing = max(0.01, 0.05 * uBorderSmoothing);
    float border = (dissolved - smoothstep(1.0 - contactSmoothing, 1.0, dissolved)) * mainTexture.a;
    vec4 borderColor = vec4(uBorderColor, 1) * border * uBorderColorMultiplier;

    vec4 color = mainTexture * dissolved + borderColor;

    gl_FragColor = color;
}
