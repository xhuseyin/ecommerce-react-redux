import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;  
`;

const Products = ({ brand, color, filters, sort }) => {  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {        
        const res = await axios.get(
          brand
            ? `https://serene-island-34856.herokuapp.com/api/products?category=${brand}` 
            : "https://serene-island-34856.herokuapp.com/api/products"         
         );
        setProducts(res.data);        
      } catch (err) {}
    };
    getProducts();
  }, [brand]);

  useEffect(() => {
    const getProducts = async () => {
      try {        
        const res = await axios.get(
          color
            ? `https://serene-island-34856.herokuapp.com/api/products?color=${color}` 
            : "https://serene-island-34856.herokuapp.com/api/products"         
         );
        setProducts(res.data);        
      } catch (err) {}
    };
    getProducts();
  }, [color]);

  useEffect(() => {
    //brand &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );

  }, [products, brand, filters]);

  useEffect(() => {    
    if (sort === "newest") {      
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    } else if (sort === "newestDesc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }   
    else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>      
      {(brand || color || sort)
        ? filteredProducts.map((item) => <Product item={item} key={item._id}/>)
        : products
            .slice(0, 12)
            .map((item) => <Product item={item} key={item._id}/>)} 
    </Container>
  );
};

export default Products;
