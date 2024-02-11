const canvas = document.querySelector('canvas'); // Selecting the first canvas element in HTML file

// Setting the size of the canvas to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Retrieving the 2D rendering context
const c = canvas.getContext('2d');

// Circle Array to store different circle variable
let circleArray = [];

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

        // Call Circle.draw() function;
        this.draw();
    }
}

// Make 10 circles
for (let i = 0; i < 100; i++) {
    // Declaring variable
    let radius = 50; // Set radius
    let x = Math.random() * (innerWidth - radius * 2) + radius; // Set x coordinate
    let y = Math.random() * (innerHeight - radius * 2) + radius; // Set y coordinate
    let dx = Math.floor((Math.random() - 0.5) * 100) / 10; // Set x velocity
    let dy = Math.floor((Math.random() - 0.5) * 100) / 10; // Set y velocity
    let color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`; // Set random color

    circleArray.push(new Circle(x, y, dx, dy, radius, color));
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