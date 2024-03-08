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
let userParticle; // Declare user particle that follows mouse placement

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

// Rotate function to rotate velocities so its 1D
function rotate(velocity, angle) {
    const rotatedVelocity = {
        x: (Math.cos(angle) * velocity.x) - (Math.sin(angle) * velocity.y),
        y: (Math.sin(angle) * velocity.x) + (Math.cos(angle) * velocity.y)
    }

    // Return rotated velocity
    return rotatedVelocity;
}

// Redirect direction upon collision
function resolveCollision(particle, otherParticle) {
    // Get the difference in velocities of both particles
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    // Get distance of x and y of both particles
    const xDistance = otherParticle.x - particle.x;
    const yDistance = otherParticle.y - particle.y;
    
    // Check if clipping / overlap
    if (xVelocityDiff * xDistance + yVelocityDiff * yDistance >= 0) {
        // Get angle of the triangle formed by the two colliding particles
        const angle = -Math.atan2((otherParticle.y - particle.y), (otherParticle.x - particle.x))
    
        // Set mass of both first and second particle
        const m1 = particle.mass;
        const m2 = otherParticle.mass;
    
        // Velocity before collision
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);
    
        // Velocity after the 1D collision (Using One-dimensional Newtonian equasion)
        const v1 = {
            x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2),
            y: u1.y
        }
        const v2 = {
            x: (u2.x * (m2 - m1) + 2 * m1 * u1.x) / (m1 + m2),
            y: u2.y
        }
    
        // Velocity after rotation axis back to original location
        const finalV1 = rotate(v1, -angle);
        const finalV2 = rotate(v2, -angle);
    
        // Reassigning particle volacity to simulate bounce effect
        particle.velocity = finalV1;
        otherParticle.velocity = finalV2;
    }
}

// Particle Object
function Particle(x, y, radius, color, dx, dy) {
    // Set Particle properties
    this.x = x;
    this.y = y;
    this.velocity = {
        x: dx,
        y: dy
    }
    this.radius = radius;
    this.color = color;
    this.mass = this.radius ** 2 * Math.PI; // Mass proportional to Particle area
    this.opacity = 0.2;

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = this.color;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.stroke();
        ctx.closePath();
    }

    this.update = particleArray => {
        this.draw();

        // Cycle through every particle
        for (let i = 0; i < particleArray.length; i++) {
            // Do not detect collision with itself
            if (this === particleArray[i]) continue;

            // Check collision
            if (getDistance(this.x, this.y, particleArray[i].x, particleArray[i].y) < (this.radius + particleArray[i].radius)) {
                // Resolve collision
                resolveCollision(this, particleArray[i]);
            }
        }

        // Check for mouse collision
        if (getDistance(this.x, this.y, mouse.x, mouse.y) < 120 && this.opacity <= 0.7) {
            this.opacity += 0.05;
        } else if (this.opacity > 0.2) {
            this.opacity -= 0.05;
            this.opacity = Math.max(0.2, this.opacity); // Make sure this.opacity doesnt go below 0.2
        }

        // Reset x velocity if touching border
        if ((this.x + this.radius) > canvas.width || (this.x -this.radius) < 0) {
            this.velocity.x = -this.velocity.x;
        }

        // Reset y velocity if touching border
        if ((this.y + this.radius) > canvas.height || (this.y -this.radius) < 0) {
            this.velocity.y = -this.velocity.y;
        }

        // Move Particle based on velocity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

//! Implementation
// Initialize particle and user particle
function init() {
    particleArray = []; // Clear array
    let spawnNumber = (canvas.width * canvas.height) / 3000; // Set particle spawn number based on canvas size

    // Create and insert particle into array
    for (let i = 0; i < spawnNumber; i++) {

        // Set random variables
        let radius = 15;
        let color = colorArray[randomIntFromRange(0, 4)];
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        let dx = randomIntFromRange(-3, 3);
        let dy = randomIntFromRange(-3, 3);

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
        particleArray.push(new Particle(x, y, radius, color, dx, dy));
    }

    // Create user circle
    userParticle = new Particle(undefined, undefined, 5, 'white');
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
    userParticle.x = mouse.x;
    userParticle.y = mouse.y;
    userParticle.update(particleArray);
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
