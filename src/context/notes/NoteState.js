import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  // Get all notes

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYWUyNDU1ZDJjNTkyNjE5OWI0MmZiIn0sImlhdCI6MTY4ODkyMDY0NX0.b3SRomlhBL6VYPlrFuskF-tQwhGFTkAEF3QUs6R7s2I",
      },
    });
    response.json().then((data) => {
      setNotes(data);
    });
  };

  // Add a note

  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYWUyNDU1ZDJjNTkyNjE5OWI0MmZiIn0sImlhdCI6MTY4ODkyMDY0NX0.b3SRomlhBL6VYPlrFuskF-tQwhGFTkAEF3QUs6R7s2I",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    response.json().then((data) => {
      setNotes(notes.concat(data));
    });
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYWUyNDU1ZDJjNTkyNjE5OWI0MmZiIn0sImlhdCI6MTY4ODkyMDY0NX0.b3SRomlhBL6VYPlrFuskF-tQwhGFTkAEF3QUs6R7s2I",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Logic to edit in client
    response.json().then((data) => {
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    });
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYWUyNDU1ZDJjNTkyNjE5OWI0MmZiIn0sImlhdCI6MTY4ODkyMDY0NX0.b3SRomlhBL6VYPlrFuskF-tQwhGFTkAEF3QUs6R7s2I",
      },
    });

    response.json().then((data) => {
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    });
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
