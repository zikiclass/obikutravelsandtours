"use client";
import { useState, useEffect } from "react";
import Header from "@/components/header/page";
import styles from "./styles.module.css";
import Footer from "@/components/footer/page";
import BottomFooter from "@/components/footer_bottom/page";
import Loader from "@/components/Loader";

export default function ContactUs() {
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
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <span>Contact Us</span>
            </div>
            <div className={styles.content}>
              <div className={styles.row}>
                <div className={styles.col}>
                  <h5>Location Address:</h5>
                  <p>
                    Plot 1, Maruwa Bus Stop, 128 Remi Olowude St, Lekki Phase 1
                    105102, Lagos, Lekki 100001, Lagos
                  </p>
                </div>
                <div className={styles.col}>
                  <h5>Email Address:</h5>
                  <p>support@obikutravelsandtours.com</p>
                </div>
                <div className={styles.col}>
                  <h5>Phone Number:</h5>
                  <p>+2349029920092992</p>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col}>
                  <h5>Address:</h5>
                  <p>
                    Plot 1, Maruwa Bus Stop, 128 Remi Olowude St, Lekki Phase 1
                    105102, Lagos, Lekki 100001, Lagos
                  </p>
                </div>
              </div>
            </div>
          </div>
          <BottomFooter />
          <Footer />
        </>
      )}
    </>
  );
}
