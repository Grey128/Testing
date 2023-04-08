document.addEventListener('DOMContentLoaded', () => {
  const brokenText = createBrokenText();
  document.body.appendChild(brokenText);
  animateBrokenText(brokenText);
});

function createBrokenText() {
  const div = document.createElement('div');
  div.textContent = '[broken af]';
  div.className = 'broken-text';
  return div;
}

function animateBrokenText(element) {
  let xPos = 0;
  let yPos = 0;
  let xSpeed = 2;
  let ySpeed = 2;

  const animation = () => {
    xPos += xSpeed;
    yPos += ySpeed;

    if (xPos + element.clientWidth > window.innerWidth || xPos < 0) {
      xSpeed = -xSpeed;
    }

    if (yPos + element.clientHeight > window.innerHeight || yPos < 0) {
      ySpeed = -ySpeed;
    }

    element.style.left = xPos + 'px';
    element.style.top = yPos + 'px';
    requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
}