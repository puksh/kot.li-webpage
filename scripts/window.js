let windowCount = 0;

function createWindow(appName) {
	//console.log(`Creating window for ${appName}`);
	if (document.getElementById(appName)) {
		return;
	}
	windowCount++;
	const container = document.getElementById("container");
	const windowElement = document.createElement("div");

	windowElement.className = "window";
	windowElement.id = appName;

	const titleBar = document.createElement("div");
	titleBar.className = "title-bar";

	const title = document.createElement("span");
	title.innerText = appName;
	title.className = "title-bar-text";
	titleBar.appendChild(title);

	const buttons = document.createElement("div");
	buttons.className = "title-bar-controls";

	const minimizeButton = document.createElement("button");
	//minimizeButton.innerHTML = '⎯';
	minimizeButton.className = "minimizeButton";
	minimizeButton.setAttribute("aria-label", "Minimize");
	minimizeButton.onclick = () => minimizeWindow(windowElement);
	buttons.appendChild(minimizeButton);

	const maximizeButton = document.createElement("button");
	//maximizeButton.innerHTML = '⛶';
	maximizeButton.className = "maximizeButton";
	maximizeButton.setAttribute("aria-label", "Maximize");
	maximizeButton.onclick = () => maximizeWindow(windowElement);
	buttons.appendChild(maximizeButton);

	const closeButton = document.createElement("button");
	//closeButton.innerHTML = '⨉';
	closeButton.className = "closeButton";
	closeButton.setAttribute("aria-label", "Close");
	closeButton.onclick = () => closeWindow(windowElement);
	buttons.appendChild(closeButton);

	titleBar.appendChild(buttons);
	windowElement.appendChild(titleBar);

	const content = document.createElement("div");
	content.className = "content";
	windowElement.appendChild(content);

	container.appendChild(windowElement);

	// Center the window
	const containerRect = container.getBoundingClientRect();
	const windowRect = windowElement.getBoundingClientRect();
	windowElement.style.left = `${
		(containerRect.width - windowRect.width) / 2
	}px`;
	windowElement.style.top = `${
		(containerRect.height - windowRect.height) / 2
	}px`;

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
	if (element.classList.contains("maximized")) {
		element.classList.remove("maximized");
		element.style.width = `${element.initialWidth}px`;
		element.style.height = `${element.initialHeight}px`;
		element.style.left = `${element.initialLeft}px`;
		element.style.top = `${element.initialTop}px`;
	} else {
		element.classList.add("maximized");
		element.initialWidth = element.offsetWidth;
		element.initialHeight = element.offsetHeight;
		element.initialLeft = element.offsetLeft;
		element.initialTop = element.offsetTop;
		element.style.width = "100%";
		element.style.height = "100%";
		element.style.left = "0";
		element.style.top = "0";
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
