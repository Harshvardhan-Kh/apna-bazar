import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

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
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button type="button" class="btn btn-signup" onClick={logIn}>
            Log-In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
