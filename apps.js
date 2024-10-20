function Gallery(container) {
  const galleryContainer = document.createElement("div");
  galleryContainer.id = "galleryContainer";
  galleryContainer.classList.add("gallery-container");
  container.appendChild(galleryContainer);

  const script = document.createElement("script");
  script.src = "imageList.js";
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
  p.textContent = `Command copied to clipboard!\n
  \n
  1. Press "⊞ Win + X" and select "Windows PowerShell (Admin)".\n
  2. Right-click in the window to paste and run the command.\n`;

  // Append the message to the container and the container to the provided element
  ChristitusContainer.appendChild(p);
  container.appendChild(ChristitusContainer);
}
