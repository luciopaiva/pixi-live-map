
import * as PIXI from "pixi.js";

const MOBILE_COUNT = 10_000;

export default class App {

    app: PIXI.Application;
    mobiles: PIXI.Sprite[] = [];

    constructor(app: PIXI.Application) {
        this.app = app;

        const texture = this.makeArrowTexture();
        this.makeMobiles(texture);
        this.app.ticker.add(this.update.bind(this));
    }

    update() {
        for (const mobile of this.mobiles) {
            mobile.angle += 10;
        }
    }

    makeMobiles(texture: PIXI.RenderTexture) {
        this.mobiles = [];
        for (let i = 0; i < MOBILE_COUNT; i++) {
            const mobile = new PIXI.Sprite(texture);
            mobile.roundPixels = true;
            mobile.anchor.set(0.5);
            mobile.position.set(Math.random() * this.app.view.width, Math.random() * this.app.view.height);
            mobile.angle = Math.random() * 360;
            mobile.scale.set(0.2);
            this.app.stage.addChild(mobile);
            this.mobiles.push(mobile);
        }
    }

    makeArrowTexture(): PIXI.RenderTexture {
        const arrow = new PIXI.Graphics();

        arrow.beginFill(0x000088);
        arrow.lineStyle(4, 0xaaaaff, 1);

        arrow.moveTo(100, 100);
        arrow.lineTo(140, 200);
        arrow.lineTo(100, 180);
        arrow.lineTo(60, 200);
        arrow.closePath();
        arrow.endFill();

        const texture = this.app.renderer.generateTexture(arrow, PIXI.SCALE_MODES.LINEAR, 1);
        arrow.destroy();  // graphics no longer needed
        return texture;
    }
}
