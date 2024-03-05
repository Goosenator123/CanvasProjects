// Selecting the first canvas element in HTML file
const canvas = document.querySelector('canvas');

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size to full web page 
canvas.width = innerWidth;
canvas.height = innerHeight;

//! Declaring variables
let circleArray = []; // Array to store circle objects
let closestCircleIndex; // The closest circle to the mouse
let minDistance; // Minimum distance between 2 objects

// Mouse coordinates
let mouse = {
    x: undefined,
    y: undefined
}

// Color Array
let colorArray = [ // Array of colors for circles
    '#9d0208',
    '#d00000',
    '#dc2f02',
    '#f48c06',
    '#f48c06'
]

//! Utility Functions
// Get random integer from a min and max value
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Clear canvas
function clearCanvas() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

// Get the distance between 2 objects
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    // Return the distance between the 2 objects using Pythagorean Formula
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Circle Object
function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

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
        this.draw();
    }
}

//! Implementation
let userCircle; // Declare user circle that follows mouse placement

// Initialize circles and user circle
function init() {
    circleArray = []; // Clear array

    // Create and insert circles into array
    for (let i = 0; i < 4; i++) {

        // Set random variables
        let radius = randomIntFromRange(80, 100);
        let color = colorArray[randomIntFromRange(0, 4)];
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        let collision = false;

        // Check for collisions with existing circles
        for (let j = 0; j < circleArray.length; j++) {
            if (getDistance(x, y, circleArray[j].x, circleArray[j].y) < (radius + circleArray[j].radius + 100)) {
                collision = true;
                break;
            }
        }

        // If there's a collision, generate new x and y until no collision
        while (collision) {
            x = randomIntFromRange(radius, canvas.width - radius);
            y = randomIntFromRange(radius, canvas.height - radius);
            collision = false;

            // Recheck for collisions with existing circles
            for (let j = 0; j < circleArray.length; j++) {
                if (getDistance(x, y, circleArray[j].x, circleArray[j].y) < (radius + circleArray[j].radius + 100)) {
                    collision = true;
                    break;
                }
            }
        }

        // Insert circle object into array if no collision
        circleArray.push(new Circle(x, y, radius, color));
    }

    // Create user circle
    userCircle = new Circle(undefined, undefined, 10, colorArray[0]);
}

// Animation loop
function animate() {
    // Make a loop
    requestAnimationFrame(animate);

    // Clear canvas
    clearCanvas();

    // Move the circle objects in circleArray
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

    // Update user circle depending on mouse position
    userCircle.x = mouse.x;
    userCircle.y = mouse.y;
    userCircle.update();

    closestCircleIndex = -1; // Set a non-existent array
    minDistance = Infinity; // Set the biggest variable possible for minDistance

    // Calculate distances from userCircle to each circle in circleArray
    for (let i = 0; i < circleArray.length; i++) {
        // Get distance of the circle in i index and the mouse
        const distance = getDistance(userCircle.x, userCircle.y, circleArray[i].x, circleArray[i].y);

        // Check if there is a closer distance
        if (distance < minDistance) {
            minDistance = distance; // Reset minDistance with the distance between the closest circle and the mouse
            closestCircleIndex = i; // Set index of the closest circle of the mouse
        }
    }

    // Set user circle color based on proximity to closest circle
    if (closestCircleIndex !== -1) { // Check if exists
        // Change color if the sides of the circles are touching
        if (minDistance < userCircle.radius + circleArray[closestCircleIndex].radius) {
            userCircle.color = 'black';
        } else {
            userCircle.color = colorArray[colorArray.length - 1];
        }
    }
}

//! Event listener
// Resize canvas when window is resized
window.addEventListener('resize', () => {
    // Setting canvas size to full web page 
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

// Update mouse coordinates on mouse movement
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

// Initialize circles and start animation loop
init();
animate();
