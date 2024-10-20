document.addEventListener("DOMContentLoaded", () => {
  createContainer();
});

function createContainer() {
  const container = document.createElement("div");
  container.id = "container";
  document.body.appendChild(container);

  // Additional setup if necessary
  console.log("Container created and added to the DOM.");
}
let mouse = document.getElementById("mouse");
let isMoving = false;

// Hide the cursor when the mouse leaves the document
document.addEventListener("mouseleave", () => {
  mouse.style.display = "none"; // Hide the cursor
});

// Show the cursor when the mouse enters the document
document.addEventListener("mouseenter", () => {
  mouse.style.display = "block"; // Show the cursor
});

// Track mouse movement
document.onmousemove = function (e) {
  if (!isMoving) {
    isMoving = true;
    requestAnimationFrame(() => {
      mouse.style.left = e.pageX + 1 + "px"; // Adjust position
      mouse.style.top = e.pageY + 1 + "px"; // Adjust position
      isMoving = false; // Reset the flag
    });
  }
};
