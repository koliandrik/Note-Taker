const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, deleteFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET request for all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    // Read the notes from the file and send them as a response
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST request to add a note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        // Create a new note object with a unique ID
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        // Append the new note to the file
        readAndAppend(newNote, './db/notes.json');
        res.json(`Note added successfully 🚀`);
    } else {
        // If the request body is missing title or text, send an error response
        res.status(400).json({ error: 'Request body must contain both title and text' });
    }
});

// DELETE request to delete a note
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    console.info(`${req.method} request received to delete note with id ${noteId}`);

    // Delete the note with the specified ID from the file
    deleteFromFile('./db/notes.json', noteId);
    res.json('Note deleted successfully');
});

module.exports = notes;
