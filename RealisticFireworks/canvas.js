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

// Color Array
let colorArray = [
    '#9d0208',
    '#d00000',
    '#dc2f02',
    '#f48c06',
    '#f48c06'
];

// Setting variables
const gravity = 0.03;
const friction = 0.99;

// Particle Class
class Particle {
    constructor(x, y, radius, color, velocity, opacity) {
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.color = color,
        this.velocity = velocity,
        this.opacity = opacity
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.opacity -= 0.005; // Fade out effect
    }
}

// Clear screen function
function clearScreen() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

// Get random number function
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Implementation
let particles;
function init() {
    particles = []; // Clear particles
    animate(); // Start animation
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate); // Loop animation
    clearScreen(); // Clear screen

    particles.forEach((particle, index) => {
        // Check if particle is no longer visible
        if (particle.opacity > 0) {
            particle.update(); // Update
        } else {
            particles.splice(index, 1); // Erase particle from array
        }
    });
}

// Event listeners
window.addEventListener('resize', () => {
    setCanvasSize(); // Resize
    init(); // Re-initiate
});

// Execute upon user click
window.addEventListener('click', (event) => {
    // Set mouse coordinates
    mouse.x = event.x;
    mouse.y = event.y;

    // Set variables
    const particleCount = 2000;
    const angleIncrement = (Math.PI * 2) / particleCount;
    const power = 15;

    // Generate particles
    for (let i = 0; i < particleCount; i++) {
        // Set random color
        let color = colorArray[randomIntFromRange(0, colorArray.length)];

        // Assign particle properties
        particles.push(new Particle(mouse.x, mouse.y, 5, color, { 
            x: Math.cos(angleIncrement * i) * Math.random() * power, 
            y: Math.sin(angleIncrement * i) * Math.random() * power
        }, Math.random()));
    }
})

init(); // Initiate