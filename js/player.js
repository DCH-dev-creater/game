import Bullet from "./bullet.js";

export default class Player {
    constructor(app) {
        this.app = app;
        this.player = document.getElementById('player');
        this.frame = {
            width: this.player.width / 9,
            height: this.player.height,
            currentFrameIndex: 4
        };
        this.scale = 0.1; // Scale factor for the player size
        this.width = this.app.canvas.width * this.scale;
        this.height = this.width * (this.player.height / this.frame.width); // Maintain aspect ratio

        this.x = (this.app.canvas.width / 2) - (this.width / 2);
        this.y = this.app.canvas.height - (this.height + 100);
        this.speedX = 0.4;
        this.speedY = 0.26;

        this.flameFrameWidth = 100;
        this.flameFrameHeight = 200;
        this.XindexFlame = 0;
        this.YindexFlame = 1;
        this.imageFlame = document.getElementById("flame");

        this.bullets = [];
        this.intervalShoot = 150;
        this.countTime = 200;

        this.hitbox1 = {
            x: this.x + this.width * 0.45,
            y: this.y + 25,
            w: this.width * 0.1,
            h: this.height * 0.8
        }
        this.hitbox2 = {
            x: this.x + this.width * 0.08,
            y: this.y + this.height * 0.58,
            w: this.width * 0.84,
            h: this.height * 0.18
        }

        this.live = true;
    }

    update(dt) {
        if (this.app.keys['ArrowLeft']) {
            if (this.x > 0) {
                this.x -= this.speedX * dt;
                this.hitbox1.x -= this.speedX * dt;
                this.hitbox2.x -= this.speedX * dt;
            }
            this.frame.currentFrameIndex -= 1;
            if (this.frame.currentFrameIndex < 0) this.frame.currentFrameIndex = 0;
        } else {
            if (this.frame.currentFrameIndex < 4){
                this.frame.currentFrameIndex += 1;
            }
        }
        if (this.app.keys['ArrowRight']) {
            if (this.x + this.width < this.app.canvas.width) {
                this.x += this.speedX * dt;
                this.hitbox1.x += this.speedX * dt;
                this.hitbox2.x += this.speedX * dt;
            }
            this.frame.currentFrameIndex += 1;
            if (this.frame.currentFrameIndex > 8) this.frame.currentFrameIndex = 8;
        } else {
            if (this.frame.currentFrameIndex > 4 && this.frame.currentFrameIndex <= 8) {
                this.frame.currentFrameIndex -= 1;
            }
        }
        if (this.app.keys['ArrowUp']) {
            if (this.y > 50) {
                this.y -= this.speedY * dt;
                this.hitbox1.y -= this.speedY * dt;
                this.hitbox2.y -= this.speedY * dt;
            }
            this.YindexFlame = 0
        } else {
            if (this.YindexFlame === 0) this.YindexFlame = 1
        }
        if (this.app.keys['ArrowDown']) {
            if (this.y + this.width + 30 < this.app.canvas.height) {
                this.y += this.speedY * dt;
                this.hitbox1.y += this.speedY * dt;
                this.hitbox2.y += this.speedY * dt;
            }
            this.YindexFlame = 2
        } else {
            if (this.YindexFlame === 2) this.YindexFlame = 1
        }

        this.XindexFlame += 1
        if (this.XindexFlame > 24) this.XindexFlame = 0


        if (this.app.keys[' ']) {
            if (this.countTime > this.intervalShoot) {
                this.bullets.push(
                    new Bullet(
                        this.app, 
                        this.x + this.width / 2,
                        this.y,
                        this.width
                    )
                );
                this.countTime = 0
            }
            this.countTime += dt 
        }else{
            this.countTime = 200
        }

        this.bullets.forEach((bullet, index) => {
            if (bullet.position.y + bullet.height < 0) {
                this.bullets.splice(index, 1)
            }
            bullet.update(dt)
        })
    }

    render() {
        this.bullets.forEach((bulet) => {
            bulet.render()
        })
        this.app.ctx.drawImage(
            this.imageFlame,
            this.flameFrameWidth * this.XindexFlame, this.flameFrameHeight * this.YindexFlame,
            this.flameFrameWidth, this.flameFrameHeight,
            ((this.x + this.width / 2) - (this.width * 0.125)) - (this.width * 0.06) , this.y + this.height - (this.height * 0.14),
            this.width * 0.25, this.height / 3
        )
        this.app.ctx.drawImage(
            this.imageFlame,
            this.flameFrameWidth * this.XindexFlame, this.flameFrameHeight * this.YindexFlame,
            this.flameFrameWidth, this.flameFrameHeight,
            ((this.x + this.width / 2) - (this.width * 0.125)) + (this.width * 0.06), this.y + this.height - (this.height * 0.14),
            this.width * 0.25, this.height / 3
        )

        this.app.ctx.drawImage(
            this.player,
            this.frame.width * this.frame.currentFrameIndex, 0,
            this.frame.width, this.frame.height,
            this.x, this.y,
            this.width, this.height
        );

        // this.app.ctx.fillStyle = "red";
        // this.app.ctx.fillRect(this.hitbox1.x, this.hitbox1.y, this.hitbox1.w, this.hitbox1.h)
        // this.app.ctx.fillRect(this.hitbox2.x, this.hitbox2.y, this.hitbox2.w, this.hitbox2.h)
    }
}