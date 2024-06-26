const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, deleteFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET request for all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST request to add a note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.status(400).json({ error: 'Request body must contain both title and text' });
    }
});

// DELETE request to delete a note
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    console.info(`${req.method} request received to delete note with id ${noteId}`);

    deleteFromFile('./db/notes.json', noteId);
    res.json('Note deleted successfully');
});

module.exports = notes;