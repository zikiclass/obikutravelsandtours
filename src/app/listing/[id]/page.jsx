"use client";
import styles from "./styles.module.css";
import Footer from "@/components/footer/page";
import BottomFooter from "@/components/footer_bottom/page";
import Header from "@/components/header/page";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import Nav from "./nav";
import ImagesDisplay from "./images";
import AboutListing from "./about";
import AddtoCart from "./addtocart";
import axios from "axios";
export default function ListingView({ params }) {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (!id) {
      console.log("No ID found");
      return; // Avoid fetching until the id is available
    }

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/unique/?id=${id}`);
        setProduct(response.data);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        return () => clearTimeout(timer);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              position: "fixed",
              width: "100%",
              backgroundColor: "white",
              top: "0px",
              zIndex: "10000",
            }}
          >
            <Header />
          </div>
          <div className={styles.container}>
            <Nav product={product} />
            <ImagesDisplay product={product} />
            <div className={styles.contents}>
              <AboutListing product={product} />
              <AddtoCart product={product} />
            </div>
          </div>
          <BottomFooter />
          <Footer />
        </>
      )}
    </>
  );
}
