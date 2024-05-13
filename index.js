const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // Port, na kterém bude server naslouchat

// Nastavení middleware pro servírování statických souborů
app.use(express.static(path.join(__dirname, 'extra')));

// GET endpoint pro zaslání index.html při vstupu na "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'projekt', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
