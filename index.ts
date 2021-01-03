
import * as PIXI from "pixi.js";
import App from "./app";

const app = new PIXI.Application({
    antialias: true,
    view: document.getElementById("map") as HTMLCanvasElement,
    width: 800,
    height: 600,
});

app.loader.load(() => new App(app));
