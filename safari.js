document.addEventListener('DOMContentLoaded', () => {
    checkAndCreateFirefoxDownloadButton();
});

function checkAndCreateFirefoxDownloadButton() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');

    if (isSafari) {
        document.body.innerHTML = ''; // Clear the entire body content

        const downloadButton = document.createElement('button');
        downloadButton.innerText = 'Download Librefox';
        downloadButton.style.position = 'absolute';
        downloadButton.style.top = '50%';
        downloadButton.style.left = '50%';
        downloadButton.style.transform = 'translate(-50%, -50%)';
        downloadButton.style.fontSize = '20px';
        downloadButton.style.padding = '10px 20px';
        downloadButton.style.cursor = 'pointer';
        downloadButton.onclick = () => {
            window.location.href = 'https://librewolf.net/installation/';
        };

        document.body.appendChild(downloadButton);
    }
}
