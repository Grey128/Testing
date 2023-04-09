const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 1;
    this.weight = Math.random() * 1 + 1;
    this.directionX = -Math.random() * 4;
  }

  update() {
    this.size -= 0.05;
    if (this.size < 0) {
      this.x = (mouse.x + ((Math.random() * 20) - 10));
      this.y = (mouse.y + ((Math.random() * 20) - 10));
      this.size = (Math.random() * 2) + 0.5;
      this.weight = (Math.random() * 1) + 1;
    }
    this.y += this.weight;
    this.x += this.directionX;

    if (this.size >= 0.2) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(140, 85, 31, 1)';
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + 2);
      ctx.stroke();
    }
  }
}

function init() {
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
  requestAnimationFrame(animate);
}

init();
animate();

const mouse = {
  x: null,
  y: null
};

canvas.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
