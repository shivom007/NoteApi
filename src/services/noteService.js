const Note = require('../models/Note');
const User = require('../models/User');

const getAllNotes = async (userId) => {
  try {
    const notes = await Note.find({ user: userId })
    return { success: true, notes };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getNoteById = async (noteId, userId) => {
  try {
    const note = await Note.findOne({ _id: noteId, user: userId })
    if (!note) {
      return { success: false, message: 'Note not found.' };
    }
    return { success: true, note };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const createNote = async (title, content, userId) => {
  try {
    const newNote = new Note({ title, content, user: userId });
    await newNote.save();
    return { success: true, message: 'Note created successfully.', noteId: newNote._id };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const updateNote = async (noteId, title, content, userId) => {
  try {
    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return { success: false, message: 'Note not found.' };
    }

    note.title = title !== undefined ? title : note.title;
    note.content = content !== undefined ? content : note.content;

    await note.save();

    return { success: true, message: 'Note updated successfully.' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const deleteNote = async (noteId, userId) => {
  try {
    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return { success: false, message: 'Note not found.' };
    }

    await note.deleteOne();

    return { success: true, message: 'Note deleted successfully.' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const shareNote = async (noteId, SharingUserId, userId) => {
  try {
    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return { success: false, message: 'Note not found.' };
    }

    const sharingUser = await User.findOne({_id: SharingUserId});
    
    if (!sharingUser) {
      return { success: false, message: 'Target user not found.' };
    }

    if (note.sharedWith.includes(SharingUserId)) {
      return { success: false, message: 'Note already shared with the target user.' };
    }

    note.sharedWith.push(SharingUserId); 
    await note.save();

    return { success: true, message: 'Note shared successfully.' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const searchNotes = async (query, userId) => {
  try {
    const notes = await Note.find({ $text: { $search: query }, user: userId })
    return { success: true, notes };
  } catch (error) {
    return { success: false, message: error.message };
  }
};



module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote, shareNote, searchNotes };
