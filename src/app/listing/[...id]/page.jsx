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
export default function ListingView() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
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
            <Nav />
            <ImagesDisplay />
            <div className={styles.contents}>
              <AboutListing />
              <AddtoCart />
            </div>
          </div>
          <BottomFooter />
          <Footer />
        </>
      )}
    </>
  );
}
