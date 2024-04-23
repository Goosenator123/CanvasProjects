// Referencing HTML canvas element
const canvas = document.querySelector('canvas');

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Set canvas size to full web page
function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
setCanvasSize(); // Set canvas size initially

// Color array
const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];

// Light class
class Light {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
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
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

// Implementation
let lights;
function init() {
    lights = [];

    for (let i = 0; i < 100; i++) {
        // lights.push()
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    clearScreen(); // Clear Screen
}

// Event listeners
window.addEventListener('resize', () => {
    setCanvasSize(); // Resize
    init(); // Re-initiate
})

init(); // Initiate
animate(); // Start animation loop