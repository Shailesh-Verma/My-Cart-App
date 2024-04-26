import axios from "axios";
import React, { useState } from "react";
import Checkout from "./Checkout";
import Navbar from "./Navbar";

const PlaceOrder = ({ mobile }) => {
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });
  const [openCheckout, setOpenCheckout] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/place_order",
        details
      );
      console.log(response.data);
      alert("Order placed successfully");
      setDetails({
        name: "",
        phone: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
      });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const handleCheckout = () => {
    setOpenCheckout(true);
  };
  return (
    <div>
      {openCheckout ? (
        <Checkout mobile={mobile} />
      ) : (
        <div>
          <Navbar />
          <button className="btn-checkout" onClick={handleCheckout}>
            Checkout
          </button>
          <h1 className="place-heading">Place Your Order here</h1>
          <h3 className="sub-heading">Enter Your Details</h3>
          <div className="place-form">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label>Name : </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input-field"
                  onChange={handleChange}
                ></input>
                <br />
                <br />
              </div>
              <div className="input-container">
                <label> Phone : </label>
                <input
                  type="number"
                  name="phone"
                  required
                  className="input-field"
                  onChange={handleChange}
                ></input>
                <br />
                <br />
              </div>
              <div className="input-container">
                <label>Address : </label>
                <input
                  type="text"
                  name="address"
                  required
                  className="input-field"
                  onChange={handleChange}
                ></input>
                <br />
                <br />
              </div>
              <div className="input-container">
                <label>Pincode : </label>
                <input
                  type="number"
                  name="pincode"
                  required
                  className="input-field"
                  onChange={handleChange}
                ></input>
                <br />
                <br />
              </div>
              <div className="input-container">
                <label>City : </label>
                <input
                  type="text"
                  name="city"
                  required
                  className="input-field"
                  onChange={handleChange}
                ></input>
                <br />
                <br />
              </div>
              <div className="input-container">
                <label>State : </label>
                <input
                  type="text"
                  name="state"
                  required
                  className="input-field"
                  onChange={handleChange}
                ></input>
                <br />
                <br />
              </div>
              <div className="input-container">
                <label>Country : </label>
                <input
                  type="text"
                  name="country"
                  required
                  className="input-field"
                  onChange={handleChange}
                ></input>
                <br />
                <br />
              </div>
              <button className="btn-submit" type="submit">
                submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
