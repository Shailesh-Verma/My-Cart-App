import React, { useState } from "react";
import Login_form from "./Login_form.jsx";
import ProductList from "./ProductList.jsx";
import axios from "axios";
import { mobile } from "./allProduct";
import Navbar from "./Navbar.jsx";

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [openProductList, setOpenProductList] = useState(false);
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleLogin = () => {
    setLoginOpen(true);
    setOpenProductList(false);
  };
  const closeAll = () => {
    setLoginOpen(false);
    setOpenProductList(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/sign_up",
        signUpData
      );
      alert(response.data.message);
      console.log("Signed Up successfully");
      setSignUpData({ username: "", email: " ", password: "" });
    } catch (err) {
      console.error(err, "error in signing up");
      alert("User is already present!");
    }
  };
  return (
    <div>
      {!loginOpen && !openProductList && (
        <div>
          <Navbar />
          <h3 className="sub-heading">SignUp Portal Form</h3>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-element">
              <div className="input-container">
             <label>Username : </label> 
              <input
                type="text"
                name="username"
                className="input-field"
                onChange={handleChange}
              ></input>
              <br />
              <br />
              </div>
              <div className="input-container">
              <label>Email : </label>
              <input type="email" name="email" className="input-field" onChange={handleChange}></input>
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
              <button className="btn-signup" type="submit">
                SignUp
              </button>
              <p className="login">
                Hava already an account ?{" "}
                <button className="btn-login" onClick={handleLogin}>
                  Login
                </button>
              </p>
              </div>
            </form>
          </div>
        </div>
      )}
      {loginOpen && <Login_form closeAll={closeAll} />}
      {openProductList && <ProductList mobile={mobile} />}
    </div>
  );
};
export default App;
