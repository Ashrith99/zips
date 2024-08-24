import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddedItems } from "../context/AddedItemsContext";
import { useTableNum } from "../context/TableNumContext";
import { icons } from "../../assets/icons/icons";
import Footer from "../Footer/Footer";
import "./AddedItems.css";
import Header from "../Header/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddedItems = () => {
  const { addedItems, removeItem, updateItemCount, clearItems } = useAddedItems();
  const { tableNum } = useTableNum();
  const navigate = useNavigate();
  const isAddpage = true;

  const [option, setOption] = useState(false);
  const [orders, setOrders] = useState(() => {
    const savedOrders = sessionStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const handleMenuoption = () => {
    setOption(true);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleItemClick = (id) => {
    navigate(`/menu/${id}`);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateItemCount(id, quantity);
    }
  };

  const totalCost = addedItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    const count = parseInt(item.count, 10);

    console.log(`Item: ${item.name}, Price: ${price}, Count: ${count}`);

    if (!isNaN(price) && !isNaN(count)) {
      return acc + (price * count);
    } else {
      console.warn(`Invalid price or count for item: ${item.name}`);
      return acc;
    }
  }, 0);

  const sendOrder = async () => {
    if (addedItems.length === 0) {
      toast.error("No items to order. Please add items first.");
      return;
    }

    if (!tableNum) {
      console.warn('Table Number is not defined');
      return;
    }

    const tableNumberInt = parseInt(tableNum, 10);

    if (isNaN(tableNumberInt)) {
      console.warn('Invalid Table Number');
      return;
    }

    const dishes = addedItems.map(item => ({
      name: item.name,
      quantity: item.count,
      image: item.image, // Ensure this is included
      price: item.price   // Ensure this is included
    }));

    const orderData = {
      tableNumber: tableNumberInt,
      dishes,
    };

    console.log("Order data being sent:", orderData);

    try {
      const response = await fetch('http://localhost:5000/sendOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log('Order sent successfully');
        setOrders(prevOrders => [...addedItems, ...prevOrders]); // New orders on top
        clearItems();
      } else {
        console.error('Failed to send order');
      }
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  // Calculate total cost of orders
  const ordersTotalCost = orders.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    const count = parseInt(item.count, 10);

    if (!isNaN(price) && !isNaN(count)) {
      return acc + (price * count);
    } else {
      console.warn(`Invalid price or count for item: ${item.name}`);
      return acc;
    }
  }, 0);

  return (
    <>
      <div className="added-items-main">
        <Header isAddpage={isAddpage} />
        <ToastContainer />
        <div className="added-items">
          <h3 style={{ textAlign: "center" }}>
            Call the waiter to tell your order
          </h3>
          {addedItems.length === 0 ? (
            <p>No items added yet...</p>
          ) : (
            <ul>
              {addedItems.map((item, index) => (
                <li key={index}>
                  <div className="added-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="added-item-image"
                      onClick={() => handleItemClick(item.id)}
                    />
                    <div
                      className="added-item-info"
                      onClick={() => handleItemClick(item.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <h3 className="added-item-name">{item.name}</h3>
                      <p className="added-item-price">{item.price}</p>
                      <span>Quantity X{item.count}</span>
                    </div>
                    <button className="added-item-edit" onClick={() => handleItemClick(item.id)}><img src={icons.edit_icon} alt="" /></button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="delete-button"
                    >
                     <img src={icons.delete_icon} alt="" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="total-cost">
            <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
          </div>
          <button className="go-back" onClick={handleGoBack}>
            Go Back
          </button>
          <button className="send-order" onClick={sendOrder}>
            Send Order
          </button>
        </div>
        <div className="your-orders">
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders placed yet...</p>
          ) : (
            <>
              <ul>
                {orders.map((item, index) => (
                  <li key={index}>
                    <div className="order-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-item-image" // Add styling for image
                      />
                      <div className="order-item-info">
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.count}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="orders-total-cost">
                <h3>Total Amount: ${ordersTotalCost.toFixed(2)}</h3>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddedItems;
