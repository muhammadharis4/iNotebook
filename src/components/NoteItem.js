import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

const NoteItem = ({ note, updateNode }) => {
  const { deleteNote } = useContext(NoteContext);

  return (
    <div>
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <button
                className="btn btn-sm btn-outline-secondary border-0 mx-1"
                onClick={() => updateNode(note)}
              >
                <RiEditLine />
              </button>
              <button
                className="btn btn-sm btn-outline-danger border-0 mx-1"
                onClick={() => deleteNote(note._id)}
              >
                <RiDeleteBin6Line />
              </button>
              <span className="badge rounded-pill text-bg-info text-light">
                {note.tag}
              </span>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>

        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
