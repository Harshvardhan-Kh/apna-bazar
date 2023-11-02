import React, { useEffect, useState } from "react";
import "./BuyPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./../../components/Navbar/Navbar";

const BuyPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({}) || {};
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [shippingcharge, setShippingcharge] = useState();

  const loadProduct = async () => {
    const response = await axios.get(`/product/${id}`);
    setProduct(response?.data?.data);
  };

  const loaduser = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    loadProduct();
    loaduser();
  }, []);

  return (
    <div className="buy-product-main-container">
      <Navbar />
      <div className="buy-product-container">
        <div className="buy-producut-img-cnt">
          <img className="buy-producut-img" src={product.image} />
        </div>
        <div className="buy-product-info-cnt">
          <div className="buy-producut-price-cnt">
            <span>₹ {product.price}/-</span>
          </div>
          <div className="buy-product-info">
            <p>{product.name}</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="buy-product-place-cnt">
          <p>Product name :- {product.name}</p>
          <p>Buyer's name :- {user.name}</p>
          <p>Buyer's email :- {user.email}</p>
          <p>Buyer's mobile :- {user.mobile}</p>
          Your shipping address :-{" "}
          <input
            type="text"
            className="address-input"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <p>
            <span onClick={() => {
                if(quantity==1){
                    return;
                }
                setQuantity(quantity-1)
            }} className="counter-btn">
              -
            </span>
            <span>{quantity}</span>
            <span onClick={() => {
                setQuantity(quantity+1)
            }} className="counter-btn">
              +
            </span>
          </p>
          <span>₹ {product.price*quantity}/-</span>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
