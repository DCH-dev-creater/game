export default class Hud {
    constructor(app) {
        this.app = app
    }

    update(dt) {
       
    }

    render() {
        this.app.ctx.font = '30px Orbitron';
        this.app.ctx.fillStyle = '#fff';
        this.app.ctx.textAlign="right";
        this.app.ctx.fillText(this.app.score, this.app.canvas.width - 30, 40);
        this.app.ctx.textAlign="left";
    }
}