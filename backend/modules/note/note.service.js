const { validationResult } = require('express-validator');
const Notes = require('./note.model');

// Fetch all notes
const fetchAllNotes = async (userId) => {
  const notes = await Notes.find({ user: userId });
  return notes;
};

module.exports = {
    fetchAllNotes,
};
