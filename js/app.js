import Game from './game.js';

class App {
    constructor() {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keys = {};
        this.initInput();
        this.setAction(Game);
        this.run();
    }

    initInput() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    checkKeyPress(key) {
        let isKeyPressed = this.keys[key] || false;
        this.lastKeyState[key] = this.lastKeyState || {};

        if (typeof this.lastKeyState[key] === 'undefined') {
            this.lastKeyState[key] = isKeyPressed;
            return false;
        }

        if (this.lastKeyState[key] !== isKeyPressed) {
            this.lastKeyState[key] = isKeyPressed;
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