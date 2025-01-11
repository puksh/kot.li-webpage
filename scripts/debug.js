document.addEventListener("click", (event) => {
	logElement(event, "click");
});

document.addEventListener("dblclick", (event) => {
	logElement(event, "dblclick");
});

function logElement(event, eventType) {
	const element = event.target;
	const elementInfo = getElementInfo(element);
	console.log(`[${eventType}] Element clicked: ${elementInfo}`);
}

function getElementInfo(element) {
	const tag = element.tagName.toLowerCase();
	const id = element.id ? `#${element.id}` : "";
	const classes = element.className
		? `.${element.className.split(" ").join(".")}`
		: "";
	const rect = element.getBoundingClientRect();
	const zIndex = window.getComputedStyle(element).zIndex;

	return `${tag}${id}${classes} [z-index: ${zIndex}] [pos: ${rect.left}, ${rect.top}, ${rect.width}x${rect.height}]`;
}
