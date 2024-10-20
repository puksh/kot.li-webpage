function Gallery(container) {
  const galleryContainer = document.createElement("div");
  galleryContainer.id = "galleryContainer";
  galleryContainer.classList.add("gallery-container");
  container.appendChild(galleryContainer);

  const script = document.createElement("script");
  script.src = "scripts/imageList.js";
  script.onload = function () {
    loadImages(imageList);
  };
  document.head.appendChild(script);

  function loadImages(images) {
    const imagesPerColumn = 3;
    const numberOfColumns = Math.ceil(images.length / imagesPerColumn);

    const columns = [];
    for (let i = 0; i < numberOfColumns; i++) {
      const column = document.createElement("div");
      column.classList.add("column");
      galleryContainer.appendChild(column);
      columns.push(column);
    }

    images.forEach((imageSrc, index) => {
      const img = document.createElement("img");
      img.src = imageSrc;
      img.classList.add("imgGrooby");
      columns[index % numberOfColumns].appendChild(img);
    });

    galleryContainer.classList.add("loaded");
  }
}

function Shower(container) {}

function Christitus(container) {
  const command = 'irm "https://christitus.com/win" | iex';

  navigator.clipboard
    .writeText(command)
    .then(() => {
      console.log("Command copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });

  // Create a container and message
  const ChristitusContainer = document.createElement("div");
  ChristitusContainer.id = "ChristitusContainer";
  ChristitusContainer.classList.add("Christitus-container");

  const p = document.createElement("p");
  p.classList.add("instructions");
  p.textContent = `  Command copied to clipboard!
  'irm "https://christitus.com/win" | iex'
  
  1. Press "⊞ Win + X" and select "Windows PowerShell (Admin)".
  2. Right-click in the window to paste and run the command.`;

  // Append the message to the container and the container to the provided element
  ChristitusContainer.appendChild(p);
  container.appendChild(ChristitusContainer);
}

function About(container) {
  // Create a container and message
  const AboutContainer = document.createElement("div");
  AboutContainer.id = "AboutContainer";
  AboutContainer.classList.add("About-container");

  const p = document.createElement("p");
  p.classList.add("instructions");
  p.textContent = `Using the XP.css as a base for this project, thanks to all the folks that made it!`;

  // Create an anchor element for the button link
  const buttonLink = document.createElement("a");
  buttonLink.href = "https://botoxparty.github.io/XP.css/";
  buttonLink.target = "_blank"; // Opens in a new tab

  const button = document.createElement("button");
  button.textContent = "Visit XP.css"; // Button text

  // Append the button to the anchor element
  buttonLink.appendChild(button);

  // Append the message to the container and the container to the provided element
  AboutContainer.appendChild(p);
  AboutContainer.appendChild(buttonLink);
  container.appendChild(AboutContainer);
}

function Settings(container) {
  const SettingsContainer = document.createElement("div");
  SettingsContainer.id = "SettingsContainer";
  SettingsContainer.classList.add("Settings-container");

  // Create the checkbox and label in apps.js
  const checkboxCustomCursor = document.createElement("input");
  checkboxCustomCursor.type = "checkbox";
  checkboxCustomCursor.id = "checkboxCustomCursor";

  // Load saved cursor state from localStorage
  const isCursorEnabled = localStorage.getItem("isCursorEnabled") === "true";
  checkboxCustomCursor.checked = isCursorEnabled; // Reflect the saved state in the checkbox

  const label = document.createElement("label");
  label.htmlFor = "checkboxCustomCursor";
  label.textContent = "Toggle custom cursor";

  // Append the checkbox and label to the body or settings container
  document.body.appendChild(checkboxCustomCursor);
  document.body.appendChild(label);

  // Attach event listener to save the state to localStorage
  checkboxCustomCursor.addEventListener("change", function () {
    const isCursorEnabled = checkboxCustomCursor.checked;
    localStorage.setItem("isCursorEnabled", isCursorEnabled); // Save state
    // Dispatch a custom event to inform the cursor script
    const event = new CustomEvent("cursorToggle", {
      detail: { isCursorEnabled },
    });
    document.dispatchEvent(event);
  });

  SettingsContainer.appendChild(checkboxCustomCursor);
  container.appendChild(SettingsContainer);
}
