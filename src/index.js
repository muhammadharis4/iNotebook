import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthState from "./context/auth/AuthState";
import NoteState from "./context/notes/NoteState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthState>
      <NoteState>
        <App />
      </NoteState>
    </AuthState>
  </React.StrictMode>
);
