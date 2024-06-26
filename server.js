const express = require('express');
const pad = require('path');
const fs = require('fs');
const api = require('./routes/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

// Routes
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Start the server
app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`)
);