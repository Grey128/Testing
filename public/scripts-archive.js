document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const starsContainer = document.createElement('div');
  starsContainer.style.position = 'fixed';
  starsContainer.style.top = '0';
  starsContainer.style.left = '0';
  starsContainer.style.width = '100%';
  starsContainer.style.height = '100%';
  starsContainer.style.pointerEvents = 'none';
  body.appendChild(starsContainer);

  let mouseX = 0;
  let mouseY = 0;
  const starFrequency = 10; // 10 stars per second

  body.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function createStar(x, y) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starsContainer.appendChild(star);

    setTimeout(() => {
      starsContainer.removeChild(star);
    }, 1000);
  }

  function spawnStar() {
    createStar(mouseX, mouseY);
  }

  setInterval(spawnStar, 1000 / starFrequency);
});
