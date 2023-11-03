import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import OrderCard from "../../components/OrerCard/OrderCard";
import "./Orders.css";
import axios from "axios";

const Orders = () => {
  const [userorders, setUserorders] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const id = userdata?._id;
  const loadUserOrders = async () => {
    const response = await axios.get(`/order/user/${id}`);
    setUserorders(response?.data?.data);
  };
  useEffect(() => {
    loadUserOrders();
  }, []);
  console.log(userorders);
  return (
    <div>
      <Navbar />
      <div className="reverse-order">
        {userorders.map((order, index) => {
          const {
            _id,
            product,
            user,
            status,
            address,
            quantity,
            shippingcharge,
          } = order;
          return (
            <>
              <OrderCard
                key={index}
                _id={_id}
                address={address}
                product={product}
                user={user}
                status={status}
                quantity={quantity}
                shippingcharge={shippingcharge}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
