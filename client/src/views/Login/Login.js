import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    if (!email) {
      return alert("Please enter your email address");
    }

    if (!password) {
      return alert("Please enter your password");
    }

    const response = await axios.post("login", {
      email,
      password,
    });

    if (response?.data?.sucsess) {
      alert(response?.data?.message);
      window.location.href = "/";
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
    } else {
      return alert(response?.data?.message);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <h2 className="text-center signup-heading">Login</h2>
        <form className="form-handle">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              className="input-targets"
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              className="input-targets"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button type="button" class="btn btn-login" onClick={logIn}>
              Log-In
            </button>
            <Link to={"/sign-up"} className="form-links">
              don't have an account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
