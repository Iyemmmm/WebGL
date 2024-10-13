const canvas = document.getElementById("gl-canvas");
const gl = canvas.getContext("webgl2");
const canvasWidthDisplay = document.getElementById("canvasWidth");
const canvasHeightDisplay = document.getElementById("canvasHeight");

// Function to set canvas size based on window size
function resizeCanvas() {
  canvas.width = window.innerWidth; // Full screen width
  canvas.height = window.innerHeight; // Full screen height
  canvasWidthDisplay.textContent = canvas.width;
  canvasHeightDisplay.textContent = canvas.height;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

// Event listener to resize the canvas when the window is resized
window.addEventListener("resize", resizeCanvas);

// Initial canvas size setup
resizeCanvas();
