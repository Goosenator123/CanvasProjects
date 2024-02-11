// Selecting the first canvas element in HTML file
const canvas = document.querySelector('canvas');

// Setting the size of the canvas to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Retrieving the 2D rendering context
const c = canvas.getContext('2d');

// Circle Array to store different circle variable
let circleArray = [];

// Mouse coordinates
let mouse = {
    x: undefined,
    y: undefined
}

// Color Array
let colorArray = [
    '#9d0208',
    '#d00000',
    '#dc2f02',
    '#f48c06',
    '#f48c06'
]

// Circle Object
function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    
    this.draw = function() {
        // Drawing a circle
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.stroke();
        c.fill()
    }

    this.update = function() {
        // Check if circle hit the side of the screen
        if (this.x > (innerWidth - this.radius) || this.x < (0 + this.radius)) {
            this.dx = -this.dx;
        }
    
        if (this.y > (innerHeight - this.radius) || this.y < (0 + this.radius)) {
            this.dy = -this.dy;
        }

        // Modify x coordinate
        this.x += this.dx;
        this.y += this.dy;

        // Interaction with the position of users mouse
        let distance = 40; // Set distance
        let maxRadius = radius * 5 + 10;

        if (mouse.x - this.x < distance && mouse.x - this.x > -distance && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
            if (this.radius < maxRadius) {
                this.radius += 3;
            }
        } else if (this.radius > radius) {
            this.radius -= 3;
        }

        // Call Circle.draw() function;
        this.draw();
    }
}

// Initiate function 
function init() {
    // Create circles
    let amount = window.innerWidth * 2; // Set variable depending on window size
    circleArray = []; // Reset all circles

    for (let i = 0; i < amount; i++) {
        // Declaring variable
        let radius = Math.random() * 4 + 3; // Set radius
        let x = Math.random() * (innerWidth - radius * 2) + radius; // Set x coordinate
        let y = Math.random() * (innerHeight - radius * 2) + radius; // Set y coordinate
        let dx = Math.floor((Math.random() - 0.5) * 100) / 20; // Set x velocity
        let dy = Math.floor((Math.random() - 0.5) * 100) / 20; // Set y velocity
        let color = colorArray[Math.floor(Math.random() * (colorArray.length + 1))]; // Set random color in colorArray

        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}

// Animate function
function animate() {
    // Make a loop
    requestAnimationFrame(animate);

    // Clear canvas
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();

// Event listeners
// Update mouse coordinates on mouse movement
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

// Update canvas size and reset circles on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

// Initialize the canvas
init();
