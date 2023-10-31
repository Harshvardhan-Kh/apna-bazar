import "./Navbar.css";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const storedUser = JSON.parse(localStorage.getItem("user" || {}));
  const userLogein = () => {
    if (storedUser) {
      alert("User already logged in");
      window.location.href = "/";
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
  };
  return (
    <>
      <div className="navbar-container">
        <div>
          <a href="/" className="navbar-head">
            Welcome to Apna-Bazar
          </a>
        </div>

        <div>
          <Link onClick={userLogein} className="menu-links" to={"/log-in"}>
            Login
          </Link>
          <Link onClick={userLogein} className="menu-links" to={"/sign-up"}>
            Sign-Up
          </Link>
          {storedUser ? (
            <Link className="menu-links" to={"/my-orders"}>
              My Orders
            </Link>
          ) : null}
        </div>

        <div className="user-container">
          <span>hello</span>
          {storedUser ? storedUser.name + ("!") : <span>guest!</span>}

          </div>
          {storedUser ? (
            <a className="btn logout-btn" onClick={logoutUser} href="/log-in">
              Logout
            </a>
          ) : null}
      </div>
    </>
  );
};

export default Navbar;
