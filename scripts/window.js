let windowCount = 0;

function createWindow(appName, width = 400, height = 300) {
	if (document.getElementById(appName)) return;

	windowCount++;

	// Create elements using a helper function
	const createElement = (tag, className, attributes = {}) => {
		const element = document.createElement(tag);
		if (className) element.className = className;
		Object.entries(attributes).forEach(([key, value]) => {
			element.setAttribute(key, value);
		});
		return element;
	};

	// Create window structure
	const windowElement = createElement("div", "window", { id: appName });
	const titleBar = createElement("div", "title-bar");
	const content = createElement("div", "content");

	// Create title
	const title = createElement("span", "title-bar-text");
	title.innerText = appName;

	// Create button container
	const buttons = createElement("div", "title-bar-controls");

	// Define button configurations
	const buttonConfigs = [
		{
			class: "minimizeButton",
			label: "Minimize",
			handler: () => minimizeWindow(windowElement),
		},
		{
			class: "maximizeButton",
			label: "Maximize",
			handler: () => maximizeWindow(windowElement),
		},
		{
			class: "closeButton",
			label: "Close",
			handler: () => closeWindow(windowElement),
		},
	];

	// Create buttons
	const buttonElements = buttonConfigs.map((config) => {
		const button = createElement("button", config.class, {
			"aria-label": config.label,
		});
		button.onclick = config.handler;
		return button;
	});

	// Assemble the window
	buttons.append(...buttonElements);
	titleBar.append(title, buttons);
	windowElement.append(titleBar, content);

	// Set initial size
	windowElement.style.width = `${width}px`;
	windowElement.style.height = `${height}px`;

	// Add to container and position
	const container = document.getElementById("container");
	container.appendChild(windowElement);

	// Center the window
	const [containerRect, windowRect] = [container, windowElement].map((el) =>
		el.getBoundingClientRect(),
	);

	Object.assign(windowElement.style, {
		left: `${(containerRect.width - windowRect.width) / 2}px`,
		top: `${(containerRect.height - windowRect.height) / 2}px`,
	});

	// Initialize dragging and load content
	makeDraggable(windowElement, titleBar);
	loadApp(appName, content);
}

function makeDraggable(element, handle) {
	let isDragging = false;
	let offsetX, offsetY;

	// Handle touch events
	handle.addEventListener("touchstart", (event) => {
		isDragging = true;
		const touch = event.touches[0];
		offsetX = touch.clientX - element.offsetLeft;
		offsetY = touch.clientY - element.offsetTop;
		document.addEventListener("touchmove", onTouchMove);
		document.addEventListener("touchend", onTouchUp);
	});

	// Handle mouse events
	handle.addEventListener("mousedown", (event) => {
		isDragging = true;
		offsetX = event.clientX - element.offsetLeft;
		offsetY = event.clientY - element.offsetTop;
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	});

	function onTouchMove(event) {
		if (isDragging) {
			const touch = event.touches[0];
			element.style.left = `${touch.clientX - offsetX}px`;
			element.style.top = `${touch.clientY - offsetY}px`;
		}
	}

	function onTouchUp() {
		isDragging = false;
		document.removeEventListener("touchmove", onTouchMove);
		document.removeEventListener("touchend", onTouchUp);
	}

	function onMouseMove(event) {
		if (isDragging) {
			element.style.left = `${event.clientX - offsetX}px`;
			element.style.top = `${event.clientY - offsetY}px`;
		}
	}

	function onMouseUp() {
		isDragging = false;
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onMouseUp);
	}
}

function minimizeWindow(element) {
	console.log("Minimizing window");
	element.classList.add("minimized");
}
function maximizeWindow(element) {
	console.log("Maximizing window");
	const isMaximized = element.classList.toggle("maximized");
	if (isMaximized) {
		Object.assign(element.dataset, {
			initialWidth: element.style.width,
			initialHeight: element.style.height,
			initialLeft: element.style.left,
			initialTop: element.style.top,
		});
		Object.assign(element.style, {
			width: "100%",
			height: "100%",
			left: "0",
			top: "0",
		});
	} else {
		Object.assign(element.style, {
			width: element.dataset.initialWidth,
			height: element.dataset.initialHeight,
			left: element.dataset.initialLeft,
			top: element.dataset.initialTop,
		});
	}
}

function closeWindow(element) {
	element.remove();
}

function loadApp(appName, container) {
	const appEvent = new CustomEvent("loadApp", {
		detail: { appName, container },
	});
	document.dispatchEvent(appEvent);
}

document.addEventListener("loadApp", (event) => {
	const { appName, container } = event.detail;
	if (window[appName]) {
		window[appName](container);
	} else {
		container.innerText = `Application ${appName} not found.`;
	}
});
