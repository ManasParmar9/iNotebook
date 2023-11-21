import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar(props) {
  let location = useLocation();

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleOnClick = (e) => {
    if(!localStorage.getItem("token")){
        e.preventDefault();
        props.showAlert("Please Log In First", "danger");
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
           {localStorage.getItem("token") && <>
           <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
              <Link className="nav-link" to="/home" onClick={handleOnClick}>
                Home
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>
              <Link className="nav-link" to="/about" onClick={handleOnClick}>
                About
              </Link>
            </li>
           </>}
          </ul>
         {!localStorage.getItem("token") ? <form className="d-flex">
          <Link className="btn btn-primary mx-1" to="/" type="button">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup" type="button">Sign Up</Link>
          </form> : <button className="btn btn-primary mx-1" type="button" onClick={handleLogout}>Logout</button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
