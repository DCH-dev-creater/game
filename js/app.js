import Game from './game.js';
import Menu from './menu.js';

class App {
    constructor() {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.score = 0;
        this.initInput();
        this.setAction(Menu);
        this.run();
    }

    initInput() {
        this.keys = {};
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    checkKeyPress(keyCode) {
        let isKeyPressed = this.keys[keyCode] || false;
        this.lastKeyState = this.lastKeyState || {};

        if (typeof this.lastKeyState[keyCode] === 'undefined') {
            this.lastKeyState[keyCode] = isKeyPressed;
            return false;
        }

        if (this.lastKeyState[keyCode] !== isKeyPressed) {
            this.lastKeyState[keyCode] = isKeyPressed;
            return isKeyPressed;
        }

        return false;
    }

    setAction(actionName) {
        this.activeAction = new actionName(this);
    }

    update(dt) {
        this.activeAction.update(dt);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.activeAction.render();
    }

    run() {
        var dt = 0;
        var frame = (timestamp) => {
            requestAnimationFrame(frame);
            dt = timestamp - dt;
            
            this.update(dt);
            this.render(dt);
            
            dt = timestamp;
        };

        requestAnimationFrame(frame);
    }
}

new App();