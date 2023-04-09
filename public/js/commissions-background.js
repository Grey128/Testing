const particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(51);
}

function draw() {
  background(0, 50);

  if (particles.length < 150) {
    particles.push(new Particle(mouseX, mouseY));
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();

    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prevPos = this.pos.copy();
    this.vel = p5.Vector.random2D().mult(2);
    this.acc = createVector(0, 0);
  }

  update() {
    this.prevPos = this.pos.copy();

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.vel.limit(5);
  }

  show() {
    stroke(255, 50);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }

  finished() {
    return (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    );
  }
}
