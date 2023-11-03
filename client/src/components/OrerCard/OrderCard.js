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
        <p>Order Status :- {status}</p>
        <p>Total payable amount :- {calculateprice}</p>
        <p>shipping charges :- {shippingcharge}</p>
        <p onClick={()=>{window.location.href=`/cancel/order/${_id}`}} className="btn cancel-btn">Cancel Order</p>
      </div>
    </div>
  );
};

export default OrderCard;
