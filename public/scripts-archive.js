async function fetchImages() {
  const response = await fetch('/images');
  const images = await response.json();
  return images;
}

async function setBackgroundImage() {
  const images = await fetchImages();
  if (images.length > 0) {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imageUrl = `/uploads/${randomImage.filename}`;
    const backgroundElement = document.createElement('img');
    backgroundElement.className = 'image-background';
    backgroundElement.src = imageUrl;
    document.body.appendChild(backgroundElement);
  }
}

async function deleteImage(filename) {
  const response = await fetch(`/image/${filename}`, { method: 'DELETE' });

  if (response.ok) {
    alert('Image deleted successfully.');
    window.location.reload();
  } else {
    alert('Error deleting image. Please try again.');
  }
}

setBackgroundImage();
