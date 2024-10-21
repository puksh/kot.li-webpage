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
  p.textContent = `Using the XP.css as a base for this project, thanks to all the folks that made it!
  
  Bliss Photograph by Charles O'Rear, thank you!
  Dark Bliss edit by someone from the internet, can't find source
  `;

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

//
//  Update Wallpaper Functions
//

// Function to update desktop background
function updateWallpaper(wallpaperPath, isUserDefined = false) {
  const desktop = document.querySelector(".desktop");
  if (desktop) {
    desktop.style.backgroundImage = `url('${wallpaperPath}')`; // Update the background
  }

  // Save the selected wallpaper in localStorage
  if (isUserDefined) {
    localStorage.setItem("userDefinedWallpaper", wallpaperPath);
  } else {
    localStorage.setItem("selectedWallpaper", wallpaperPath);
  }
}

// Load wallpaper on page load
function loadWallpaperOnPageLoad() {
  const userDefinedWallpaper = localStorage.getItem("userDefinedWallpaper");
  const savedWallpaper = localStorage.getItem("selectedWallpaper") || null;

  if (userDefinedWallpaper) {
    updateWallpaper(userDefinedWallpaper, true); // Load user-defined wallpaper
  } else if (savedWallpaper) {
    updateWallpaper(savedWallpaper); // Load predefined wallpaper
  }
}

// Call this function on page load
loadWallpaperOnPageLoad();

//
//  Settings App
//

function Settings(container) {
  const SettingsContainer = document.createElement("div");
  SettingsContainer.id = "SettingsContainer";
  SettingsContainer.classList.add("Settings-container");

  //
  // CURSOR
  //
  const optionalSettings = document.createElement("p");
  optionalSettings.classList.add("instructions");
  optionalSettings.textContent = `Optional Settings`;

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

  // Create a div with field-row class
  const fieldRow = document.createElement("div");
  fieldRow.classList.add("field-row");

  // Append the checkbox and label to the field-row div
  fieldRow.appendChild(checkboxCustomCursor);
  fieldRow.appendChild(label);

  // Append the field-row to the SettingsContainer
  SettingsContainer.appendChild(optionalSettings);
  SettingsContainer.appendChild(fieldRow);

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

  //
  //WALLPAPER
  //
  const wallpaperText = document.createElement("p");
  wallpaperText.classList.add("instructions");
  wallpaperText.textContent = `
  Wallpaper`;
  // Create dropdown for wallpaper selection
  const wallpaperSelect = document.createElement("select");
  wallpaperSelect.id = "wallpaperSelect";

  // Load wallpapers from the /wallpapers folder (for now, hardcoding the list)
  const wallpapers = [
    { name: "Bliss", path: "/wallpapers/bliss.jpeg" },
    {
      name: "Bliss Dark",
      path: "/wallpapers/blissDark.jpg",
    },
    { name: "Bliss Minimal", path: "/wallpapers/blissMin.png" },
  ];

  // Function to populate dropdown with wallpapers
  function populateWallpaperOptions() {
    wallpapers.forEach((wallpaper) => {
      const option = document.createElement("option");
      option.value = wallpaper.path; // Store the path in the option value
      option.textContent = wallpaper.name;
      wallpaperSelect.appendChild(option);
    });

    // Add "User Defined" option at the end
    const userOption = document.createElement("option");
    userOption.value = "user-defined";
    userOption.textContent = "User Defined";
    wallpaperSelect.appendChild(userOption);
    const userDefinedWallpaper = localStorage.getItem("userDefinedWallpaper");
    if (userDefinedWallpaper) {
      wallpaperSelect.value = "user-defined"; // Set the dropdown to "User Defined"
    } else if (savedWallpaper) {
      wallpaperSelect.value = savedWallpaper; // Set the dropdown to the saved wallpaper
    } else {
      wallpaperSelect.value = wallpaperSelect.options[0].value; // Set to the first available option (if any)
    }

    // Listen for changes in the dropdown and update the wallpaper
    wallpaperSelect.addEventListener("change", function () {
      const selectedWallpaper = wallpaperSelect.value;

      if (selectedWallpaper === "user-defined") {
        const userWallpaper = localStorage.getItem("userDefinedWallpaper");
        if (userWallpaper) {
          updateWallpaper(userWallpaper, true); // Load user-defined wallpaper
        }
      } else {
        updateWallpaper(selectedWallpaper); // Load predefined wallpaper
      }
    });
  }

  // Create button for uploading custom wallpapers
  const uploadButton = document.createElement("button");
  uploadButton.textContent = "Upload Wallpaper";
  uploadButton.id = "uploadWallpaper";

  // Append the upload button next to the dropdown
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none"; // Hide the file input, we'll trigger it from the button

  // Trigger file input when the button is clicked
  uploadButton.addEventListener("click", function () {
    fileInput.click();
  });

  // Listen for wallpaper uploads
  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const wallpaperDataUrl = e.target.result; // Get image as data URL
        updateWallpaper(wallpaperDataUrl, true); // Update background to user wallpaper
        wallpaperSelect.value = "user-defined"; // Set dropdown to "User Defined"
      };
      reader.readAsDataURL(file); // Read the uploaded image file as data URL
    }
  });

  // Listen for wallpaper uploads
  uploadButton.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const wallpaperDataUrl = e.target.result; // Get image as data URL
        updateWallpaper(wallpaperDataUrl, true); // Update background to user wallpaper
        wallpaperSelect.value = "user-defined"; // Set dropdown to "User Defined"
      };
      reader.readAsDataURL(file); // Read the uploaded image file as data URL
    }
  });

  // Populate the dropdown with available wallpapers
  populateWallpaperOptions();

  // Append the elements to the SettingsContainer
  SettingsContainer.appendChild(wallpaperText);
  SettingsContainer.appendChild(wallpaperSelect);
  SettingsContainer.appendChild(uploadButton);

  //
  //  Populate the Settings App, END
  //

  // Append the SettingsContainer to the container
  container.appendChild(SettingsContainer);
}
