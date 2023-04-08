function displayImages(images) {
    const container = document.getElementById('image-container');
    container.innerHTML = '';
  
    for (const image of images) {
      const div = document.createElement('div');
      div.className = 'image-wrapper';
  
      const img = document.createElement('img');
      img.src = `/uploads/${image.filename}`;
      img.alt = image.name;
  
      const name = document.createElement('p');
      name.textContent = image.name;
  
      div.appendChild(img);
      div.appendChild(name);
      container.appendChild(div);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetch('/images')
      .then(response => response.json())
      .then(images => displayImages(images));
  });
// Compare this function from app.js:

async function fetchImages()
{
    try
    {
        const response = await fetch('/images');
        if (response.ok)
        {
            const images = await response.json();
            const imageGrid = document.getElementById('image-grid');
            imageGrid.innerHTML = '';

            for (const image of images)
            {
                const imgElement = document.createElement('img');
                imgElement.src = `/uploads/${image.filename}`;
                imgElement.width = 200;
                imgElement.height = 200;
                imageGrid.appendChild(imgElement);
            }
        }
    }
    catch (err)
    {
        console.error('Error fetching images:', err);
    }
}

// Compare this function from public\scripts-upload.js: