function Gallery(container) {
  const galleryContainer = document.createElement('div');
  galleryContainer.id = 'galleryContainer';
  galleryContainer.classList.add('gallery-container');
  container.appendChild(galleryContainer);

  const script = document.createElement('script');
  script.src = 'imageList.js';
  script.onload = function() {
    loadImages(imageList);
  };
  document.head.appendChild(script);

  function loadImages(images) {
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
      const img = document.createElement('img');
      img.src = imageSrc;
      img.classList.add('imgGrooby');
      columns[index % numberOfColumns].appendChild(img);
    });

    galleryContainer.classList.add('loaded');
  }
}
