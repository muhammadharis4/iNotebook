import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import Modal from "./Modal";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;

  const modalRef = useRef(null);
  const [modalNote, setModalNote] = useState({});

  const updateNodeModal = (note) => {
    setModalNote({
      _id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
    modalRef.current.click();
  };

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <Modal modalRef={modalRef} note={modalNote} setNote={setModalNote} />

      <h1>Notes</h1>

      {notes.length === 0 && <div>No notes to display</div>}

      {notes.length !== 0 && notes.map((note, index) => {
        return <NoteItem note={note} key={`note # ${index}`} updateNode={updateNodeModal}/>;
      })}
    </div>
  );
};

export default Notes;
