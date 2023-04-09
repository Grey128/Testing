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
const interactionRadius 80;

function createPoints() {
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            points.push(new Point(x, y));
        }
    }
}

function connectPoints() {
    points.forEach((point, i) => {
        points.forEach((point2, j) => {
            if (i !== j) {
                const dx = point.x - point2.x;
                const dy = point.y - point2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    connections.push([point, point2]);
                }
            }
        });
    });
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    connections.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(connection[0].x, connection[0].y);
        ctx.lineTo(connection[1].x, connection[1].y);
        ctx.fillStyle = 'black';
        ctx.stroke();
    });

    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
    });
}

createPoints();
connectPoints();
drawGrid();

canvas.addEventListener('mousemove', (event) => {
    const cursorPos = new Point(event.clientX, event.clientY);

    points.forEach(point => {
        const dx = event.clientX - point.x;
        const dy = event.clientY - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < interactionRadius) {
            const angle = Math.atan2(dy, dx);
            const tx = event.clientX - Math.cos(angle) * interactionRadius;
            const ty = event.clientY - Math.sin(angle) * interactionRadius;

            point.x += tx - point.x;
            point.y += ty - point.y;
        }
    });

    drawGrid();
});
