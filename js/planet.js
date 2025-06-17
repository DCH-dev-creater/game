export default class Planet {
    constructor(app) {
        this.app = app;
        this.planet_1 = document.getElementById('planet_1');
        this.planet_2 = document.getElementById('planet_2');
        this.planet_3 = document.getElementById('planet_3');
        this.planets = [this.planet_1, this.planet_2, this.planet_3];
        this.planet = this.planets[Math.floor(Math.random() * this.planets.length)];
        this.radius = Math.random() * 200 + 50;
        this.x = Math.random() * (this.app.canvas.width - this.radius);
        this.y = -(this.radius * 2);
        this.speed = Math.random() * 0.3 + 0.1;

        this.color = `hsl(${Math.random() * 360}, 100.00%, 50.00%)`;

        this.cx = this.x + this.radius;
        this.cy = this.y + this.radius;
    }

    update(dt) {
        this.y += this.speed * dt;
        this.cy += this.speed * dt;
    }

    render() {
        this.app.ctx.save();
        this.app.ctx.drawImage(
            this.planet,
            this.x, this.y, 
            this.radius * 2, this.radius * 2
        );

        this.app.ctx.globalAlpha = 0.5;
        this.app.ctx.globalCompositeOperation = 'color';
        this.app.ctx.fillStyle = this.color;
        this.app.ctx.beginPath();
        this.app.ctx.arc(
            this.cx, 
            this.cy, 
            this.radius * 0.86, 
            0, Math.PI * 2
        );
        this.app.ctx.fill();
        this.app.ctx.closePath();
        this.app.ctx.globalAlpha = 1.0;
        this.app.ctx.restore();
    }
}