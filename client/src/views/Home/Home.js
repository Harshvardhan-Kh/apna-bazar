import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import ProductCard from "./../../components/ProductCard/ProductCard";
import "./Home.css";

const Home = () => {

  const [products, setProducts] = useState([]);

  try {
    const loadProducts = async () => {
      const response = await axios.get('/products')
      setProducts(response?.data?.data);
    };

    useEffect(()=>{
      loadProducts();
    },[])
  } catch (e) {
    alert("Error loading products");
    console.log(e);
  }
  return (
    <>
      <Navbar />
      <div className="products-container">
        {
        products.map((products, index) => {
          const { name, description, brand, price, image } = products;
          return (
            <ProductCard
              key={index}
              name={name}
              description={description}
              brand={brand}
              price={price}
              image={image}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
