import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Checkout from "./Checkout";
import Navbar from "./Navbar";

const Edit = ({ productId, fetchData, mobile }) => {
  const [data, setData] = useState({
    img: "",
    name: "",
    price: 0,
    quantity: 0,
  });
  const [openCheckout, setOpenCheckout] = useState(false);
  const [count, setCount] = useState(0);

  const getProduct = async () => {
    const response = await axios.get(
      `http://localhost:4000/api/get_product/${productId}`
    );
    console.log(response.data);
    setData(response.data.response);
  };
  useEffect(() => {
    getProduct();
  }, []);
  const updateProduct = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/update_product/${productId}`,
        data
      );
      console.log(response.data);
      alert("Product Updated Successfully");
      fetchData();
    } catch (err) {
      console.log(err, "Error in updating the product");
    }
  };
  const increment = (product) => {
    console.log(product);
    setCount((product.quantity = product.quantity + 1));
  };
  const decrement = (product) => {
    console.log(product);
    setCount((product.quantity = product.quantity - 1));
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
          <Navbar/>
          <button className="btn-checkout-edit" onClick={handleCheckout}>Checkout</button>
          <h1 className="sub-heading">Edit Your Order</h1>
          <div className="item-container">
          <div>
            <img src={data.img} alt={data.name} />
          </div>
          <div>Product Name : {data.name}</div>
          <div>Price : Rs {data.price}/-</div>
          <span>Quantity : </span>
          <button className="dec-sign" onClick={() => decrement(data)}>-</button>
          <span className="display-quantity">{data.quantity}</span>
          <button className="inc-sign" onClick={() => increment(data)}>+</button>
          <br />
          <br />
          <button  className="btn-update-edit" onClick={() => updateProduct(data)}>Update Item</button>
        </div>
        </div>
      )}
    </div>
  );
};
export default Edit;
