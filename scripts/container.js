document.addEventListener("DOMContentLoaded", () => {
  createContainer();
});

function createContainer() {
  const container = document.createElement("div");
  container.id = "container";
  document.body.appendChild(container);

  // Additional setup if necessary
  //console.log("Container created and added to the DOM.");
}

let isCursorEnabled = localStorage.getItem("isCursorEnabled") === "true"; // Load initial state
let isMoving = false;
const mouse = document.getElementById("mouse");

// Function to update cursor based on stored settings
function updateCursorState() {
  if (isCursorEnabled) {
    mouse.style.display = "block";
    document.body.classList.add("hide-default-cursor"); // Hide default cursor
  } else {
    mouse.style.display = "none";
    document.body.classList.remove("hide-default-cursor"); // Show default cursor
  }
}

// Track mouse movement
document.onmousemove = function (e) {
  if (isCursorEnabled) {
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(() => {
        mouse.style.left = e.pageX + 1 + "px"; // Adjust position
        mouse.style.top = e.pageY + 1 + "px"; // Adjust position
        isMoving = false;
      });
    }
  }
};

// Listen for the custom event dispatched from apps.js
document.addEventListener("cursorToggle", (event) => {
  isCursorEnabled = event.detail.isCursorEnabled;
  updateCursorState(); // Update the cursor state based on the toggle
});

// Initialize cursor on page load
updateCursorState();
