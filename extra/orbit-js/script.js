let circleX; // X-coordinate of the central circle
let circleY; // Y-coordinate of the central circle

let centerx = []; // Array to hold X-coordinates of centers of orbitals
let centery = []; // Array to hold Y-coordinates of centers of orbitals

// Initialize centerx and centery arrays with empty arrays for 10 layers
for (let i = 0; i < 10; i++) {
  centerx.push([]);
  centery.push([]);
}

let orbitals = []; // Array to hold all orbital objects
let NT_NUMBER = 2; // Number of layers of orbitals
let velocites = [3.1 * 3, 7 * 3]; // Velocities of orbitals
let orbits = [100, 50]; // Radii of orbits
let nummers = [1, 1]; // Number of orbitals in each layer
let deflections = [0, 0, 0, 0]; // Deflections for orbitals

let numberInputValue = 0;
let scope = 0.85; // Scale of orbits
let accer = 0.25; // Acceleration factor for orbitals
let setW = 1.0; // Stroke weight for trail drawing
let angleation = 0; // Angle adjustment for orbitals
let onob = 1; // Flag for displaying orbitals
let onmriz = 1; // Flag for displaying grid
let colr = 1; // Color mode for drawing

// Create display elements for various parameters
let desDisplay = document.createElement("span");
let desDisplayContainer = document.getElementById('desDisplay'); 
desDisplayContainer.appendChild(desDisplay);
desDisplay.textContent = `(${accer * 100}%)`;

let angDisplay = document.createElement("span");
let angDisplayContainer = document.getElementById('angDisplay'); 
angDisplayContainer.appendChild(angDisplay);
angDisplay.textContent = `(${scope * 100}%)`;

let WeiDisplay = document.createElement("span");
let WeiDisplayContainer = document.getElementById('WeiDisplay'); 
WeiDisplayContainer.appendChild(WeiDisplay);
WeiDisplay.textContent = `(${setW * 100}%)`;

let rotDisplay = document.createElement("span");
let rotDisplayContainer = document.getElementById('rotDisplay'); 
rotDisplayContainer.appendChild(rotDisplay);
rotDisplay.textContent = `(${angleation}°)`;

// Orbital class definition
class Orbital {       
  constructor(i, ang, v) {    
    this.i = i; // Layer index
    this.we = v; // Orbital index in the layer
    this.angle = ang - 90; // Initial angle
    this.x; // X-coordinate of the orbital
    this.y; // Y-coordinate of the orbital
    this.trail = []; // Array to hold the trail of the orbital
    console.log("Layer:", this.i + 1, ",", "Orbital:", this.we + 1);  
  }

  // Move the orbital
  move() { 
    this.x = centerx[this.i][this.we] + Math.cos(this.angle * (PI / 180)) * (orbits[this.i] * scope);
    this.y = centery[this.i][this.we] + Math.sin(this.angle * (PI / 180)) * (orbits[this.i] * scope);

    for (let z = 0; z < nummers[this.i + 1]; z++) {     
      centerx[this.i + 1][z + this.we * nummers[this.i + 1]] = this.x;
      centery[this.i + 1][z + this.we * nummers[this.i + 1]] = this.y;
      push();
    }

    if (this.i === NT_NUMBER - 1) {     
      this.trail.push(createVector(this.x, this.y));
      if (this.trail.length > 8000) {  
        this.trail.shift();
      }
    }
  }

  // Update the angle of the orbital
  angles() {   
    if (this.i % 1) {
      this.angle += velocites[this.i] * accer;
      if (this.angle == 360) {
        this.angle = 0;
      }
    } else {
      this.angle -= velocites[this.i] * accer;
      if (this.angle == -360) {
        this.angle = 0;
      }
    }
  }

  // Draw the orbital and its trail
  draw() {    
    this.angles();
    this.move();
    push();
    if (onob != 0) {
      fill(255, 255, 255);
      ellipse(circleX, circleY, 20 , 20 );
      ellipse(this.x, this.y, 5 , 5 );
      stroke(colr == 1 ? 0 : 255);
      strokeWeight(1.2);
      line(this.x, this.y, centerx[this.i][this.we], centery[this.i][this.we]);
    }
    pop();
    drawTrail(this.trail);  
  }
}

