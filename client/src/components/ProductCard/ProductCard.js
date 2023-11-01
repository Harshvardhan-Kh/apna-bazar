import React from "react";
import "./ProductCard.css";

const ProductCard = ({ name, description, brand, price, image }) => {
  return (
    <>
      <div className="product-card">
        <img className="product-image" src={image} />
        <p className="product-name">{name}</p>
        <p className="product-desc">{description}</p>
        <p>Brand :- {brand}</p>
        <p className="product-price">₹ {price}</p>
        <button type="button" className="btn buyn-btn">Buy Now</button>
      </div>
    </>
  );
};

export default ProductCard;
