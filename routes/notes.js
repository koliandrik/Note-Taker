const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// Define routes for notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    // Handle GET request for all notes
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to submit a note`);
    // Handle POST request to create a new note
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/notes.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        
        res.json(response);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notes;