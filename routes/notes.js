const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// Define routes for notes
notes.get('/', (req, res) => {
    // Handle GET request for all notes
});

notes.get('/:id', (req, res) => {
    // Handle GET request for a specific note
});

notes.post('/', (req, res) => {
    // Handle POST request to create a new note
});

notes.put('/:id', (req, res) => {
    // Handle PUT request to update a specific note
});

notes.delete('/:id', (req, res) => {
    // Handle DELETE request to delete a specific note
});

module.exports = notes;