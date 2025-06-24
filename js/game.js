import Star from './star.js';
import Background from './bg.js';
import Planet from './planet.js';
import Player from './player.js';
import Hud from './hud.js';
import Asteroid from "./asteroid.js"
import Menu from './menu.js';
import Explosion from "./Explosions/explosion.js"
import Explosion2 from "./Explosions/explosion2.js"
import Explosion3 from "./Explosions/explosion3.js"

export default class Game {
    constructor(app) {
        this.app = app;
        this.width = 50;
        this.height = 100;
        this.stars = [];
        this.planets = [];
        this.asteroids = [];
        this.explosions = [];
        this.time = 0;
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
        this.time += dt;
        this.player.update(dt);

        if (this.time > 250) {
            this.asteroids.push(new Asteroid(this.app))
            this.time = 0
        }

        this.asteroids.forEach((asteroid, indexAsteroid) => {
            if (asteroid.position.y > this.app.canvas.height) this.asteroids.splice(indexAsteroid, 1);
            
            asteroid.update(dt);

            this.player.bullets.forEach((bullet, indexBullet) => {
                if (
                    asteroid.hitbox.x < bullet.hitbox.x + bullet.hitbox.w &&
                    asteroid.hitbox.x + asteroid.hitbox.w > bullet.hitbox.x &&
                    asteroid.hitbox.y < bullet.hitbox.y + bullet.hitbox.h &&
                    asteroid.hitbox.y + asteroid.hitbox.h > bullet.hitbox.y
                ) {
                    asteroid.health -= bullet.power;
                    this.app.score += bullet.power;
                    if (asteroid.health < 1) {
                        this.explosions.push(
                            new Explosion(
                                this.app,
                                asteroid.position.x + asteroid.frameCanvasSize / 2,
                                asteroid.position.y + asteroid.frameCanvasSize / 2,
                                asteroid.scale * 2
                            )
                        )
                        this.player.bullets.splice(indexBullet, 1);
                        this.asteroids.splice(indexAsteroid, 1);
                    }else {
                        this.explosions.push(
                            new Explosion3(
                                this.app,
                                bullet.position.x + bullet.image.width  / 2,
                                bullet.position.y + 25,
                                0.2
                            )
                        );
                        this.player.bullets.splice(indexBullet, 1);
                    }

                    asteroid.velocity.y = asteroid.velocity.y - 1;  
                }
            })

            if (this.player.live) {
                if (
                    asteroid.hitbox.x < this.player.hitbox1.x + this.player.hitbox1.w &&
                    asteroid.hitbox.x + asteroid.hitbox.w > this.player.hitbox1.x &&
                    asteroid.hitbox.y < this.player.hitbox1.y + this.player.hitbox1.h &&
                    asteroid.hitbox.y + asteroid.hitbox.h > this.player.hitbox1.y
                ) {
                    this.player.live = false
                    // this.pauseSound()
                    this.explosions.push(
                        new Explosion2(
                            this.app,
                            this.player.x + this.player.width / 2,
                            this.player.y + this.player.height / 2,
                            4
                        )
                    )
                }

                if (
                    asteroid.hitbox.x < this.player.hitbox2.x + this.player.hitbox2.w &&
                    asteroid.hitbox.x + asteroid.hitbox.w > this.player.hitbox2.x &&
                    asteroid.hitbox.y < this.player.hitbox2.y + this.player.hitbox2.h &&
                    asteroid.hitbox.y + asteroid.hitbox.h > this.player.hitbox2.y
                ) {
                    this.player.live = false
                    // this.pauseSound()
                    this.explosions.push(
                        new Explosion2(
                            this.app,
                            this.player.x + this.player.width / 2,
                            this.player.y + this.player.height / 2,
                            4
                        )
                    )
                }
            }

        })

        this.explosions.forEach((explosion, index) => {
            if (explosion.delete) {
                this.explosions.splice(index, 1)
            }
            explosion.update(dt)
        })

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


        if (this.player.live) {
            if (this.app.keys['Escape']) {
                // this.pauseSound()
                this.app.setAction(Menu);
            } 
        }
    }

    render() {
        this.background.render();
        for (let star of this.stars) {
            star.render();
        }
        this.planets.forEach(planet => {
            planet.render();
        });

        if (this.player.live) this.player.render();

        if (this.asteroids.length > 0) {
            for (var i in this.asteroids) {
                this.asteroids[i].render()
            }
        }

        this.explosions.forEach((explosion) => {
            explosion.render()
        })

        this.app.ctx.fillStyle = '#fff';
        this.app.ctx.font = '20px Orbitron';
        this.app.ctx.fillText('Game Level 1', 10, 30);


        this.hud.render()
    }
}