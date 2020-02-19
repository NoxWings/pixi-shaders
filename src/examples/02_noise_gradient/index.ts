import { Application, Geometry, Shader, Mesh, Texture } from "pixi.js";
import * as dat from "dat.gui";
import vertexSource from "./vertex.glsl";
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
        uAnimation: 0.25,
        uBorderSmoothing: 0.15,
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

    const resize = () => {
        shader.uniforms.uResolution = [canvas.clientWidth, canvas.clientHeight];
        quad.scale.set(canvas.clientWidth, canvas.clientHeight);
    }

    resize();
    window.addEventListener("resize", resize);

    const gui = new dat.GUI();
    gui.add(shader.uniforms, "uAnimation", 0, 1, 0.01);
    gui.add(shader.uniforms, "uBorderSmoothing", 0, 1, 0.01);

    const cleanup = () => {
        gui.destroy();
        window.removeEventListener("resize", resize);
        app.destroy(false);
    }
    return cleanup;
}

export default setup;
