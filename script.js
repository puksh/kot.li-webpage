/* Start Button Script */

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
    }}

/* Start Button Script END*/

/*WINDOWS CREATING FUNCTION*/

  
  let windowCount = 0;
  
  function createWindow(appName) {
    console.log(`Creating window for ${appName}`);
    windowCount++;
    const container = document.getElementById('container');
    const windowElement = document.createElement('div');
    windowElement.className = 'window';
    windowElement.id = `window-${windowCount}`;
  
    const header = document.createElement('div');
    header.className = 'header';
  
    const title = document.createElement('span');
    title.innerText = appName;
    header.appendChild(title);
  
    const buttons = document.createElement('div');
    buttons.className = 'header-buttons';
  
    const minimizeButton = document.createElement('button');
  minimizeButton.innerHTML = '⎯';
  minimizeButton.onclick = () => minimizeWindow(windowElement);
  buttons.appendChild(minimizeButton);

  const maximizeButton = document.createElement('button');
  maximizeButton.innerHTML = '⛶';
  maximizeButton.onclick = () => maximizeWindow(windowElement);
  buttons.appendChild(maximizeButton);

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '⨉';
  closeButton.onclick = () => closeWindow(windowElement);
  buttons.appendChild(closeButton);

  header.appendChild(buttons);
  windowElement.appendChild(header);

  const content = document.createElement('div');
  content.className = 'content';
  windowElement.appendChild(content);

  container.appendChild(windowElement);

  makeDraggable(windowElement, header);
  makeResizable(windowElement);

  loadApp(appName, content);
}

function makeDraggable(element, handle) {
  let isDragging = false;
  let offsetX, offsetY;

  handle.addEventListener('mousedown', (event) => {
    isDragging = true;
    offsetX = event.clientX - element.offsetLeft;
    offsetY = event.clientY - element.offsetTop;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(event) {
    if (isDragging) {
      element.style.left = `${event.clientX - offsetX}px`;
      element.style.top = `${event.clientY - offsetY}px`;
    }
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

function makeResizable(element) {
  let isResizing = false;
  let initialWidth, initialHeight, initialX, initialY;
  let currentResizeSide = null;

  element.addEventListener('mousemove', (event) => {
    const rect = element.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const margin = 10;

    if (mouseX < margin && mouseY < margin) {
      element.style.cursor = 'nwse-resize';
      currentResizeSide = 'top-left';
    } else if (mouseX < margin && mouseY > rect.height - margin) {
      element.style.cursor = 'nesw-resize';
      currentResizeSide = 'bottom-left';
    } else if (mouseX > rect.width - margin && mouseY < margin) {
      element.style.cursor = 'nesw-resize';
      currentResizeSide = 'top-right';
    } else if (mouseX > rect.width - margin && mouseY > rect.height - margin) {
      element.style.cursor = 'nwse-resize';
      currentResizeSide = 'bottom-right';
    } else if (mouseX < margin) {
      element.style.cursor = 'ew-resize';
      currentResizeSide = 'left';
    } else if (mouseX > rect.width - margin) {
      element.style.cursor = 'ew-resize';
      currentResizeSide = 'right';
    } else if (mouseY < margin) {
      element.style.cursor = 'ns-resize';
      currentResizeSide = 'top';
    } else if (mouseY > rect.height - margin) {
      element.style.cursor = 'ns-resize';
      currentResizeSide = 'bottom';
    } else {
      element.style.cursor = 'default';
      currentResizeSide = null;
    }
  });

  element.addEventListener('mousedown', (event) => {
    if (currentResizeSide) {
      isResizing = true;
      initialWidth = element.offsetWidth;
      initialHeight = element.offsetHeight;
      initialX = event.clientX;
      initialY = event.clientY;
      document.addEventListener('mousemove', onResize);
      document.addEventListener('mouseup', stopResize);
    }
  });

  function onResize(event) {
    if (isResizing) {
      switch (currentResizeSide) {
        case 'top-left':
          element.style.width = `${initialWidth - (event.clientX - initialX)}px`;
          element.style.height = `${initialHeight - (event.clientY - initialY)}px`;
          element.style.left = `${event.clientX}px`;
          element.style.top = `${event.clientY}px`;
          break;
        case 'top-right':
          element.style.width = `${initialWidth + (event.clientX - initialX)}px`;
          element.style.height = `${initialHeight - (event.clientY - initialY)}px`;
          element.style.top = `${event.clientY}px`;
          break;
        case 'bottom-left':
          element.style.width = `${initialWidth - (event.clientX - initialX)}px`;
          element.style.height = `${initialHeight + (event.clientY - initialY)}px`;
          element.style.left = `${event.clientX}px`;
          break;
        case 'bottom-right':
          element.style.width = `${initialWidth + (event.clientX - initialX)}px`;
          element.style.height = `${initialHeight + (event.clientY - initialY)}px`;
          break;
        case 'left':
          element.style.width = `${initialWidth - (event.clientX - initialX)}px`;
          element.style.left = `${event.clientX}px`;
          break;
        case 'right':
          element.style.width = `${initialWidth + (event.clientX - initialX)}px`;
          break;
        case 'top':
          element.style.height = `${initialHeight - (event.clientY - initialY)}px`;
          element.style.top = `${event.clientY}px`;
          break;
        case 'bottom':
          element.style.height = `${initialHeight + (event.clientY - initialY)}px`;
          break;
      }
    }
  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('mouseup', stopResize);
  }
}

function minimizeWindow(element) {
  console.log('Minimizing window');
  element.classList.add('minimized');
}

function maximizeWindow(element) {
  console.log('Maximizing window');
  if (element.classList.contains('maximized')) {
    element.classList.remove('maximized');
    element.style.width = `${element.initialWidth}px`;
    element.style.height = `${element.initialHeight}px`;
    element.style.left = `${element.initialLeft}px`;
    element.style.top = `${element.initialTop}px`;
  } else {
    element.classList.add('maximized');
    element.initialWidth = element.offsetWidth;
    element.initialHeight = element.offsetHeight;
    element.initialLeft = element.offsetLeft;
    element.initialTop = element.offsetTop;
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.left = '0';
    element.style.top = '0';
  }
}

function closeWindow(element) {
  console.log('Closing window');
  element.remove();
}

function loadApp(appName, container) {
  console.log(`Loading app: ${appName}`);
  const appEvent = new CustomEvent('loadApp', { detail: { appName, container } });
  document.dispatchEvent(appEvent);
}

document.addEventListener('loadApp', (event) => {
  const { appName, container } = event.detail;
  if (window[appName]) {
    window[appName](container);
  } else {
    container.innerText = `Application ${appName} not found.`;
  }
});



/*WINDOWS CREATING FUNCTION END*/