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

function loadGalleryImages() {
    var galleryContainer = document.getElementById('gallery');
    if (galleryContainer.classList.contains('loaded')) {
        return; // Images already loaded
    }

    // Load the generated image list
    var script = document.createElement('script');
    script.src = 'imageList.js';
    script.onload = function() {
        loadImages(imageList);
    };
    document.head.appendChild(script);

    // Function to load images based on image data
    function loadImages(images) {
        images.forEach(function(imageSrc) {
            var img = document.createElement('img');
            img.src = imageSrc;
            galleryContainer.appendChild(img); // Append the image to the container
        });

        // Add 'loaded' class to indicate that images have been loaded
        galleryContainer.classList.add('loaded');
    }
}
