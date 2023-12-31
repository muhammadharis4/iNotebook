import React, { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import AuthContext from "../auth/AuthContext";

const NoteState = (props) => {

  const [notes, setNotes] = useState([]);
  const { auth } = useContext(AuthContext);

  // Get all notes

  const getNotes = async () => {
    const response = await fetch(`/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth.token,
      },
    });
    response.json().then((data) => {
      setNotes(data);
    });
  };

  // Add a note

  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth.token,
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
    const response = await fetch(`/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth.token,
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
    const response = await fetch(`/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth.token,
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
