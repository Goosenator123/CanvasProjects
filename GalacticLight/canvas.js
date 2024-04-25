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
const colorArray = [
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
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();
    }
}

// Clear screen function
let opacity = 1;
function clearScreen() {
    // ctx.beginPath();
    ctx.fillStyle = `rgba(10, 10, 10, ${opacity}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.closePath();
}

// Get random number function
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Implementation
let lights;
function init() {
    lights = [];
    let spawnCount = canvas.width * canvas.height / 500;
    let margin = canvas.width * canvas.height / canvas.width + canvas.height;

    for (let i = 0; i < spawnCount; i++) {
        const canvasWidth = canvas.width + margin;
        const canvasHeight = canvas.height + margin;
        const x = Math.random() * canvasWidth - canvasWidth / 2;
        const y = Math.random() * canvasHeight - canvasHeight / 2;
        const color = colorArray[randomIntFromRange(0, colorArray.length)];
        const radius = 2 * Math.random();

        lights.push(new Light(x, y, radius, color));
    }
}

// Animation Loop
let radians = 0;
function animate() {
    requestAnimationFrame(animate); // Request the next animation frame
    clearScreen(); // Clear the screen

    // Save the current transformation state
    ctx.save();

    // Translate the canvas origin to the center of the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Rotate the canvas by the specified radians
    ctx.rotate(radians);

    // Iterate over each light and update its position or properties
    lights.forEach(light => {
        light.update(); // Update each light after each loop
    });

    // Restore the previously saved transformation state
    ctx.restore();

    // Increment the radians value to rotate the canvas gradually
    radians += 0.003;

    // Change bg color opacity depending on mouseDown
    if (mouseDown && opacity >= 0.03) {
        opacity -= 0.01;
    } else if (!mouseDown && opacity < 1) {
        opacity += 0.01;
    }
}


// Event listeners
window.addEventListener('resize', () => {
    setCanvasSize(); // Resize
    init(); // Re-initiate
})

let mouseDown = false;
window.addEventListener('mousedown', () => {
    mouseDown = true;
})

window.addEventListener('mouseup', () => {
    mouseDown = false;
})

init(); // Initiate
animate(); // Start animation loop