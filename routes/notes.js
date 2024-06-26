const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, deleteFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// Define routes for notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    // Handle GET request for all notes
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
}
);

notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    console.info(`${req.method} request received to delete note with id ${noteId}`);

    deleteFromFile('./db/notes.json', noteId);
    res.json('Note deleted successfully');
});


module.exports = notes;