import { Application, Geometry, Shader, Mesh, Texture } from "pixi.js";
import * as dat from "dat.gui";
import vertexSource from "../common/vertex.glsl";
import fragmentSource from "./fragment.glsl";

const setup = (canvas: HTMLCanvasElement) => {
    const app = new Application({ view: canvas, resizeTo: canvas });

    const vertexPosition = [
        0, 1,
        1, 1,
        1, 0,
        0, 0
    ];

    const vertexUVs = [
        0, 0,
        1, 0,
        1, 1,
        0, 1
    ];

    const uniforms = {
        uTime: 0,
        uAnimation: 0.5,
        uBorderSmoothing: 0.15,
        uResolution: [canvas.clientWidth, canvas.clientHeight],
        uTexture: Texture.from("assets/textures/perlin_noise.png")
    };

    const geometry = new Geometry();
    geometry
        .addAttribute("aVertexPosition", vertexPosition, 2)
        .addAttribute("aCoordinates", vertexUVs, 2)
        .addIndex([0, 1, 2, 0, 2, 3]);

    const shader = Shader.from(vertexSource, fragmentSource, uniforms);
    const quad = new Mesh(geometry, shader);
    app.stage.addChild(quad);
    quad.position.set(0);

    const getTime = () => performance.now() / 1000;
    let startedAt = getTime();
    const update = () => {
        shader.uniforms.uTime = getTime() - startedAt;
    };

    app.ticker.add(update);

    const resize = () => {
        shader.uniforms.uResolution = [canvas.clientWidth, canvas.clientHeight];
        quad.scale.set(canvas.clientWidth, canvas.clientHeight);
    }

    resize();
    window.addEventListener("resize", resize);

    const controls = {
        resetTime: () => {
            startedAt = getTime();
        }
    }
    const gui = new dat.GUI();
    gui.add(controls, "resetTime")
    gui.add(shader.uniforms, "uTime", 0, undefined, 0.01).listen();
    gui.add(shader.uniforms, "uAnimation", 0, 1, 0.01);
    gui.add(shader.uniforms, "uBorderSmoothing", 0, 1, 0.01);

    const cleanup = () => {
        gui.destroy();
        app.ticker.remove(update);
        window.removeEventListener("resize", resize);
        app.destroy(false);
    }
    return cleanup;
}

export default setup;
