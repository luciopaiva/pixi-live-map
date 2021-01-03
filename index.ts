
import * as PIXI from "pixi.js";
import {Other} from "./other";

const app = new PIXI.Application({
    antialias: true,
    view: document.getElementById("map") as HTMLCanvasElement,
});

function main() {
    new Other();
}

app.loader.load(main);
