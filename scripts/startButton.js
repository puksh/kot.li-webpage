const startButton = document.getElementById("startbuttonImg");

startButton.addEventListener("click", function () {
	this.classList.toggle("clicked");
	startMenu.classList.toggle("visible");
});

startButton.addEventListener("mouseleave", function () {
	if (startMenu.style.visible === "none") {
		this.classList.remove("clicked");
	}
});

const startMenu = document.getElementById("startMenu");
startMenu.style.visible = "none";

document.addEventListener("click", function (event) {
	const startMenu = document.getElementById("startMenu");
	const startButton = document.getElementById("startbuttonImg");
	if (
		!startMenu.contains(event.target) &&
		!startButton.contains(event.target)
	) {
		startMenu.style.visible = "none";
		startButton.classList.remove("clicked");
	}
});
// CSS for the start menu
const style = document.createElement("style");
document.head.appendChild(style);
