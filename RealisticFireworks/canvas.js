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

// Set initial position of mouse
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

// Particle Class
class Particle {
    constructor(x, y, radius, color) {
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.color = color
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, thie.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();
    }
}

// Clear screen function
function clearScreen() {
    // ctx.beginPath();
    ctx.fillStyle = `rgba(10, 10, 10, ${opacity}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.closePath();
}

// Implementation
let particles;
function init() {
    particles = [];

    for (let i = 0; i < 400; i++) {
        // particles.push();
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    clearScreen();
}

// Event listeners
window.addEventListener('resize', () => {
    setCanvasSize(); // Resize
    init(); // Re-initiate
})