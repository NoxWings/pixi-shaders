import { Application, Texture, AnimatedSprite } from "pixi.js";
import * as dat from "dat.gui";

const getTextureNames = (textureTemplate: string, start: number, end: number): string[] => {
    const framesRegex = /\{frame:([0-9]+)\}/;
    const match = textureTemplate.match(framesRegex);
    const padding = parseInt(match[1], 10);
    const frames = end - start;

    return Array(frames).fill(0).map((_, i) =>
        textureTemplate.replace(framesRegex, i.toString().padStart(padding, "0"))
    );
}

const setup = (canvas: HTMLCanvasElement) => {
    const app = new Application({ view: canvas, resizeTo: canvas });
    app.loader.add("cards", "assets/textures/cards.json");

    const sprite = new AnimatedSprite([Texture.EMPTY]);
    sprite.anchor.set(0.5);
    app.stage.addChild(sprite);
    sprite.animationSpeed = 1 / (60 / 15);
    sprite.loop = false;

    app.loader.load(() => {
        sprite.textures = [
            ...getTextureNames("cards_back_swap_burning_{frame:5}.png", 0, 14)
                .map(textureName => Texture.from(textureName)),
            Texture.EMPTY
        ];
    });

    const resize = () => {
        const x = canvas.clientWidth / 2;
        const y = canvas.clientHeight / 2;
        sprite.position.set(x, y);
    }
    resize();
    window.addEventListener("resize", resize);

    const controls = {
        play: () => sprite.gotoAndPlay(0),
        stop: () => sprite.gotoAndStop(0),
        get currentTexture () {
            return sprite.textures.indexOf(sprite.texture)
        },
        set currentTexture(value: number) {
            sprite.gotoAndStop(value)
        }
    };
    const gui = new dat.GUI();
    gui.add(controls, "play");
    gui.add(controls, "stop");
    gui.add(controls, "currentTexture", 0, 14, 1).listen();

    const cleanup = () => {
        gui.destroy();
        window.removeEventListener("resize", resize);
        app.destroy(false);
    }
    return cleanup;
}

export default setup;
