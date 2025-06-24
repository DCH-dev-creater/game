import Star from './star.js';
import Background from './bg.js';
import Planet from './planet.js';
import Player from './player.js';
import Hud from './hud.js';

export default class Game {
    constructor(app) {
        this.app = app;
        this.width = 50;
        this.height = 100;
        this.stars = [];
        this.planets = [];
        this.init();
    }

    init() {
        this.hud = new Hud(this.app);
        this.player = new Player(this.app);
        this.background = new Background(this.app);
        this.planets.push(new Planet(this.app));
        for (let i = 0; i < 50; i++) {
            this.stars.push(new Star(null, this.app));
        }
    }

    update(dt) {
        this.player.update(dt);

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

        this.player.render();

        this.app.ctx.fillStyle = '#fff';
        this.app.ctx.font = '20px Orbitron';
        this.app.ctx.fillText('Game Level 1', 10, 30);


        this.hud.render()
    }
}