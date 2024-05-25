const karty = document.getElementById('karty');
karty.innerHTML = '';

function fetchDataAndRenderCards() {
  fetch('/getData')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((karta, index) => {
        let Orbital = `      
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5">
          <div class="card h-300 w-200" data-bs-toggle="modal" data-country="${index + 1}">
            <div class="card-body">
              <h4 class="card-title">CreT:#${index + 1}</h4>
              <p>${karta.timestamp}<br>
              <b>Velocities:</b> ${karta.velocites.join(', ')}<br>
              <b>Orbits:</b> ${karta.orbits.join(', ')}<br>
              <b>Orbitals_per_layer:</b> ${karta.nummers.join(', ')}
              </p>
              <button class="delete-button" data-index="${index}">X</button>
            </div>
          </div>
        </div>`;
        karty.innerHTML += Orbital;
      });

      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        card.addEventListener('click', function() {
          sendDataToRoute(index);
        });
      });

      const deleteButtons = document.querySelectorAll('.delete-button');
      deleteButtons.forEach((button) => {
        button.addEventListener('click', function(event) {
          event.stopPropagation(); 
          const cardIndex = button.getAttribute('data-index');
          deleteCard(cardIndex);
        });
      });
    })
}

function sendDataToRoute(cardNumber) {
  fetch(`/nova?card=${cardNumber}`, {})
    .then(() => {
      window.location.href = '/model';
    });
}

function deleteCard(cardIndex) {
  fetch(`/delete?card=${cardIndex}`, {
    method: 'DELETE'
  })
    .then(() => {
      setTimeout(() => {
        location.reload();
      }, 100);
    })
}
fetchDataAndRenderCards();
