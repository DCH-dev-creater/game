import Menu from './menu.js';

export default class Score {
    constructor(app) {
        this.app = app;
        this.skipText = 'Press "Esc" to enter menu';
        this.gameOverText = 'Game Over';
        this.scoreText = 'Your score: ' + this.app.score;
        this.audio = document.getElementById("game-over");
        this.image = document.getElementById("over");
        this.playSound();
    }

    playSound() {
        this.audio.volume = 0.4;
        this.audio.loop = false;
        this.audio.play();
    }

    pauseSound() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
  
    update(dt) {
        if (this.app.keys['Escape']) {
            this.pauseSound();
            this.app.setAction(Menu);
        }
    }
    render() {
        this.app.ctx.drawImage(
            this.image,
            0, 0,
            this.app.canvas.width, this.app.canvas.height
        )
        // display "game over" text
        this.app.ctx.textBaseline = 'top';
        this.app.ctx.font = '74px Orbitron';
        this.app.ctx.fillStyle = '#ee4024';
        this.app.ctx.textAlign="center";
        this.app.ctx.fillText(this.gameOverText, this.app.canvas.width / 2, this.app.canvas.height / 2 - 100);

        this.app.ctx.font = '24px Goldman';
        this.app.ctx.fillStyle = '#fff';
        this.app.ctx.textAlign="right";
        this.app.ctx.fillText(this.skipText, this.app.canvas.width - 60, this.app.canvas.height - 50);

        this.app.ctx.font = '60px Goldman';
        this.app.ctx.textAlign="center";
        this.app.ctx.fillText(this.scoreText, this.app.canvas.width / 2, this.app.canvas.height / 2);
    }
}