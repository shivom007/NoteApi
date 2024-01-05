const noteService = require('../services/noteService');

const getAllNotes = async (req, res) => {
  const userId = req.user._id;

  try {
    const result = await noteService.getAllNotes(userId);
    if (result.success) {
      res.status(200).json({ success: true, notes: result.notes });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getNoteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const result = await noteService.getNoteById(id, userId);
    if (result.success) {
      res.status(200).json({ success: true, note: result.note });
    } else {
      res.status(404).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user._id;

  try {
    const result = await noteService.createNote(title, content, userId);
    if (result.success) {
      res.status(201).json({ success: true, message: result.message, Id: result.noteId });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user._id;

  try {
    const result = await noteService.updateNote(id, title, content, userId);
    if (result.success) {
      res.status(200).json({ success: true, message: result.message });
    } else {
      res.status(404).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const result = await noteService.deleteNote(id, userId);
    if (result.success) {
      res.status(200).json({ success: true, message: result.message });
    } else {
      res.status(404).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const shareNote = async (req, res) => {
  const { id } = req.params;
  const { targetUserId } = req.body;
  const userId = req.user._id;

  try {
    const result = await noteService.shareNote(id, targetUserId, userId);
    if (result.success) {
      res.status(200).json({ success: true, message: result.message });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const searchNotes = async (req, res) => {
    const { q } = req.query;
    const userId = req.user._id;
  
    try {
      const result = await noteService.searchNotes(q, userId);
      if (result.success) {
        res.status(200).json({ success: true, notes: result.notes });
      } else {
        res.status(400).json({ success: false, message: result.message });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote, shareNote, searchNotes };
