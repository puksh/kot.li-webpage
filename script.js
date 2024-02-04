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

    // Assuming images are stored in the 'images' folder
    var imagesFolder = 'images/';
    var numImages = 1; // Number of images in the folder

    // Loop through each image and create an <img> element
    for (var i = 1; i <= numImages; i++) {
        var img = document.createElement('img');
        img.src = imagesFolder + 'image' + i + '.jpg'; // Adjust the filename pattern as needed
        galleryContainer.appendChild(img);
    }

    // Add 'loaded' class to indicate that images have been loaded
    galleryContainer.classList.add('loaded');
}
