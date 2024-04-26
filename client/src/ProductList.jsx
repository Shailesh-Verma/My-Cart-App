import React, { useState } from "react";
import Checkout from "./Checkout";
import axios from "axios";
import Navbar from "./Navbar";

const ProductList = ({ mobile }) => {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [count, setCount] = useState(0);

  const increment = (product) => {
    setCount((product.quantity = product.quantity + 1));
  };

  const decrement = (product) => {
    setCount((product.quantity = product.quantity - 1));
  };

  const handleAdd = async (product) => {
    await axios
      .post("http://localhost:4000/api/add_product", product)
      .then((response) => {
        console.log(response.data);
        alert("Product added to cart successfully!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
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
          <h1 className="sub-heading">Product List</h1>
          <div className="product-list-container">
            {mobile.map((product) => (
              <div key={product.id}>
                <div className="product-info-container">
                  <div>
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div>Product Name: {product.name}</div>
                  <div>Price: Rs {product.price}/-</div>
                  <span>Quantity : </span>
                  <button
                    className="dec-sign"
                    onClick={() => decrement(product)}
                  >
                    -
                  </button>
                  <span className="display-quantity">{product.quantity}</span>
                  <button
                    className="inc-sign"
                    onClick={() => increment(product)}
                  >
                    +
                  </button>
                  <button
                    className="btn-addItem"
                    onClick={() => handleAdd(product)}
                  >
                    Add Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
