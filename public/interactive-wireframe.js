const canvas = document.getElementById('wireframe');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
}

class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  }
}

const circles = [];
const lines = [];

for (let i = 0; i < 50; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 4;
  circles.push(new Circle(x, y, radius));
}

function connectCircles() {
  lines.length = 0;

  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      const dx = circles[i].x - circles[j].x;
      const dy = circles[i].y - circles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        lines.push(new Line(circles[i].x, circles[i].y, circles[j].x, circles[j].y));
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const circle of circles) {
    circle.draw();
  }

  for (const line of lines) {
    line.draw();
  }

  connectCircles();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('mousemove', (e) => {
  circles[0].x = e.clientX;
  circles[0].y = e.clientY;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
