const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use('/api', api); // Use the API routes defined in './routes/index.js'

// Routes
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html')) // Serve the 'index.html' file
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html')) // Serve the 'notes.html' file
);

// Start the server
app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`) // Log a message when the server starts
);
