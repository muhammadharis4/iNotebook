const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')

// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
});


// Route 2: Add a new note using: POST "/api/notes/addnote". Login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, tag } = req.body
    try {
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, description, tag } = req.body

        // Find the note to be updated and update it
        const newNote = {
            title,
            description,
            tag,
        };
        const note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found")
        }

        // Allow updation only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Create a newNote object
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, newNote, { new: true })
        res.json(note)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    // Find the note to be deleted and delete it
    const note = await Notes.findById(req.params.id);

    try {
        if (!note) {
            return res.status(404).send("Not Found")
        }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Create a newNote object
        const deletedNote = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Status": "Success", deletedNote: deletedNote })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router