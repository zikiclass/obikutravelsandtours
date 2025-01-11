// components/lists/page.js
"use client";
import { useState, useEffect } from "react";
import { FaSadTear } from "react-icons/fa";
import Item from "../item/page";
import styles from "./styles.module.css";
import Loading from "./loading";
import { useRouter } from "next/navigation";

export default function Lists({ searchQuery }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const route = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // This should be a GET request by default
        const data = await response.json();

        // Filter products based on the searchQuery
        const filteredProducts = data.filter((product) =>
          product.productType.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]); // Re-fetch when searchQuery changes

  return (
    <>
      {loading ? (
        <Loading />
      ) : products.length > 0 ? (
        <div className={styles.container}>
          {products.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      ) : (
        // Display this message if no products were found
        <div className={styles.noRecords}>
          <center>
            <FaSadTear size={60} style={{ marginBottom: "1rem" }} />
          </center>
          <h3>
            No records found for <span>{searchQuery}</span>. <br />
            Please check back later.
          </h3>
          <button className={styles.load} onClick={() => route.push("/")}>
            Check others
          </button>
        </div>
      )}
    </>
  );
}
