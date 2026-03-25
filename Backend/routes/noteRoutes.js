const express = require('express');
const router = express.Router();

const {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/auth');
const { validateNote, validateNoteUpdate } = require('../middleware/validate');

// All routes below are protected
router.use(protect);

router
    .route('/')
    .get(getNotes)
    .post(validateNote, createNote);

router
    .route('/:id')
    .get(getNote)
    .put(validateNoteUpdate, updateNote)
    .delete(deleteNote);

module.exports = router;
