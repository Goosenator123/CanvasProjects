// Selecting the first canvas element in HTML file
const canvas = document.querySelector('canvas');

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Set canvas size to full web page
function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
setCanvasSize(); // Set canvas size initially

// Mouse coordinates
let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

// Color Array
let colorArray = [
    '#9d0208',
    '#d00000',
    '#dc2f02',
    '#f48c06',
    '#f48c06'
];

//! Functions
class Particle { // Particle Class
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2; // Set random radians (starting point)
        this.velocity = 0.03; // Rate of change for the radians
        this.lastMouse = {
            x: x,
            y: y
        };

        //! Version 1
        this.distanceFromCenter = randomIntFromRange(50, 240); // Set random distance from center

        //! Version 2
        // this.distanceFromCenter = {
        //     x: randomIntFromRange(50, 240),
        //     y: randomIntFromRange(50, 240)
        // }
    }

    update() {
        const lastPoint = {
            x: this.x,
            y: this.y
        };

        // Move points over time
        this.radians += this.velocity; // Increase radians value over time

        // Gradually 
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.1;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.1;

        // Circular Motion
        //! Version 1
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

        //! Version 2
        // this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
        // this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;
        this.draw(lastPoint);
    }

    draw(lastPoint) {
        ctx.beginPath();

        //! Trail with lines
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineWidth = this.size;
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();

        //! Trail with circles
        // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        // ctx.fillStyle = this.color;
        // ctx.fill();

        ctx.closePath();
    }
}

// Random interger generating function
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Clear screen function
function clearScreen() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // For trail effect
    ctx.fill();
    ctx.closePath();
}

// Implementation
let particle;
function init() {
    particle = [];
    
    // Create particle
    for (let i = 0; i < 200; i ++) {
        const size = (Math.random() * 5) + 1; // Random size
        const color = colorArray[randomIntFromRange(0, colorArray.length)]; // Random color
        particle.push(new Particle(canvas.width / 2, canvas.height / 2, size, color));
    }
}

// Animate function
function animate() {
    requestAnimationFrame(animate); // Loop animation
    clearScreen(); // Clear Screen

    particle.forEach(particle => {
        particle.update();
    });
}

// Event listeners
window.addEventListener('mousemove', (event) => { // Reset Mouse coordinates when moved
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', () => {  // Reset canvas size when resized
    setCanvasSize();
})

init(); // Initiate program
animate() // Start animation