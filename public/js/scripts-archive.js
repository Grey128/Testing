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

async function fetchImages() {
    const response = await fetch('/images');
    const images = await response.json();
    
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';
  
    images.forEach(image => {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'image-box';
  
      const img = document.createElement('img');
      img.src = `uploads/${image.filename}`;
      img.alt = image.name;
  
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
  
      const imgText = document.createElement('p');
      imgText.className = 'image-text';
      imgText.innerText = image.name;
  
      overlay.appendChild(imgText);
      imgDiv.appendChild(img);
      imgDiv.appendChild(overlay);
      imageContainer.appendChild(imgDiv);
    });
  }
  