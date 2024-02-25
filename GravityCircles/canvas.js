// Selecting the first canvas element in HTML file
const canvas = document.querySelector('canvas');

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size to full web page 
canvas.width = innerWidth;
canvas.height = innerHeight;

// Declaring variables
let gravity = 0.9;
let friction = 0.99;
let ball;
let ballArray = [];

// Color Array
let colorArray = [
    '#9d0208',
    '#d00000',
    '#dc2f02',
    '#f48c06',
    '#f48c06'
]

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Ball Object
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.color;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    this.update = () => {
        if ((this.y + this.radius + this.dy) > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

// Implementation
function init() {
    ballArray = []; // Clear array

    // Create and insert ball in array
    for (let i = 0; i < 300; i++) {
        // Setting random variables
        let radius = randomIntFromRange(8, 30);
        let x = randomIntFromRange(radius, (canvas.width - radius))
        let y = randomIntFromRange(radius, ((canvas.height - radius) + 1))
        let dx = randomIntFromRange(-8, 8);
        let dy = randomIntFromRange(5, 10);
        let color = colorArray[randomIntFromRange(1,5)];

        // Inserting ball Objects
        ballArray.push(ball = new Ball(x, y, dx, dy, radius, color));
    }
}

function animate() {
    // Make a loop
    requestAnimationFrame(animate);

    // Clear canvas
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // Move the ball Objects in ballArray
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

// Event listener
window.addEventListener('resize', () => {
    // Setting canvas size to full web page 
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

window.addEventListener('click', () => {
    init();
})

init();
animate();