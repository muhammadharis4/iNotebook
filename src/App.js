import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/auth/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState();
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const authContext = useContext(AuthContext);
  const { auth, setAuth } = authContext;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth({
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user")),
      });
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              auth ? <Home showAlert={showAlert} /> : <Navigate to="/login" />
            }
          />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/login"
            element={
              !auth ? <Login showAlert={showAlert} /> : <Navigate to="/home" />
            }
          />
          <Route
            exact
            path="/signup"
            element={
              !auth ? <SignUp showAlert={showAlert} /> : <Navigate to="/home" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
