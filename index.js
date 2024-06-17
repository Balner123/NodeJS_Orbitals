const express = require('express'); // Import the Express module
const path = require('path'); // Import the Path module
const fs = require('fs'); // Import the File System module
const bodyParser = require('body-parser'); // Import the Body-Parser module

const app = express(); // Create an Express application
const port = 3000; // Set the port number for the server
let index = 0; // Initialize an index variable

// Serve static files from the 'extra' directory
app.use(express.static(path.join(__dirname, 'extra')));

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle POST requests to '/sendData'
app.post('/sendData', (req, res) => {
    const receivedData = req.body; // Get data from the request body
    console.log('Received data from client:', receivedData);

    // Read the data.json file
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return;
        }

        let dataArray = JSON.parse(data); // Parse the JSON data
        dataArray.push(receivedData); // Add the received data to the array

        // Sort the data array by timestamp in descending order
        dataArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Write the updated data back to the data.json file
        fs.writeFile('data.json', JSON.stringify(dataArray, null, 2), (err) => {
            if (err) {
                console.error('Error writing data to file:', err);
            } else {
                console.log('Data successfully saved to data.json');
            }
        });
    });
});

// Endpoint to handle GET requests to '/nova'
app.get('/nova', (req, res) => {
    const idd = req.query.card; // Get the 'card' query parameter
    index = idd; // Set the index variable to the received value
    console.log("Redirect => ", index);
    res.json(index); // Respond with the updated index
});

// Endpoint to handle GET requests to '/getDataP'
app.get('/getDataP', (req, res) => {
    // Read the data.json file
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error('Error reading data from file:', err);
            return;
        }
        const jsonData = JSON.parse(data); // Parse the JSON data
        const selectedObject = jsonData[index]; // Select the object at the current index
        console.log(index);
        res.json(selectedObject); // Respond with the selected object
    });
});

// Endpoint to handle GET requests to '/getData'
app.get('/getData', (req, res) => {
    // Read the data.json file
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return;
        }
        const jsonData = JSON.parse(data); // Parse the JSON data
        res.json(jsonData); // Respond with the entire data array
    });
});

// Endpoint to handle DELETE requests to '/delete'
app.delete('/delete', (req, res) => {
    const cardIndex = req.query.card; // Get the 'card' query parameter

    // Read the data.json file
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return;
        }

        let dataArray = JSON.parse(data); // Parse the JSON data
        dataArray.splice(cardIndex, 1); // Remove the object at the specified index

        // Write the updated data back to the data.json file
        fs.writeFile('data.json', JSON.stringify(dataArray, null, 2), (err) => {
            if (err) {
                console.error('Error writing data to file:', err);
            }
        });
    });
    res.sendFile(path.join(__dirname, 'extra', 'index.html')); // Respond with the index.html file
});

// Endpoint to handle GET requests to the root URL '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'extra', 'index.html')); // Respond with the index.html file
});

// Endpoint to handle GET requests to '/model'
app.get('/model', (req, res) => {
    res.sendFile(path.join(__dirname, 'extra', 'orbitals.html')); // Respond with the orbitals.html file
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

