const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();



router.get('/notes', authMiddleware.authenticate, noteController.getAllNotes);
router.get('/notes/:id', authMiddleware.authenticate, noteController.getNoteById);
router.post('/notes', authMiddleware.authenticate, noteController.createNote);
router.put('/notes/:id', authMiddleware.authenticate, noteController.updateNote);
router.delete('/notes/:id', authMiddleware.authenticate, noteController.deleteNote);
router.post('/notes/:id/share', authMiddleware.authenticate, noteController.shareNote);


module.exports = router;
