let stars = [];
let starIdCounter = 1;
let mouseX = 0;
let mouseY = 0;

function createStar(x, y) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.id = 'star' + starIdCounter;
    starIdCounter++;
    stars.push({ element: star, velocity: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 } });
    document.body.appendChild(star);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

function spawnStars() {
    createStar(mouseX, mouseY);
}

setInterval(spawnStars, 1000 / 10); // Spawn stars 10 times per second

function updateStarPositions() {
    stars.forEach((star, index) => {
        star.element.style.left = parseFloat(star.element.style.left) + star.velocity.x + 'px';
        star.element.style.top = parseFloat(star.element.style.top) + star.velocity.y + 'px';

        if (parseFloat(star.element.style.left) < 0 || parseFloat(star.element.style.top) < 0 || parseFloat(star.element.style.left) > window.innerWidth || parseFloat(star.element.style.top) > window.innerHeight) {
            document.body.removeChild(star.element);
            stars.splice(index, 1);
        }
    });
}

setInterval(updateStarPositions, 1000 / 60); // Update star positions 60 times per second

const images = document.querySelectorAll('.gallery img');
const imageName = document.getElementById('image-name');

images.forEach((img) => {
    img.addEventListener('mouseover', () => {
        imageName.textContent = img.dataset.name;
        imageName.style.display = 'block';
    });

    img.addEventListener('mouseout', () => {
        imageName.style.display = 'none';
    });
});
