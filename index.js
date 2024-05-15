const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'extra')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sendData', (req, res) => {
    const receivedData = req.body;
    console.log('Received data from client:', receivedData);

    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            res.status(500).json({ error: 'An error occurred while reading data file' });
            return;
        }

        let dataArray = JSON.parse(data);
        dataArray.push(receivedData);

        fs.writeFile('data.json', JSON.stringify(dataArray, null, 2), (err) => {
            if (err) {
                console.error('Error writing data to file:', err);
                res.status(500).json({ error: 'An error occurred while saving data to file' });
            } else {
                console.log('Data successfully saved to data.json');
            }
        });
    });
});

app.get('/getData', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error('Error reading data from file:', err);
            return;
        }
        const jsonData = JSON.parse(data);
        const index = req.query.index;
        const selectedObject = jsonData[index];
        res.json(selectedObject);
    });
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'extra', 'index.html'));
});

app.get('/model', (req, res) => {
    res.sendFile(path.join(__dirname, 'extra', 'orbitals.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
