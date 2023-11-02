import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({id, name, description, brand, price, image }) => {
  return (
    <>
      <div className="product-card">
        <img className="product-image" src={image} />
        <p className="product-name">{name}</p>
        <p className="product-desc">{description}</p>
        <p>Brand :- {brand}</p>
        <p className="product-price">₹ {price}</p>
        <Link to={`/buy/${id}`} className="btn buyn-btn">Buy Now</Link>
      </div>
    </>
  );
};

export default ProductCard;
