import { Application, Geometry, Shader, Mesh } from "pixi.js";
import vertexSource from "./vertex.glsl";
import fragmentSource from "./fragment.glsl";

const setup = (canvas: HTMLCanvasElement) => {
    const app = new Application({ view: canvas, resizeTo: canvas });

    const vertexPosition = [
        -100,  0  , // x, y
         0  , -100, // x, y
         100,  0    // x, y
    ];

    const vertexColors = [
        1, 0, 0, // r, g, b
        0, 1, 0, // r, g, b
        0, 0, 1  // r, g, b
    ];

    const geometry = new Geometry()
        .addAttribute("aVertexPosition", vertexPosition, 2)
        .addAttribute("aColor", vertexColors, 3);

    const shader = Shader.from(vertexSource, fragmentSource);

    const triangle = new Mesh(geometry, shader);
    triangle.scale.set(2);
    app.stage.addChild(triangle);

    const resize = () => {
        const x = canvas.clientWidth / 2;
        const y = canvas.clientHeight / 2;
        triangle.position.set(x, y);
    }
    resize();
    window.addEventListener("resize", resize);

    const cleanup = () => {
        window.removeEventListener("resize", resize);
        app.destroy(false);
    }
    return cleanup;
}

export default setup;
