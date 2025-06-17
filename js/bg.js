export default class Background {
    constructor(app) {
        this.app = app;
        this.speed = 0.2; // Speed of the background
        this.img = document.getElementById('bg');
        this.deltaY = this.img.height - this.app.canvas.height;
        this.startY = this.img.height - this.app.canvas.height;
    }

    update(dt) {
        this.deltaY -= this.speed * dt;
        if (this.deltaY + this.app.canvas.height <= 0) {
            this.deltaY = this.startY;
        }
    }

    render() {
        this.app.ctx.drawImage(
            this.img, 
            0, this.deltaY, 
            this.img.width, this.app.canvas.height, 
            0, 0, 
            this.app.canvas.width, this.app.canvas.height
        );

        this.app.ctx.drawImage(
            this.img, 
            0, this.deltaY + this.img.height, 
            this.img.width, this.app.canvas.height, 
            0, 0, 
            this.app.canvas.width, this.app.canvas.height
        );
    }
}