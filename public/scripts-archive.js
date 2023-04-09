document.addEventListener('DOMContentLoaded', () => {
  loadImages();
});

async function loadImages() {
  try {
    const response = await fetch('/images');
    const images = await response.json();
    const imagesContainer = document.getElementById('images-container');

    for (const image of images) {
      const imageUrl = '/uploads/' + image.filename;
      const imageCard = document.createElement('div');
      imageCard.className = 'image-card';

      const img = document.createElement('img');
      img.src = imageUrl;
      imageCard.appendChild(img);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteImage(image.filename));
      imageCard.appendChild(deleteButton);

      imagesContainer.appendChild(imageCard);
    }
  } catch (error) {
    console.error('Error loading images:', error);
  }
}

async function deleteImage(filename) {
  try {
    const response = await fetch(`/images/${filename}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      location.reload();
    } else {
      console.error('Error deleting image');
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}
