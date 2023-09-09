import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({showAlert}) => {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");

  const navigateTo = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      }),
    });

    response.json().then((data) => {
      if (data.success === false) {
        showAlert(data.error, "danger");
      } else {
        localStorage.setItem("token", data.authToken);
        navigateTo("/");
        showAlert("Account created successfully", "success");
      }
    });
  };

  return (
    <div className="container">
      <h1 className="align-items-center">Login</h1>
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            ref={name}
            className="form-control"
            id="name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            ref={email}
            className="form-control"
            id="email"
            required
          />
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
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            ref={confirmPassword}
            className="form-control"
            id="cpassword"
            required
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
