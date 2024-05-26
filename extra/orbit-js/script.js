let circleX;
let circleY;

let centerx = [];
let centery = [];

for (let i = 0; i < 10; i++) {
  centerx.push([]);
  centery.push([]);
}

let orbitals = [];  
let NT_NUMBER = 2;  
let velocites = [3.1 * 3, 7 * 3];   
let orbits = [100, 50];        
let nummers = [1, 1];            
let deflections = [0, 0, 0, 0];

let numberInputValue = 0;
let scope = 0.85;   
let accer = 0.25;
let setW = 1.0;
let angleation = 0;
let onob = 1;
let onmriz = 1;
let colr = 1;

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

class Orbital {       
  constructor(i, ang, v) {    
    this.i = i;
    this.we = v;
    this.angle = ang - 90;
    this.x;
    this.y;
    this.trail = [];
    console.log("Layer:", this.i + 1, ",", "Orbital:", this.we + 1);  
  }

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

function mrizon() {
  onmriz == 1 ? onmriz = 0 : onmriz = 1;
}

function onobjekts() {
  onob == 1 ? onob = 0 : onob = 1;
}

function colormod() {
  colr == 0 ? colr = 1 : colr = 0;
}

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

function plusvel(na) {
  if (na == 0) {
    accer += 0.2;
  } else if (accer > 0.2) {
    accer -= 0.2;
  }
  desDisplay.textContent = `(${Math.round(accer * 100 / 10) * 10}%)`;
}

function chanWei(na) {
  if (na == 0) {
    setW += 0.1;
  } else if (setW > 0.1) {
    setW -= 0.1;
  }
  WeiDisplay.textContent = `(${Math.round(setW * 100 / 10) * 10}%)`;
}

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

function clearTrails() {
  for (let i = 0; i < orbitals.length; i++) {
    orbitals[i].trail = [];
  }
}

function drawTrail(trail) {
  if(colr ==1){stroke(0);}else{stroke(255,255,0);}
  strokeWeight(setW);
  noFill();
  beginShape();
  for (let i = 0; i < trail.length; i++) {
    vertex(trail[i].x, trail[i].y);
  }
  endShape();
}

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

function fact(pocet) {
  var faktor = 1;
  for (let d = 0; d < pocet + 1; d++) {
    faktor = faktor * nummers[d];
  }
  return faktor;
}

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

function vypis() {
  console.log("NT_NUMBER :", NT_NUMBER);
  console.log("Objects_Orbitals: ", orbitals);
  console.log("orbit_on_layer: ", nummers);
  console.log("souradniceXY: ", centerx, centery);
}

function showModal(message, duration) {
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content p');
  modalContent.textContent = message;
  modal.style.display = 'flex';

  setTimeout(() => {
    modal.style.display = 'none';
  }, duration);
}



function sendDataToServer() {
  const confirmed = confirm("Opravdu Odeslat?");
  if (confirmed) {



    const dataToSend = {
      NT_NUMBER: NT_NUMBER,
      velocites: velocites,
      orbits: orbits,
      nummers: nummers,
      timestamp: new Date().toISOString().split('T')[0]
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
      })
      .catch(error => console.error('Error sending data:', error));


      showModal("SUCCESS!",500);
  }
}

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
      accer=0.5
    })
    .catch(error => console.error('Error fetching data:', error));
}
