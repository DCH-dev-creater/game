export default class Star {
    constructor(y, app) {
        this.app = app;

        this.x = Math.random() * this.app.canvas.width;
        this.y = y === null ? Math.random() * this.app.canvas.height : y; // If y is null, generate a random y position
        this.size = Math.random() * 2 + 1; // Random size between 1 and 3
        this.speed = Math.random(); // Random speed between 4 and 9
        this.color = {
            rg: Math.random() * 150 + 105, // Random red-green value between 105 and 255
            a: Math.random() * 0.5 + 0.5 // Random alpha between 0.5 and 1
        }
    }

    update(dt) {
       this.y += Math.max(2, this.speed * dt);
    }

    render() {
        this.app.ctx.fillStyle = `rgba(${this.color.rg}, ${this.color.rg}, 255, ${this.color.a})`;
        this.app.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}