const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', authMiddleware.authenticate, noteController.searchNotes);

module.exports = router;
