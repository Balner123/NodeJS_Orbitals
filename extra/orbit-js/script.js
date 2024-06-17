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
function plusrot(na) {
  if (na == 0) {
    angleation += 45;
  } else {
    angleation -= 45;
  }
  rotDisplay.textContent = `(${angleation}°)`;
  clearTrails();
  orbitals = [];
  setOrbitals();
}

// Clear all trails
function clearTrails() {
  for (let i = 0; i < orbitals.length; i++) {
    orbitals[i].trail = [];
  }
}

// Draw the trail of the orbital
function drawTrail(trail) {
  if (colr == 1) { stroke(0); } else { stroke(255, 255, 0); }
  strokeWeight(setW);
  noFill();
  beginShape();
  for (let i = 0; i < trail.length; i++) {
    vertex(trail[i].x, trail[i].y);
  }
  endShape();
}

// Draw the grid
function mriz() {
  let mez = 20;
  stroke(colr == 1 ? 0 : 255);
  strokeWeight(0.1);
  for (let i = 0; i < height / mez; i++) {
    line(0, height / 2 + (i * mez), width, height / 2 + (i * mez));
    line(0, height / 2 - (i * mez), width, height / 2 - (i * mez));
  }
  for (let i = 0; i < width / mez; i++) {
    line(width / 2 + (i * mez), 0, width / 2 + (i * mez), height);
    line(width / 2 - (i * mez), 0, width / 2 - (i * mez), height);
  }
  strokeWeight(1.5);
}

// Set orbitals based on the current configuration
function setOrbitals() {
  let de = 0;
  for (let i = 0; i < NT_NUMBER; i++) {
    de = fact(i);
    if (i < 1) {
      for (let v = 0; v < nummers[i]; v++) {
        orbitals.push(new Orbital(i, (360 / nummers[i] * v) + angleation, v));
      }
    } else {
      for (let v = 0; v < de; v++) {
        orbitals.push(new Orbital(i, (360 / nummers[i] * v) + angleation, v));
      }
    }
  }
  vypis();
}

// Calculate factorial for setting orbitals
function fact(pocet) {
  var faktor = 1;
  for (let d = 0; d < pocet + 1; d++) {
    faktor = faktor * nummers[d];
  }
  return faktor;
}

// Setup function to initialize the canvas and orbitals
function setup() {
  fetchDataFromServer().then(() => {
    createCanvas(windowWidth / 1.7, windowHeight / 1);
    circleX = width / 2;
    circleY = height / 2;
    for (let i = 0; i < nummers[0]; i++) {
      centerx[0][i] = circleX;
      centery[0][i] = circleY;
    }
    setOrbitals();
  }).catch(error => console.error("Error fetching data:", error));
}

// Draw function to render the orbitals and other elements
function draw() {
  background(colr == 1 ? 255 : 0);
  if (onmriz != 0) {
    mriz();
  }
  fill(255, 255, 255);
  orbitals.forEach(function (orbital) {
    orbital.draw();
  });
  push();
  textSize(20);
  fill(255);
  textAlign(LEFT, BOTTOM);
  for (let i = 0; i < NT_NUMBER; i++) {
    text("Orbital" + i +  " v=" + velocites[i] + " l=" + orbits[i] +" c=" + nummers[i] + ";", 30, height - 30 - i * 20);
  }
  pop();
}

// Log the current configuration to the console
function vypis() {
  console.log("NT_NUMBER :", NT_NUMBER);
  console.log("Objects_Orbitals: ", orbitals);
  console.log("orbit_on_layer: ", nummers);
  console.log("souradniceXY: ", centerx, centery);
}

// Show a modal with a message for a specified duration
function showModal(message, duration) {
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content p');
  modalContent.textContent = message;
  modal.style.display = 'flex';

  setTimeout(() => {
    modal.style.display = 'none';
  }, duration);
}

// Send data to the server
function sendDataToServer() {
  const confirmed = confirm("Ready to Send?");
  if (confirmed) {
    const name = prompt("Enter name of Curve:");

    if (name !== null && name.trim() !== '') {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // Months are zero-based
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const dataToSend = {
        NT_NUMBER: NT_NUMBER,
        velocites: velocites,
        orbits: orbits,
        nummers: nummers,
        timestamp: timestamp,
        name: name
      };

      fetch('/sendData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Response from server:', data);
          showModal("SUCCESS!", 500);
          alert("SUCCESS!");
        })
        .catch(error => console.error('Error sending data:', error));
    } else {
      alert("Enter name! Data weren't sent.");
    }
  }
}

// Fetch data from the server
function fetchDataFromServer() {
  return fetch(`/getDataP`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      NT_NUMBER = data.NT_NUMBER;
      velocites = data.velocites;
      orbits = data.orbits;
      nummers = data.nummers;
      accer = 0.5;
    })
    .catch(error => console.error('Error fetching data:', error));
}
