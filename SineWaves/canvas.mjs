// Import Dat.gui
// const dat = require('dat.gui');
import dat from 'dat.gui';

const gui = new dat.GUI();

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

// Clear screen function
function clearScreen() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);
for (let i = 0; i < canvas.width; i++) {
    const amplitude = 100;
    const period = 0.007;
    ctx.lineTo(i, canvas.height / 2 + Math.sin(i * period) * amplitude);
}
ctx.stroke();