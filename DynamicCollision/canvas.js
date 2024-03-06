// Selecting the first canvas element in HTML file
const canvas = document.querySelector('canvas');

// Retrieving the 2D rendering context
const ctx = canvas.getContext('2d');

// Setting canvas size to full web page 
canvas.width = innerWidth;
canvas.height = innerHeight;

//! Declaring variables
let particleArray = []; // Array to store particle objects
let closestParticleIndex; // The closest particle to the mouse
let minDistance; // Minimum distance between 2 objects

// Mouse coordinates
let mouse = {
    x: undefined,
    y: undefined
}

// Color Array
let colorArray = [ // Array of colors for particle
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

// Redirect direction upon collision
function resolveCollision(particle, otherParticle) {
    
}

// Particle Object
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5
    }
    this.radius = radius;
    this.color = color;

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }

    this.update = particleArray => {
        this.draw();

        for (let i = 0; i < particleArray.length; i++) {
            // Do not detect collision with itself
            if (this === particleArray[i]) {
                continue;
            }

            if (getDistance(this.x, this.y, particleArray[i].x, particleArray[i].y) < (this.radius + particleArray[i].radius)) {
                console.log('has collided')
            }
        }

        if ((this.x + this.radius) > canvas.width || (this.x -this.radius) < 0) {
            this.velocity.x = -this.velocity.x
        }

        if ((this.y + this.radius) > canvas.height || (this.y -this.radius) < 0) {
            this.velocity.y = -this.velocity.y
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

//! Implementation
let userParticle; // Declare user particle that follows mouse placement

// Initialize particle and user particle
function init() {
    particleArray = []; // Clear array
    let spawnNumber = (canvas.width * canvas.height) / 10000; // Set particle spawn number based on canvas size

    // Create and insert particle into array
    for (let i = 0; i < spawnNumber; i++) {

        // Set random variables
        let radius = 30;
        let color = colorArray[randomIntFromRange(0, 4)];
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);

        // Make sure it's not the first particle
        if (i !== 0) {
            // Check for collisions with existing particle
            for (let j = 0; j < particleArray.length; j++) {
                // Execute if (x, y) coordinates are too close 
                if (getDistance(x, y, particleArray[j].x, particleArray[j].y) < (radius + particleArray[j].radius + 2)) {
                    // Reassign x, y coordinates
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);

                    // Reset for loop to recheck if new coordinates are far enough
                    j = -1;
                }
            }
        }

        // Insert particle object into array if no collision
        particleArray.push(new Particle(x, y, radius, color));
    }

    // Create user circle
    userCircle = new Particle(undefined, undefined, 10, colorArray[0]);
}

// Animation loop
function animate() {
    // Make a loop
    requestAnimationFrame(animate);

    // Clear canvas
    clearCanvas();

    // Move the particle objects in particleArray
    particleArray.forEach(particle => {
        particle.update(particleArray);
    })

    // Update user circle depending on mouse position
    userCircle.x = mouse.x;
    userCircle.y = mouse.y;
    userCircle.update(particleArray);

    closestParticleIndex = -1; // Set a non-existent array
    minDistance = Infinity; // Set the biggest variable possible for minDistance

    // Calculate distances from particleArray to each particle in particleArray
    for (let i = 0; i < particleArray.length; i++) {
        // Get distance of the particle in i index and the mouse
        const distance = getDistance(userCircle.x, userCircle.y, particleArray[i].x, particleArray[i].y);

        // Check if there is a closer distance
        if (distance < minDistance) {
            minDistance = distance; // Reset minDistance with the distance between the closest particle and the mouse
            closestParticleIndex = i; // Set index of the closest ciparticlercle of the mouse
        }
    }

    // Set user particle color based on proximity to closest particle
    if (closestParticleIndex !== -1) { // Check if exists
        // Change color if the sides of the circles are touching
        if (minDistance < userCircle.radius + particleArray[closestParticleIndex].radius) {
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

init();
animate();