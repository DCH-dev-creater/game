import Star from './star.js';
import Background from './bg.js';
import Planet from './planet.js';

export default class Game {
    constructor(app) {
        this.app = app;
        this.width = 50;
        this.height = 100;
        this.player = {
            color: '#f00',
            x: (this.app.canvas.width / 2) - (this.width / 2),
            y: this.app.canvas.height - (this.height + 100),
        };
        this.stars = [];
        this.planets = [];
        this.init();
    }

    init() {
        this.background = new Background(this.app);
        this.planets.push(new Planet(this.app));
        for (let i = 0; i < 50; i++) {
            this.stars.push(new Star(null, this.app));
        }
    }

    update(dt) {
        if (this.app.keys['ArrowLeft']) {
            this.player.x -= 0.5 * dt;
        }
        if (this.app.keys['ArrowRight']) {
            this.player.x += 0.5 * dt;
        }
        if (this.app.keys['ArrowUp']) {
            this.player.y -= 0.5 * dt;
        }
        if (this.app.keys['ArrowDown']) {
            this.player.y += 0.5 * dt;
        }

        this.planets.forEach((planet, index) => {
            planet.update(dt);
            if (planet.y > this.app.canvas.height) {
                this.planets.splice(index, 1, new Planet(this.app));
            }
        });

        this.stars.forEach((star, index) => {
            star.update(dt);

            if (star.y > this.app.canvas.height) {
                this.stars.splice(index, 1, new Star(-10, this.app));
            }
        });

        this.background.update(dt);
    }

    render() {
        this.background.render();
        for (let star of this.stars) {
            star.render();
        }
        this.planets.forEach(planet => {
            planet.render();
        });

        this.app.ctx.fillStyle = this.player.color;
        this.app.ctx.fillRect(this.player.x, this.player.y, 50, 100);
        
        this.app.ctx.fillStyle = 'white';
        this.app.ctx.font = '20px Arial';
        this.app.ctx.fillText('Game Level 1', 10, 30);

        
    }
}