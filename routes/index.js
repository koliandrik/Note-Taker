const router = require('express').Router();
const notesRouter = require('./notes');

// Use the notesRouter for the '/notes' route
router.use('/notes', notesRouter);

// Export the router module
module.exports = router;
