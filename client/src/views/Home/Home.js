import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import ProductCard from "./../../components/ProductCard/ProductCard";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState();

  try {
    const loadSearchProducts = async () => {
      const response = await axios.get(`/products/search?q=${search}`);
      setProducts(response?.data?.data);
    };
    useEffect(() => {
      loadSearchProducts();
    }, [search]);
  } catch (e) {
    console.log(e.message);
  }

  try {
    const loadProducts = async () => {
      const response = await axios.get("/products");
      setProducts(response?.data?.data);
    };

    useEffect(() => {
      loadProducts();
    }, []);
  } catch (e) {
    alert("Error loading products");
    console.log(e);
  }
  return (
    <>
      <Navbar />
      <input
      className="input-search"
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="products-container">
        {products.map((products, index) => {
          const { _id, name, description, brand, price, image } = products;
          return (
            <ProductCard
              key={index}
              name={name}
              description={description}
              brand={brand}
              price={price}
              image={image}
              id={_id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
