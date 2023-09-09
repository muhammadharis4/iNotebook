import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const submitNote = (e) => {
    e.preventDefault();
    if (!note.title || !note.description || !note.tag) {
      alert("Title or Description or Tag cannot be blank");
    }
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  return (
    <form onSubmit={submitNote}>
      <div className="mb-3">
        <label className="form-label" htmlFor="text">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          aria-describedby="title"
          value={note.title}
          onChange={onChange}
          minLength={3}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="desc">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="desc"
          name="description"
          value={note.description}
          onChange={onChange}
          minLength={5}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="tag">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          value={note.tag}
          onChange={onChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={note.title.length < 3 || note.description.length < 5}
      >
        Add Note
      </button>
    </form>
  );
};

export default AddNote;
