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

notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    // Handle DELETE request to delete a specific note
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all notes except the one with the ID provided in the URL
            const result = json.filter((note) => note.note_id !== noteId);

            // Save that array to the filesystem
            readAndAppend(result, './db/notes.json');

            const response = {
                status: 'success',
                body: result,
            };

            res.json(response);
        });
});

module.exports = notes;