// Function to toggle the 'active' class on sections
document.querySelectorAll('nav button').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        var sectionId = this.getAttribute('data-target');
        document.querySelectorAll('.content').forEach(function(section) {
            if (section.id === sectionId) {
                section.classList.add('active');
                if (sectionId === 'gallery') {
                    loadGalleryImages();
                }
            } else {
                section.classList.remove('active');
            }
        });
    });
});

const startButton = document.getElementById('startbuttonImg');

    startButton.addEventListener('click', function() {
        this.classList.toggle('clicked');
    });

    startButton.addEventListener('mouseleave', function() {
        this.classList.remove('clicked');
    });

function loadGalleryImages() {
    var galleryContainer = document.getElementById('galleryContainer');
    if (galleryContainer.classList.contains('loaded')) {
        return;
    }

    // Load the generated image list
    var script = document.createElement('script');
    script.src = 'imageList.js';
    script.onload = function() {
        loadImages(imageList);
    };
    document.head.appendChild(script);

    function loadImages(images) {
        const galleryContainer = document.getElementById('galleryContainer');
        const imagesPerColumn = 3;
        const numberOfColumns = Math.ceil(images.length / imagesPerColumn);
    
        const columns = [];
        for (let i = 0; i < numberOfColumns; i++) {
            const column = document.createElement('div');
            column.classList.add('column');
            galleryContainer.appendChild(column);
            columns.push(column);
        }
    
        images.forEach((imageSrc, index) => {
            var img = document.createElement('img');
            img.src = imageSrc;
            img.classList.add('imgGrooby');
            columns[index % numberOfColumns].appendChild(img);
        });
    
        galleryContainer.classList.add('loaded');
    }
}
