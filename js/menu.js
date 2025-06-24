import Game from "./game.js";
import Score from "./score.js";
import Background from "./bg.js";

export default class Menu {
    constructor(app) {
        this.app = app;
        this.mute = false;
        this.opacityDirection = 500;
        this.menuActiveOpacity = 0;
        this.menuIndex = 0;
        this.menuTitle = 'Game Menu';
        this.menuItems = [
            'Start game',
            'Scores'
        ];
        this.background = new Background(this.app)
        this.audio = document.getElementById("menu-music");
        this.playSound()
        // GameScene.pauseSound()
    }

    playSound() {
      this.audio.volume = 0.4;
      this.audio.loop = false
      this.audio.play();
    }

    pauseSound() {
        this.audio.pause();
        this.audio.currentTime = 0
    }

    update(dt) {
        // calculate active menu item opacity
        let opacityValue = this.menuActiveOpacity + dt / this.opacityDirection;
        if (opacityValue > 1 || opacityValue < 0) this.opacityDirection *= -1;
        this.menuActiveOpacity += dt / this.opacityDirection;

        // menu navigation
        if (this.app.checkKeyPress('ArrowDown')) { // DOWN arrow
            this.menuIndex++;
            this.menuIndex %= this.menuItems.length;
        } else if (this.app.checkKeyPress('ArrowUp')) { // UP arrow
            this.menuIndex--;
            if (this.menuIndex < 0) this.menuIndex = this.menuItems.length -1;
        }

        // menu item selected
        if (this.app.checkKeyPress('Enter')) {
            switch (this.menuIndex) {
            case 0: this.app.setAction(Game); this.pauseSound(); break;
            case 1: this.app.setAction(Score); this.pauseSound(); break;
            }
        }

        this.background.update(dt)

        if (this.app.checkKeyPress('m')) {
            if (this.mute === false) {
                this.pauseSound()
                this.mute = true
            } else {
                this.playSound()
                this.mute = false
            }
        }
    }

    render() {
        // fill menu background
        this.background.render();

        this.app.ctx.font = '20px Goldman';
        this.app.ctx.fillStyle = '#fff';
        this.app.ctx.textAlign="right";
        this.app.ctx.fillText('press "M" to music on/off', this.app.canvas.width - 30, 20);

        // draw menu title
        this.app.ctx.font = '48px Goldman';
        this.app.ctx.textBaseline = 'top';
        this.app.ctx.textAlign="center";
        this.app.ctx.fillStyle = '#fff';
        this.app.ctx.fillText(this.menuTitle, this.app.canvas.width / 2, 250);

        // draw menu items
        const itemHeight = 50, fontSize = 28;
        this.app.ctx.font = fontSize + 'px Orbitron';
        this.app.ctx.textAlign="center";
        for (const [index, item] of this.menuItems.entries()) {
            if (index === this.menuIndex) {
            this.app.ctx.globalAlpha = this.menuActiveOpacity;
            this.app.ctx.fillStyle = '#8a08d3';
            this.app.ctx.fillRect(0, this.app.canvas.height / 2 + index * itemHeight, this.app.canvas.width, itemHeight);
            }

            this.app.ctx.globalAlpha = 1;
            this.app.ctx.fillStyle = '#fff';
            this.app.ctx.fillText(item, this.app.canvas.width / 2, this.app.canvas.height / 2 + index * itemHeight + (itemHeight - fontSize) / 2);
        }
    }
  }