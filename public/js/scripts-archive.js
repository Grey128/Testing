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
  const starFrequency = 100; // 10 stars per second

  body.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function createStar(x, y) {
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    star.classList.add('star');
    star.setAttribute('viewBox', '0 0 20 20');
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    starsContainer.appendChild(star);

    const starPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    starPath.setAttribute('points', '10,1 4,19 19,7.5 1,7.5 16,19');
    starPath.style.fill = 'black';
    star.appendChild(starPath);

    setTimeout(() => {
      starsContainer.removeChild(star);
    }, 10000);
  }

  function spawnStar() {
    createStar(mouseX, mouseY);
  }

  setInterval(spawnStar, 1000 / starFrequency);

  function update() {
    requestAnimationFrame(update);
  }
});