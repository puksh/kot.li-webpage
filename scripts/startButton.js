const startButton = document.getElementById("startbuttonImg");

startButton.addEventListener("click", function () {
	this.classList.toggle("clicked");
});

startButton.addEventListener("mouseleave", function () {
	this.classList.remove("clicked");
});
