const canvas = document.querySelector('canvas'); // Selects the first canvas element in your HTML

// Resizing the width and height of the canvas to be the same of your window
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

// Retrieving the 2D rendering context
const context = canvas.getContext('2d');

//! Drawing rectangles with .fillRect(x, y, width, height)
// Setting color for rectangle
context.fillStyle = 'blue';
context.fillRect(10, 10, 100, 100);

// 2nd Rectangle with different color
context.fillStyle = 'purple';
context.fillRect(300, 300, 100, 100);


//! Drawing lines
// Begin a new path for drawing
context.beginPath();

// Move the "pen" to the starting point without drawing a line
context.moveTo(50, 300);  // .moveTo(x, y);

// Draw a straight line from the current pen position to the specified point
context.lineTo(200, 600); // .lineTo(x, y);
context.lineTo(400, 100);

// Setting color to line
context.strokeStyle = "red";

// Stroke the path, rendering the line on the canvas
context.stroke();


//! Drawing arcs/ circles
/* .arc(x: int, y: int, radius: int, 
    startAngle (radiant): float, 
    endAngle (radiant): float, 
    drawCounterClockwise: bool(true or false)) */

// Drawing a circle
context.beginPath(); // Seperate individual lines and arcs
context.arc(500, 500, 100, 0, Math.PI * 2, false); // Setting the properties of the arc
context.strokeStyle = 'black'; // Border color
context.fillStyle = 'black' // Fill color
context.stroke();  // Draw border
context.fill(); // Draw filling

// Drawing multiple circles
for (let i = 0; i < 20; i++) {
    // Setting random variables
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let radius = Math.random() * 100;
    let randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

    // Drawing the circles
    context.beginPath(); // Seperate individual lines and arcs
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.strokeStyle = randomColor;
    context.fillStyle = randomColor;
    context.stroke();
    context.fill();
}

console.log(canvas);