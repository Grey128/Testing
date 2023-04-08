async function fetchImages() {
    try {
      const response = await fetch('/images');
      if (response.ok) {
        const images = await response.json();
        const imageGrid = document.getElementById('image-grid');
        imageGrid.innerHTML = '';
  
        for (const image of images) {
          const imgElement = document.createElement('img');
          imgElement.src = `/uploads/${image.filename}`;
          imgElement.width = 200;
          imgElement.height = 200;
          imageGrid.appendChild(imgElement);
        }
      }
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  }
  
  fetchImages();
  