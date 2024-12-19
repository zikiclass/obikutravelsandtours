"use client";
import { useState, useEffect } from "react";
import Header from "@/components/header/page";
import styles from "../terms-of-service/styles.module.css";
import Footer from "@/components/footer/page";
import BottomFooter from "@/components/footer_bottom/page";
import Link from "next/link";
import Loader from "@/components/Loader";
export default function HelpCenter() {
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
          <div className={styles.header}>
            <span>Help Center</span>
          </div>
          <div className={styles.content_}>
            <div className={styles.wrapper}>
              <h4>How to delete your Obiku Travels & Tours Account</h4>
              <p>
                This document provides a step-by-step guide on how to delete
                your account on the Obiku Travels & Tours platform. There are
                separate instructions for web and mobile app users.
              </p>
            </div>
          </div>
          <BottomFooter />
          <Footer />
        </>
      )}
    </>
  );
}
