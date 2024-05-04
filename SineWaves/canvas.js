// Select the first canvas element in the HTML file
const canvas = document.querySelector('canvas');

// Retrieve the 2D rendering context of the canvas
const ctx = canvas.getContext('2d');

// Function to set canvas size to full web page
function setCanvasSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
setCanvasSize(); // Set canvas size initially

// Define properties of the wave
const wave = {
    length: 0.005, // Length of each wave cycle
    amplitude: 200, // Amplitude of the wave
    frequency: 0.01 // Frequency of the wave (speed of oscillation)
};

// Function to clear the screen with a fading effect
function clearScreen() {
    // Set a transparent black color with low opacity to create a fading effect
    ctx.fillStyle = `rgba(0, 0, 0, 0.01)`;
    // Fill the entire canvas with the specified color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Animation Loop
let increment = wave.frequency; // Initialize the increment for the wave animation
function animate() {
    requestAnimationFrame(animate); // Request the next animation frame

    clearScreen(); // Clear the screen with fading effect

    // Begin drawing the wave
    ctx.beginPath();
    // Move the drawing cursor to the starting point of the wave (slightly off-screen to hide initial line)
    ctx.moveTo(-20, canvas.height / 2);

    // Draw the wave using a loop across the width of the canvas
    for (let i = 0; i < canvas.width; i += 0.5) {
        // Calculate the vertical position of each point on the wave using sine and cosine functions
        const waveHeight = canvas.height / 2 + Math.sin(i * wave.length + increment) * wave.amplitude * Math.cos(increment);
        // Draw a line segment to the calculated point
        ctx.lineTo(i, waveHeight);
    }

    // Set the stroke color of the wave based on the current increment value
    const hue = Math.abs(200 * Math.sin(increment)); // Calculate hue for color variation
    ctx.strokeStyle = `hsl(${hue}, 50%, 50%)`; // Set stroke color
    ctx.lineWidth = 5; // Set the thickness of the lines
    ctx.stroke(); // Render the wave on the canvas
    ctx.closePath(); // Close the path to prepare for next drawing

    // Increase the increment value to animate the wave
    increment += wave.frequency; // Increment controls the speed of the wave animation
}

// Event listeners
window.addEventListener('resize', () => {
    setCanvasSize(); // Reset canvas size
})

animate(); // Start the animation loop
