const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Nastavení middleware pro servírování statických souborů
app.use(express.static(path.join(__dirname, 'extra')));
// Middleware pro zpracování JSON
app.use(express.json());

// POST endpoint pro zpracování dat z klienta a jejich uložení do souboru
app.post('/sendData', (req, res) => {
    const receivedData = req.body;
    console.log('Received data from client:', receivedData);

    // Uložení přijatých dat do souboru data.json
    fs.writeFile('data.json', JSON.stringify(receivedData), (err) => {
        if (err) {
            console.error('Error writing data to file:', err);
            res.status(500).json({ error: 'An error occurred while saving data to file' });
        } else {
            console.log('Data successfully saved to data.json');
            res.json({ status: 'Data received and saved successfully' });
        }
    });
});


// GET endpoint pro zaslání index.html při vstupu na "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'extra', 'index.html'));
});

app.get('/model', (req, res) => {
    res.sendFile(path.join(__dirname, 'extra', 'orbitals.html'));
});


app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
