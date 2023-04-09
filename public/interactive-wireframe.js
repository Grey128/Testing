const canvas = document.getElementById('wireframeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const points = [];
const connections = [];
const gridSize = 50;
const connectionDistance = 100;
const interactionRadius = 80;

function createPoints() {
  for (let i = 0; i < canvas.width; i += gridSize) {
    for (let j = 0; j < canvas.height; j += gridSize) {
      points.push(new Point(i, j));
    }
  }
}

function connectPoints() {
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      connections.push([points[i], points[j]]);
    }
  }
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  connections.forEach(connection => {
    ctx.beginPath();
    ctx.moveTo(connection[0].x, connection[0].y);
    ctx.lineTo(connection[1].x, connection[1].y);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.stroke();
  });

  points.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
  });
}

createPoints();
connectPoints();
drawGrid();

canvas.addEventListener('mousemove', e => {
  const cursorPos = new Point(e.clientX, e.clientY);

  points.forEach(point => {
    const dx = point.x - cursorPos.x;
    const dy = point.y - cursorPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < interactionRadius) {
      const angle = Math.atan2(dy, dx);
      const offsetX = Math.cos(angle) * (interactionRadius - dist) * 0.2;
      const offsetY = Math.sin(angle) * (interactionRadius - dist) * 0.2;

      point.x += offsetX;
      point.y += offsetY;
    }
  });

  drawGrid();
});
