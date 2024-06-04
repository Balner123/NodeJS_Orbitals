// Get the element with the ID 'karty' where the cards will be rendered
const karty = document.getElementById('karty');
karty.innerHTML = ''; // Clear any existing content

// Function to fetch data and render cards
function fetchDataAndRenderCards() {
  // Fetch data from the server endpoint '/getData'
  fetch('/getData')
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      // Iterate over each item in the data array
      data.forEach((karta, index) => {
        // Create a card element for each item
        let Orbital = `
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-5">
          <div class="card h-300 w-300" data-bs-toggle="modal" data-country="${index + 1}">
            <div class="card-body">
              <h4 class="card-title">Cre: ${karta.name}</h4>
              <p>${karta.timestamp}<br>
              <b>Velocities:</b> ${karta.velocites.join(', ')}<br>
              <b>Orbits:</b> ${karta.orbits.join(', ')}<br>
              <b>Orbitals_per_layer:</b> ${karta.nummers.join(', ')}
              </p>
              <button class="delete-button" data-index="${index}">X</button>
            </div>
          </div>
        </div>`;
        // Append the created card to the 'karty' element
        karty.innerHTML += Orbital;
      });

      // Add click event listeners to all cards
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        card.addEventListener('click', function() {
          sendDataToRoute(index); // Function to handle card click
        });
      });

      // Add click event listeners to all delete buttons
      const deleteButtons = document.querySelectorAll('.delete-button');
      deleteButtons.forEach((button) => {
        button.addEventListener('click', function(event) {
          event.stopPropagation(); // Prevent card click event
          const cardIndex = button.getAttribute('data-index');
          deleteCard(cardIndex); // Function to handle card deletion
        });
      });
    })
}

// Function to send data to the specified route
function sendDataToRoute(cardNumber) {
  fetch(`/nova?card=${cardNumber}`, {})
    .then(() => {
      window.location.href = '/model'; // Redirect to the '/model' page
    });
}

// Function to delete a card
function deleteCard(cardIndex) {
  const confirmed = confirm("Ready to Delete?"); // Confirm deletion
  if (confirmed) {
    const password = prompt("Please enter the password:"); // Prompt for password
    if (password === "admin123") { // HELLO HERE ! 
      fetch(`/delete?card=${cardIndex}`, {
        method: 'DELETE' // Send a DELETE request to the server
      })
        .then(() => {
          setTimeout(() => {
            location.reload(); // Reload the page after deletion
          }, 50);
        })
        .catch((error) => {
          console.error('Error deleting card:', error); // Log any errors
        });
    } else {
      alert("Incorrect password."); // Alert if the password is incorrect
    }
  }
}

// Fetch data and render cards on page load
fetchDataAndRenderCards();
