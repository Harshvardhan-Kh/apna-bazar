import React from "react";
import "./OrderCard.css";

const OrderCard = ({
  _id,
  product,
  user,
  status,
  address,
  quantity,
  shippingcharge,
}) => {
  const calculateprice = product.price * quantity;

  const ORDER_STUTAS_MAP = {
    "pending": "status-pending",
    "shipped": "status-shipped",
    "delivered": "status-delivered",
    "returned": "status-returned",
    "cancelled": "status-cancelled",
    "rejected": "status-rejected",
  }
  const showStatus = ORDER_STUTAS_MAP[status];

  return (
    <div>
      <div className="order-container">
        <p className="text-center">{product.name}</p>
        <img className="product-img" src={product.image} alt={product.name} />
        <p className="text-center">{product.price}</p> 
        <p>{quantity}'Qty</p>
        <p>{user.email}</p>
        <p>
          {user.name}'s shipping address :- {address}
        </p>
        <span className={`status-box ${showStatus}`}> {status}</span>
        <p>Total payable amount :- {calculateprice}</p>
        <p>shipping charges :- {shippingcharge}</p>
        <p onClick={()=>{window.location.href=`/cancel/order/${_id}`}} className="btn cancel-btn">Cancel Order</p>
      </div>
    </div>
  );
};

export default OrderCard;
