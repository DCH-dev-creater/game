export default class GameLevel1 {
    constructor(app) {
        this.app = app;
        this.ctx = app.ctx;

        this.width = 50;
        this.height = 100;
        this.player = {
            color: '#f00',
            x: (this.app.canvas.width / 2) - (this.width / 2),
            y: this.app.canvas.height - (this.height + 100),
        };
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

        // Prevent player from going out of bounds
        // this.player.x = Math.max(0, Math.min(this.app.canvas.width - this.width, this.player.x));
        // this.player.y = Math.max(0, Math.min(this.app.canvas.height - this.height, this.player.y));

    }

    render() {

        this.ctx.clearRect(0, 0, this.app.canvas.width, this.app.canvas.height);
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, 50, 100);
        
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText('Game Level 1', 10, 30);
    }
}