// Reset the animation with new parameters
function resetAnimation() {   
  clearTrails();
  NT_NUMBER = numberInputValue;
  orbitals = [];
  velocites = [];
  orbits = [];
  deflections = [];
  nummers = [];
  scope = 0.5;
  accer = 1.0;
  setW = 1.0;
  angleation = 0;

  for (var i = 0; i < NT_NUMBER; i++) {   
    var orbi = 'orbit' + i;
    orbits[i] = document.getElementById(orbi).value;
    var vel = 'velocity' + i;
    velocites[i] = document.getElementById(vel).value;
    var num = 'nummers' + i;
    nummers[i] = document.getElementById(num).value;
  }

  centerx = [];     
  centery = [];

  for (let i = 0; i < 10; i++) {
    centerx.push([]);
    centery.push([]);
  }

  for (let i = 0; i < nummers[0]; i++) {
    centerx[0][i] = circleX;
    centery[0][i] = circleY;
  }

  setOrbitals();    
}

// Update the inputs for new orbitals
function nwe() {        
  numberInputValue = document.getElementById('numberInput').value;
  var velocityInputsContainer = document.getElementById('velocityInputsContainer');
  var orbitInputsContainer = document.getElementById('orbitInputsContainer');
  var nummersInputsContainer = document.getElementById('nummersInputsContainer');
  nummersInputsContainer.innerHTML = "";
  velocityInputsContainer.innerHTML = "";
  orbitInputsContainer.innerHTML = ""; 

  for (var i = 0; i < numberInputValue; i++) {  
    var tableRow = document.createElement('tr');
    var orbitLabel = document.createElement('span');
    orbitLabel.textContent = `${i + 1}. Orbit.L:`;

    var nummersInput = document.createElement('input');
    nummersInput.type = 'number';
    nummersInput.className = 'nummersInput';
    nummersInput.id = 'nummers' + i;
    nummersInput.placeholder = 'Enter count of orbitals';

    var velocityInput = document.createElement('input');
    velocityInput.type = 'number';
    velocityInput.className = 'velocityInput';
    velocityInput.id = 'velocity' + i;
    velocityInput.placeholder = 'Enter velocity';
   
    var orbitInput = document.createElement('input');
    orbitInput.type = 'number';
    orbitInput.className = 'orbitInput';
    orbitInput.id = 'orbit' + i;
    orbitInput.placeholder = 'Enter orbit';

    tableRow.appendChild(orbitLabel);
    tableRow.appendChild(velocityInput);
    tableRow.appendChild(orbitInput);
    tableRow.appendChild(nummersInput);

    velocityInputsContainer.appendChild(tableRow);
  }
}

// Toggle grid visibility
function mrizon() {
  onmriz == 1 ? onmriz = 0 : onmriz = 1;
}

// Toggle orbitals visibility
function onobjekts() {
  onob == 1 ? onob = 0 : onob = 1;
}

// Toggle color mode
function colormod() {
  colr == 0 ? colr = 1 : colr = 0;
}

// Adjust scope (size of orbits)
function plusorb(na) {
  clearTrails();
  orbitals[orbitals.length - 1].trail = [];
  if (na == 0) {
    scope += 0.2;
  } else if (scope > 0.2) {
    scope -= 0.2;
  }
  angDisplay.textContent = `(${Math.round(scope * 100 / 10) * 10}%)`;
}

// Adjust velocity
function plusvel(na) {
  if (na == 0) {
    accer += 0.2;
  } else if (accer > 0.2) {
    accer -= 0.2;
  }
  desDisplay.textContent = `(${Math.round(accer * 100 / 10) * 10}%)`;
}

// Adjust stroke weight
function chanWei(na) {
  if (na == 0) {
    setW += 0.1;
  } else if (setW > 0.1) {
    setW -= 0.1;
  }
  WeiDisplay.textContent = `(${Math.round(setW * 100 / 10) * 10}%)`;
}

// Adjust rotation
functio
