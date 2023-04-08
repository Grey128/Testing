async function fetchImages() {
    const response = await fetch('/images');
    const images = await response.json();
    const container = document.getElementById('images-container');
    images.forEach(image => {
      const img = document.createElement('img');
      img.src = `/uploads/${image.filename}`;
      img.width = 300;
      container.appendChild(img);
    });
  }
  
  fetchImages();
  