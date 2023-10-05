const { validationResult } = require("express-validator");
const notesServices = require("./note.service");
const Note = require("./note.model");

// Fetch all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await notesServices.fetchAllNotes(req.user.id);
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

// Add a new note
const addNote = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, tag } = req.body;
  try {
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

// Update an existing note
const updateNote = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    // Find the note to be updated and update it
    const newNote = {
      title,
      description,
      tag,
    };
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow updation only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Create a newNote object
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, newNote, {
      new: true,
    });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

// Delete an existing note
const deleteNote = async (req, res) => {
  // Find the note to be deleted and delete it
  const note = await Notes.findById(req.params.id);

  try {
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Create a newNote object
    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Status: "Success", deletedNote: deletedNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllNotes,
  addNote,
  updateNote,
  deleteNote,
};
