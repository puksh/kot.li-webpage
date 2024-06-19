const startButton = document.getElementById('startbuttonImg');

    startButton.addEventListener('click', function() {
        this.classList.toggle('clicked');
    });

    startButton.addEventListener('mouseleave', function() {
        this.classList.remove('clicked');
    });

function loadGalleryImages() {
    var galleryContainer = document.getElementById('galleryContainer');
    if (galleryContainer.classList.contains('loaded')) {
        return;
    }

    // Load the generated image list
    var script = document.createElement('script');
    script.src = 'imageList.js';
    script.onload = function() {
        loadImages(imageList);
    };
    document.head.appendChild(script);

    function loadImages(images) {
        const galleryContainer = document.getElementById('galleryContainer');
        const imagesPerColumn = 3;
        const numberOfColumns = Math.ceil(images.length / imagesPerColumn);
    
        const columns = [];
        for (let i = 0; i < numberOfColumns; i++) {
            const column = document.createElement('div');
            column.classList.add('column');
            galleryContainer.appendChild(column);
            columns.push(column);
        }
    
        images.forEach((imageSrc, index) => {
            var img = document.createElement('img');
            img.src = imageSrc;
            img.classList.add('imgGrooby');
            columns[index % numberOfColumns].appendChild(img);
        });
    
        galleryContainer.classList.add('loaded');
    }
}

/*WINDOWS CREATING FUNCTION*/


// Initialize variables for tracking mouse position and window position
let isDragging = false;
let isResizing = false;
let currentWindow = null;
let initialX;
let initialY;
let offsetX = 0;
let offsetY = 0;

// Function to create a new window
function createWindow() {
  // Create window elements
  const windowDiv = document.createElement('div');
  windowDiv.classList.add('window');

  const titleBar = document.createElement('div');
  titleBar.classList.add('title-bar');
  titleBar.textContent = 'New Window';

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-btn');
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', onCloseClick);

  titleBar.appendChild(closeBtn);
  windowDiv.appendChild(titleBar);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content');
  contentDiv.innerHTML = '<p>New window content goes here.</p>';
  windowDiv.appendChild(contentDiv);

  const resizeHandle = document.createElement('div');
  resizeHandle.classList.add('resize-handle');
  windowDiv.appendChild(resizeHandle);

  // Append window to the body
  document.body.appendChild(windowDiv);

  // Make window draggable
  titleBar.addEventListener('mousedown', onMouseDown);
  resizeHandle.addEventListener('mousedown', onMouseDown);

  // Set initial position (centered)
  const centerX = (window.innerWidth - windowDiv.offsetWidth) / 2;
  const centerY = (window.innerHeight - windowDiv.offsetHeight) / 2;
  windowDiv.style.left = `${centerX}px`;
  windowDiv.style.top = `${centerY}px`;
}

// Function to handle mouse down event
function onMouseDown(event) {
  if (event.target.classList.contains('title-bar')) {
    isDragging = true;
    currentWindow = this.parentNode;

    // Calculate initial mouse position
    initialX = event.clientX - offsetX;
    initialY = event.clientY - offsetY;

    // Set window to topmost z-index while dragging
    currentWindow.style.zIndex = 101;
  } else if (event.target.classList.contains('resize-handle')) {
    isResizing = true;
    currentWindow = this.parentNode;

    // Calculate initial mouse position
    initialX = event.clientX;
    initialY = event.clientY;
  }
}

// Function to handle mouse move event
function onMouseMove(event) {
  if (isDragging) {
    // Calculate new window position
    offsetX = event.clientX - initialX;
    offsetY = event.clientY - initialY;

    // Apply new position
    currentWindow.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  } else if (isResizing) {
    // Calculate new window size
    const width = initialX - event.clientX + currentWindow.offsetWidth;
    const height = initialY - event.clientY + currentWindow.offsetHeight;

    // Apply new size
    currentWindow.style.width = `${width}px`;
    currentWindow.style.height = `${height}px`;
  }
}

// Function to handle mouse up event
function onMouseUp() {
  if (isDragging || isResizing) {
    isDragging = false;
    isResizing = false;

    // Reset z-index
    currentWindow.style.zIndex = 100;

    // Save window position and size
    // (optional: you might want to save the position and size in local storage or elsewhere)
  }
}

// Function to handle window close button
function onCloseClick() {
  const windowToClose = this.parentNode.parentNode;
  windowToClose.remove();
}

// Event listener for creating windows on button click
const createWindowBtn = document.getElementById('createWindowBtn');
createWindowBtn.addEventListener('click', createWindow);

// Global event listeners for mouse move and up events
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);

/*WINDOWS CREATING FUNCTION END*/