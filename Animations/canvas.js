const canvas = document.querySelector('canvas'); // Selecting the first canvas element in HTML file

// Setting the size of the canvas to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Retrieving the 2D rendering context
const c = canvas.getContext('2d');

// Declaring variable
let x = Math.random() * innerWidth; // Set x coordinate
let y = Math.random() * innerHeight; // Set y coordinate
let dx = Math.floor((Math.random() - 0.5) * 20); // Set x velocity
let dy = Math.floor((Math.random() - 0.5) * 20); // Set y velocity
let radius = 50; // Set radius

// Animate function
function animate() {
    // Make a loop
    requestAnimationFrame(animate);

    // Clear drawing
    c.clearRect(0, 0, innerWidth, innerHeight);

    // Drawing a circle
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, true);
    c.strokeStyle = 'red';
    c.stroke();

    // Check if circle hit the side of the screen
    if (x > (innerWidth - radius) || x < (0 + radius)) {
        dx = -dx;
    }

    if (y > (innerHeight - radius) || y < (0 + radius)) {
        dy = -dy;
    }

    // Modify x coordinate
    x += dx;
    y += dy;
}

// Circle Object
let circle = new Circle(x, y);
function Circle(x, y) {
    this.x = x;
    this.y = y;

    this.draw = function() {

    }
}

animate();