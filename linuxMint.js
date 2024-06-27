document.addEventListener('DOMContentLoaded', () => {
    checkAndCreateWindowsInstallButton();
});

function checkAndCreateWindowsInstallButton() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isLinuxMint = userAgent.includes('linux mint');

    if (isLinuxMint) {
        document.body.innerHTML = ''; // Clear the entire body content

        const installButton = document.createElement('button');
        installButton.innerText = 'Install Windows 11';
        installButton.style.position = 'absolute';
        installButton.style.top = '50%';
        installButton.style.left = '50%';
        installButton.style.transform = 'translate(-50%, -50%)';
        installButton.style.fontSize = '20px';
        installButton.style.padding = '10px 20px';
        installButton.style.cursor = 'pointer';
        installButton.onclick = () => {
            window.location.href = 'https://www.microsoft.com/software-download/windows11';
        };

        document.body.appendChild(installButton);
    }
}
