const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to save form data to a JSON file
app.post('/save_form_data', (req, res) => {
    const formData = req.body;

    // Path to the JSON file
    const filePath = path.join(__dirname, 'data.json');

    // Write data to the JSON file
    fs.writeFile(filePath, JSON.stringify(formData, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send({ message: 'Failed to save data.' });
            return;
        }
        res.status(200).send({ message: 'Data saved successfully.' });
    });
});

// Serve the static frontend files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
