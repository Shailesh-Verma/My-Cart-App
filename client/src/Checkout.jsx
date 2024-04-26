import axios from "axios";
import React, { useState, useEffect } from "react";
import PlaceOrder from "./PlaceOrder";
import Edit from "./Edit";
import ProductList from "./ProductList";
import Navbar from "./Navbar";

const Checkout = ({ mobile }) => {
  const [allOrder, setAllOrder] = useState([]);
  const [openPlaceOrder, setPlaceOrder] = useState(false);
  const [isEditClicked, setEditClicked] = useState(false);
  const [editProductId, setEditProductId] = useState("");
  const [openProductList, setOpenProductList] = useState(false);
  const [showCheckout, setShowCheckout] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const total_amount = (product) => {
    return product.price * product.quantity;
  };

  const handlePlaceOrder = () => {
    setPlaceOrder(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/all_order");
      setAllOrder(response.data.orderList);
      console.log(response.data);
    } catch (err) {
      console.log(err, "Unable to fetch the data");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete_order/${id}`
      );
      console.log(response.data.message);
      alert("Delete successfully");
      fetchData();
    } catch (err) {
      console.log(err, "Unable to fetch data");
    }
  };

  const handleEdit = (id) => {
    console.log(id);
    setEditClicked(true);
    setEditProductId(id);
  };

  const handleProductList = () => {
    setOpenProductList(true);
    setEditClicked(false);
    setPlaceOrder(false);
    setShowCheckout(false); 
  };

  return (
    <div>
      {showCheckout && (
        <div>
          {isEditClicked ? (
            <Edit
              productId={editProductId}
              fetchData={fetchData}
              mobile={mobile}
            />
          ) : (
            <div>
              {openPlaceOrder ? (
                <PlaceOrder mobile={mobile} />
              ) : (
                <div>
                  <Navbar />
                  <button
                    className="btn-product-list"
                    onClick={handleProductList}
                  >
                    Product List
                  </button>
                  <h1 className="sub-heading">Checkout Your Order</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Product price</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th colSpan="3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrder.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <img src={order.img} alt={order.name} />
                          </td>
                          <td>{order.name}</td>
                          <td>{order.price}</td>
                          <td>{order.quantity}</td>
                          <td>{total_amount(order)}</td>
                          <td>
                            <button
                              className="btn-place-order"
                              onClick={handlePlaceOrder}
                            >
                              Place Order
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn-edit-order"
                              onClick={() => handleEdit(order._id)}
                            >
                              Edit order
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn-delete-order"
                              onClick={() => handleDelete(order._id)}
                            >
                              Delete Order
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {openProductList && <ProductList mobile={mobile} />}
    </div>
  );
};
export default Checkout;
