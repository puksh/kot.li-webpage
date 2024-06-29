document.addEventListener('DOMContentLoaded', () => {
    checkAndCreateFirefoxDownloadButton();
});

function checkAndCreateFirefoxDownloadButton() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    //if (isSafari || isIOS) {
    if (isSafari) {
        document.body.innerHTML = ''; // Clear the entire body content

        const message = document.createElement('p');
        message.innerText = 'This website does not work on the Safari Browser. Please download Firefox for a better experience.';
        message.style.position = 'absolute';
        message.style.top = '40%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.fontSize = '20px';
        message.style.textAlign = 'center';

        const downloadButton = document.createElement('button');
        downloadButton.innerText = 'Download Firefox';
        downloadButton.style.position = 'absolute';
        downloadButton.style.top = '50%';
        downloadButton.style.left = '50%';
        downloadButton.style.transform = 'translate(-50%, -50%)';
        downloadButton.style.fontSize = '20px';
        downloadButton.style.padding = '10px 20px';
        downloadButton.style.cursor = 'pointer';
        downloadButton.onclick = () => {
            window.location.href = 'https://www.mozilla.org/firefox/download/';
        };

        document.body.appendChild(message);
        document.body.appendChild(downloadButton);
    }
}
