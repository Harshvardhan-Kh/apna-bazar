import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.css";
import Navbar from "../../components/Navbar/Navbar";

const Signup = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");

  const signUp = async () => {
    if (!name) {
      return alert("Please enter your name");
    }
    if (!mobile) {
      return alert("Please enter your mobile");
    }
    if (!email) {
      return alert("Please enter your email");
    }
    if (!password) {
      return alert("Please enter your password");
    }
    if (!address) {
      return alert("Please enter your address");
    }

    const response = await axios.post("/signup", {
      name,
      mobile,
      email,
      password,
      address,
      gender,
    });

    if (response?.data?.sucsess) {
      alert(response?.data?.message);
      window.location.href = "/log-in";
    } else {
      return alert(response?.data?.message);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <h2 className="text-center signup-heading">Signup</h2>
        <form className="form-handle">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              className="input-targets"
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              className="input-targets"
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
          </div>

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

          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              className="input-targets"
              type="text"
              id="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="input-targets"
              type="radio"
              id="male"
              name="gender"
              value="male"
              onClick={(e) => {
                setGender(e.target.value);
              }}
            />
            <label htmlFor="male">Male</label>

            <input
              className="input-targets"
              type="radio"
              id="female"
              name="gender"
              value="female"
              onClick={(e) => {
                setGender(e.target.value);
              }}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div>
            <button type="button" class="btn btn-signup" onClick={signUp}>
              Sign Up
            </button>
            <Link to={"/log-in"} className="form-links">
              already have an account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
