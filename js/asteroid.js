export default class Asteroid {
    constructor(app) {
        this.app = app;
        this.image = document.getElementById('asteroid');
        this.health = 20;
        this.velocity = {
            x: Math.random() * 2 - 1, // Random horizontal speed between -2 and 2
            // y: Math.random() * 8 + 2
            y: 2
        }
        this.scale = Math.random() * 0.6 + 0.8
        this.position = {
            x: Math.random() * (this.app.canvas.width - 30),
            y: -70
        }
        this.rotateSpeed = Math.random() * 30 + 10;
        this.spriteXIndex = 0;
        this.spriteYIndex = 0;
        this.frameOriginSize = 64;
        this.frameCanvasSize = this.frameOriginSize * this.scale
        this.time = 0;

        this.hitbox = {
            x: this.position.x + 6,
            y: this.position.y + 5,
            w: this.frameCanvasSize - 12,
            h: this.frameCanvasSize - 10
        }
    }

    update(dt) {
        if (this.time > this.rotateSpeed) {
            this.spriteXIndex ++;
            if (this.spriteXIndex > 5) {
                this.spriteXIndex = 0;
                this.spriteYIndex ++;
                if (this.spriteYIndex > 5) {
                    this.spriteYIndex = 0;
                }
            }
            this.time = 0;
        }
        this.time += dt;
        
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        this.hitbox.y = this.position.y + 5
        this.hitbox.x = this.position.x + 6

    }

    render() {
        this.app.ctx.drawImage(
            this.image,
            this.frameOriginSize * this.spriteXIndex, this.frameOriginSize * this.spriteYIndex,
            this.frameOriginSize, this.frameOriginSize,
            this.position.x, this.position.y,
            this.frameCanvasSize, this.frameCanvasSize
        )

        // Hitbox visible
        // this.app.ctx.strokeStyle="rgba(255,0,0,1)";
        // this.app.ctx.strokeRect(this.hitbox.x,this.hitbox.y,this.hitbox.w,this.hitbox.h);
    }
}