var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


var x = 150;
var y = 150;
var dt = 0;
var speedX = 0.5;
var speedY = 0.2;


function draw(time) {
    dt = time - dt;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff'
    ctx.font = '20px Arial';
    ctx.fillText('Canvas width: ' + canvas.width + ' , height: ' + canvas.height, 50, 50);
    ctx.fillText('Mil.Sec: ' + dt.toFixed(2) + 'ms', 50, 80);
    ctx.fillText('FPS: ' + (1000 / dt).toFixed(), 50, 110);

    ctx.fillStyle = '#FF0000';
    ctx.fillRect(x, y, 100, 100);
    
    x += speedX * dt;
    y += speedY * dt;

    if ( (x + 100 >= canvas.width) || (x <= 0) ) {
        speedX *= -1;
    }

    if ( (y + 100 >= canvas.height) || (y <= 0) ) {
        speedY *= -1;
    }

    requestAnimationFrame(draw);
    dt = time;
}



requestAnimationFrame(draw);


// var image = new Image();
// image.src = '../character/all.png';
// image.onload = function() {
//     ctx.drawImage(image, 80 * 3, 80 * 3, 80, 80, (canvas.width / 2), (canvas.height / 2), 280, 280);
// }

// ctx.drawImage(image, 0, 0, 80, 80, (canvas.width / 2), (canvas.height / 2), 80, 80);