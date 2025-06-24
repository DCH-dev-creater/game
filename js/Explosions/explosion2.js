import Score from "../score.js";

export default class Explosion2 {
    constructor(app, x, y, scale = 1) {
        this.app = app;
        this.scale = scale
        this.Xindex = 0
        this.Yindex = 0
        this.frameSize = 64
        this.frameCanvasSize = this.frameSize * scale
        this.image = document.getElementById("exp2");
        this.position = {
            x: x - this.frameCanvasSize / 2,
            y: y - this.frameCanvasSize / 2,
        }
        
        this.delete = false
        this.delay = 0
        this.audio = new Audio('../sound/explosion.mp3');
        this.playSound()
    }

    playSound() {
        this.audio.volume = 0.4;
        this.audio.play();
    }

    update(dt) {
        if (this.delay > 10) {
            this.Xindex ++
            if (this.Xindex > 4) {
                this.Yindex ++
                if (this.Yindex > 4) {
                    this.delete = true
                    setTimeout(()=>this.app.setAction(Score), 2000)
                }
                this.Xindex = 0
            }
            this.delay = 0
        }
        this.delay += dt
    }

    render() {
        this.app.ctx.drawImage(this.image, this.frameSize * this.Xindex, this.frameSize * this.Yindex, this.frameSize, this.frameSize, this.position.x, this.position.y, this.frameCanvasSize, this.frameCanvasSize)
    }
}