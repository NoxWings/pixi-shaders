import { Application, Texture, AnimatedSprite, Filter } from "pixi.js";
import * as dat from "dat.gui";
import vertex from "./filter_vertex.glsl";
import fragment from "./filter_fragment.glsl";

const setup = (canvas: HTMLCanvasElement) => {
    const app = new Application({ view: canvas, resizeTo: canvas });
    app.loader.add("cards", "assets/textures/cards.json");

    const sprite = new AnimatedSprite([Texture.EMPTY]);
    sprite.anchor.set(0.5);

    app.stage.addChild(sprite);

    app.loader.load(() => {
        sprite.textures = [Texture.from("cards_back_swap_burning_00000.png")];
    });

    const uniforms = {
        uTime: 0,
        uAnimation: 0.5,
        uBorderWidth: 0.3,
        uBorderSmoothing: 0.50,
        uBorderColor: [1.0, 0.3, 0.08],
        uBorderColorMultiplier: 3.5,
        uResolution: [canvas.clientWidth, canvas.clientHeight],
        uTexture: Texture.from("assets/textures/perlin_noise.png")
    };

    const filter = new Filter(vertex, fragment, uniforms);
    sprite.filters = [filter];

    const getTime = () => performance.now() / 1000;
    let startedAt = getTime();
    const update = () => {
        filter.uniforms.uTime = getTime() - startedAt;
    };
    app.ticker.add(update);

    const resize = () => {
        const x = canvas.clientWidth / 2;
        const y = canvas.clientHeight / 2;
        sprite.position.set(x, y);
    }
    resize();
    window.addEventListener("resize", resize);

    const animationTime = 2500;
    const controls = {
        resetTime: () => {
            startedAt = getTime();
        },
        playUpdate: () => {
            filter.uniforms.uAnimation += app.ticker.elapsedMS / animationTime;
        },
        play: () => {
            controls.stop();
            app.ticker.add(controls.playUpdate);
            setTimeout(controls.stop, animationTime);
        },
        stop: () => {
            filter.uniforms.uAnimation = 0;
            app.ticker.remove(controls.playUpdate);
        },
        get borderColor() {
            return Array.from<number>(filter.uniforms.uBorderColor).map(x => x*256);
        },
        set borderColor(values: number[]) {
            filter.uniforms.uBorderColor[0] = values[0] / 255;
            filter.uniforms.uBorderColor[1] = values[1] / 255;
            filter.uniforms.uBorderColor[2] = values[2] / 255;
        }
    }
    const gui = new dat.GUI();
    gui.add(controls, "resetTime")
    gui.add(filter.uniforms, "uTime", 0, undefined, 0.01).listen();
    gui.add(controls, "play");
    gui.add(filter.uniforms, "uAnimation", 0, 1, 0.01).listen();
    gui.add(filter.uniforms, "uBorderWidth", 0, 1, 0.01);
    gui.add(filter.uniforms, "uBorderSmoothing", 0, 1, 0.01);
    gui.addColor(controls, "borderColor").listen();
    gui.add(filter.uniforms, "uBorderColorMultiplier", 0, 10, 0.01);

    const cleanup = () => {
        gui.destroy();
        window.removeEventListener("resize", resize);
        app.destroy(false);
    }
    return cleanup;
}

export default setup;
