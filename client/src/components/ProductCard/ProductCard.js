import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ id, name, description, brand, price, image }) => {
  const [user, setUser] = useState({});

  const loadUser = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(`Loading ${user}`);
  };
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <div className="product-card">
        <img className="product-image" src={image} />
        <p className="product-name">{name}</p>
        <p className="product-desc">{description}</p>
        <p>Brand :- {brand}</p>
        <p className="product-price">₹ {price}</p>
        {user ? (
          <Link to={`/buy/${id}`} className="btn buyn-btn">
            Buy Now 
          </Link>
        ) : (
          <Link to={`/log-in`} className="btn buyn-btn">
            Login to Buy
          </Link>
        )}
      </div>
    </>
  );
};

export default ProductCard;
