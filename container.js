document.addEventListener('DOMContentLoaded', () => {
    createContainer();
});

function createContainer() {
    const container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);

    // Additional setup if necessary
    console.log('Container created and added to the DOM.');
}
