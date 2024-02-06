// Function to toggle the 'active' class on sections
document.querySelectorAll('nav a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        var sectionId = this.getAttribute('href').slice(1);
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

// Function to load images into the gallery section
function loadGalleryImages() {
    var galleryContainer = document.getElementById('gallery');
    if (galleryContainer.classList.contains('loaded')) {
        return; // Images already loaded
    }

    // Check if image data is already stored in localStorage
    var imageData = localStorage.getItem('galleryImages');
    if (imageData) {
        // If data is found, parse it and load images
        imageData = JSON.parse(imageData);
        loadImages(imageData);
    } else {
        // If no data is found, load images from a default source and store them in localStorage
        var defaultImages = [
            { src: 'images/image1.jpg', source: 'idk' }
            //add more
        ];
        localStorage.setItem('galleryImages', JSON.stringify(defaultImages));
        loadImages(defaultImages);
    }

    // Function to load images based on image data
    function loadImages(images) {
        images.forEach(function(imageData) {
            var link = document.createElement('a');
            link.href = imageData.source;
            link.target = '_blank'; // Open link in a new tab

            var img = document.createElement('img');
            img.src = imageData.src;
            img.alt = 'Image'; // Add alt text as needed

            link.appendChild(img);
            galleryContainer.appendChild(link);
        });

        // Add 'loaded' class to indicate that images have been loaded
        galleryContainer.classList.add('loaded');
    }
}