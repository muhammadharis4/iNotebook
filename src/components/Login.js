import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const Login = ({showAlert}) => {
  const email = useRef("");
  const password = useRef("");
  const navigateTo = useNavigate();

  const { setAuth } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    });
    response.json().then((data) => {
      if (data.success === false) {
        showAlert(data.error, "danger");
      } else {
        setAuth({
          token: data.token,
          user: data.user,
        });
        navigateTo("/");
        showAlert("Logged in successfully", "success");
      }
    });
  };

  return (
    <div className="container">
      <h1 className="align-items-center">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" ref={email} className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            ref={password}
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
