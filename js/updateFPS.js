const fpsDisplay = document.getElementById("fps");

let lastFrameTime = 0;
let frameCount = 0;

// Function to update FPS
function updateFPS(currentTime) {
  const deltaTime = currentTime - lastFrameTime;
  frameCount++;

  if (deltaTime >= 1000) {
    // Update every second
    const fps = (frameCount / (deltaTime / 1000)).toFixed(1);
    fpsDisplay.textContent = fps;

    // Reset for the next measurement
    lastFrameTime = currentTime;
    frameCount = 0;
  }

  requestAnimationFrame(updateFPS);
}

// Start the FPS calculation
requestAnimationFrame(updateFPS);
