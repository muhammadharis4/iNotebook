import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigateTo = useNavigate();

  const { auth, removeAuth } = useContext(AuthContext);

  const handleLogout = () => {
    removeAuth();
    navigateTo("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          {!auth.token ? (
            <Link className="btn btn-outline-primary mx-1" to="/login">
              Login
            </Link>
          ) : (
            <button
              className="btn btn-outline-primary mx-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          {!auth.token && (
            <Link className="btn btn-outline-primary mx-1" to="/signup">
              Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
