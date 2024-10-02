const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json()); // To parse JSON requests

app.post('/saveUserData', (req, res) => {
    const userData = req.body;

    // Define the path to save the JSON file
    const filePath = path.join(__dirname, 'userData.json');

    // Write data to JSON file
    fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error saving data');
        }
        res.status(200).send('Data saved successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});