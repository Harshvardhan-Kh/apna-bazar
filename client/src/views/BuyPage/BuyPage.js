import React, { useEffect, useState } from "react";
import "./BuyPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./../../components/Navbar/Navbar";

const BuyPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({}) || {};
  const [address, setAddress] = useState("");
  const [shippingcharge, setShippingcharge] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("pending");
  const [totalprice, setTotalPrice] = useState();
  const loadProduct = async () => {
    const response = await axios.get(`/product/${id}`);
    setProduct(response?.data?.data);
  };

  const loaduser = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const placeorder = async () => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    const user = userdata._id;
    const product = id;

    const response = await axios.post("/order", {
      user,
      product,
      address,
      shippingcharge,
      status,
      quantity,
    });

    if (!response?.data?.success) {
      alert("please enter all input fields");
      return;
    }
    alert(response?.data?.message);
    window.location.href = "/my-orders";
  };

  useEffect(() => {
    loadProduct();
    loaduser();
  }, []);

  const totlprice = parseInt(product?.price * quantity + shippingcharge);
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
          Buyer's shipping address :-{" "}
          <input
            type="text"
            className="address-input"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <p className="text-center">
            <span
              onClick={() => {
                if (quantity == 1) {
                  return;
                }
                setQuantity(quantity - 1);
              }}
              className="counter-btn"
            >
              -
            </span>
            <span>{quantity}</span>
            <span
              onClick={() => {
                setQuantity(quantity + 1);
              }}
              className="counter-btn"
            >
              +
            </span>
          </p>
          <p className="text-center txt-clr">
            ₹ {product?.price * quantity + shippingcharge}/-
          </p>
          <p className="text-center">
            <div className="shipping-container">
              <input
                className="delivery-input"
                name="order"
                type="radio"
                value="500"
                onClick={(e) => {
                  setShippingcharge(parseInt(e.target.value));
                }}
              />
              faster order delivery
            </div>
            <div className="shipping-container">
              <input
                className="delivery-input"
                name="order"
                type="radio"
                value="0"
                onClick={(e) => {
                  setShippingcharge(parseInt(e.target.value));
                }}
              />
              free order delivery
            </div>
          </p>
          <p className="text-center">
            shipping charges :- <span>{shippingcharge}</span>
          </p>
          <p className="text-center">total Amount :- ₹ {totlprice}/-</p>
          <p className="btn place-order-btn" onClick={placeorder}>
            Place Order
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
