const express = require("express");
const router = express.Router();
const notesController = require("./note.controller");
const fetchuser = require("../../middleware/fetchuser");

// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, notesController.getAllNotes);

// Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post("/addnote", fetchuser, notesController.addNote);

// Route 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, notesController.updateNote);

// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, notesController.deleteNote);

module.exports = router;
