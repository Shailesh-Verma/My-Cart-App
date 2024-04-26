import React from "react";
import { useState } from "react";
import axios from "axios";
import App from "./App";
import Navbar from "./Navbar";

const Login_form = ({ closeAll }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [OpenSignUp, setOpenSignUp] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        loginData
      );
      closeAll();
      alert(response.data.message);

      console.log("Successfully logged in");
    } catch (err) {
      console.log(err, "error in login");
      alert("Invalid credential");
    }
  };
  const handleSignup = () => {
    setOpenSignUp(true);
  };

  return (
    <div>
      {OpenSignUp ? (
        <App />
      ) : (
        <div>
          <Navbar />
          <button className="btn-signup-login-page" onClick={handleSignup}>
            Sign Up
          </button>
          <h1 className="sub-heading">Login portal</h1>
          <div className="form-container-login">
            <form onSubmit={handleSubmit}>
              <div className="form-element">
            <div className="input-container">
              <label>Email : </label>
              <input type="eamil" name="email" className="input-field" onChange={handleChange}></input>
              <br />
              <br />
              </div>
              <div className="input-container">
              <label>Password : </label>
              <input
                type="password"
                name="password"
                className="input-field"
                onChange={handleChange}
              ></input>
              <br />
              <br />
              </div>
              <button className="btn-login" type="submit">
                Login
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login_form;
