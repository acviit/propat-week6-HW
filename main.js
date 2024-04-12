var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

class HeartObject {
    constructor(x, y, size, color, speedX, speedY, rotationSpeed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.rotationSpeed = rotationSpeed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotationSpeed);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, this.size);
        for (let i = 1; i < 360; i++) {
            const x = this.size * Math.sin(i * Math.PI / 180) * Math.sin(this.rotationSpeed);
            const y = this.size * Math.sin(i * Math.PI / 180) * Math.cos(this.rotationSpeed);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

let hearts = [];

function createHeart(x, y) {
    const size = Math.floor(Math.random() * 200) + 20; 
    const color = 'red'; 
    const speedX = Math.random() * 2 - 1; 
    const speedY = Math.random() * 2 - 1;
    const rotationSpeed = Math.random() * 0.1 - 0.05;
    const heart = new HeartObject(x, y, size, color, speedX, speedY, rotationSpeed);
    hearts.push(heart);
    if (hearts.length > 100) {
        hearts.shift();
    }
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    createHeart(mouseX, mouseY);
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.draw();
        heart.move();
    });
    requestAnimationFrame(draw);
}

draw();
