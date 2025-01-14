const startButton = document.getElementById("startbuttonImg");

startButton.addEventListener("click", function () {
	this.classList.toggle("clicked");
	startMenu.classList.toggle("visible");
});

startButton.addEventListener("mouseleave", function () {
	if (startMenu.style.display === "none") {
		this.classList.remove("clicked");
	}
});

const startMenu = document.getElementById("startMenu");
startMenu.style.display = "none";

function toggleStartMenu() {
	var startMenu = document.getElementById("startMenu");
	if (startMenu.style.display === "none") {
		startMenu.style.display = "flex";
	} else {
		startMenu.style.display = "none";
	}
}
// CSS for the start menu
const style = document.createElement("style");
document.head.appendChild(style);

// HTML structure for the start menu
startMenu.innerHTML = `
	<ul>
		<li>Programs</li>
		<li>Documents</li>
		<li>Settings</li>
		<li>Search</li>
		<li>Help</li>
		<li>Run...</li>
	</ul>
`;
