export default class Bullet {
constructor(app, x, y, width) {
        this.app = app;
        this.width = width;
        this.velocity = {
            y: 0.5
        }
        this.power = 10;
        this.image = document.getElementById("bullet");
        this.position = {
            x: x - this.width * 0.19,
            y: y + this.width / 4,
        }
        this.hitbox = {
            x: this.position.x + this.width * 0.035,
            y: this.position.y + this.width * 0.05,
            w: this.width / 3.5,
            h: this.width / 8
        }
    }
    update(dt) {
        this.position.y -= this.velocity.y * dt;
        this.hitbox.y = this.position.y + this.width * 0.05;
    }
    render() {
        this.app.ctx.drawImage(
            this.image,
            this.position.x, this.position.y, 
            (this.width * 0.13), this.width * 0.2
        );

        this.app.ctx.drawImage(
            this.image,
            this.position.x + (this.width * 0.25), this.position.y, 
            (this.width * 0.13), this.width * 0.2
        );
        
        
        // Uncomment the following lines to visualize the hitbox
        // this.app.ctx.strokeStyle = 'green';
        // this.app.ctx.lineWidth = 2;   
        // this.app.ctx.strokeRect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h);
    }
}