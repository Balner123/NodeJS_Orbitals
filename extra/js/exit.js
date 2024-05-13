let circleX;
let circleY;
let centerx = [];
let centery = [];
let orbitals = [];
let NT_NUMBER = 3;
let velocites = [3,10,2,10];

class Orbital {
  constructor(i, langtitude, velocity) {
    this.i = i;
    this.la = langtitude;
    this.ve = velocity;
    this.angle = 0;
    this.x;
    this.y;
    this.trail = [];
  }

  move() {
    this.x = centerx[this.i] + Math.cos(this.angle * (PI / 180)) * this.la;
    this.y = centery[this.i] + Math.sin(this.angle * (PI / 180)) * this.la;
    centerx[this.i + 1] = this.x;
    centery[this.i + 1] = this.y;

    // Přidá nový bod do stopy pouze pro nejvzdálenější planetu
   /** if (this.i === NT_NUMBER - 1) {*/
      this.trail.push(createVector(this.x, this.y));

      // Omezení délky stopy na 100 bodů
      if (this.trail.length > 2000) {
        this.trail.shift();
      }
    
  }

  angles() {
    if(this.i%1){
        this.angle += this.ve;
        if (this.angle == 360) {
          this.angle = 0;
        }
    }else{
        this.angle -= this.ve;
        if (this.angle == -360) {
          this.angle = 0;
        }
    }
  }

  draw() {
    this.angles();
    this.move();
    push();
    fill(255, 255, 255);
    ellipse(this.x, this.y, 10, 10);
    stroke(255);
    line(this.x, this.y, centerx[this.i], centery[this.i]);
    pop();

    // Vykreslí stopu pouze pro nejvzdálenější planetu
    /**if (this.i === NT_NUMBER - 1) {*/
      drawTrail(this.trail);
    
  }
}

function setup() {
  createCanvas(displayWidth, 800);
  circleX = width / 2;
  circleY = height / 2;
  centerx[0] = circleX;
  centery[0] = circleY;

  for (let i = 0; i < NT_NUMBER; i++) {
    orbitals.push(new Orbital(i, 200 / (i+1)*(1/3), 3*(i+1)));
  }
}

function draw() {
  background(0);
  fill(255, 255, 255);
  ellipse(circleX, circleY, 20, 20);

  orbitals.forEach(function (orbital, idx, arr) {
    orbital.draw();
  });
}

function drawTrail(trail) {
  // Vykreslí stopu žluté barvy
  stroke(255, 255, 0);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let i = 0; i < trail.length; i++) {
    vertex(trail[i].x, trail[i].y);
  }
  endShape();
}
