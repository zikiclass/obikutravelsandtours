"use client";
import { useState, useEffect } from "react";
import Header from "@/components/header/page";
import Menu from "@/components/menu/page";
import Search from "@/components/search/page";
import Loader from "@/components/Loader";
import BottomFooter from "@/components/footer_bottom/page";
import Footer from "@/components/footer/page";
import Lists from "@/components/lists/page";

export default function MainPage() {
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
            <Search />
            <Menu active="top" />
          </div>
          <Lists />
          <Footer />
          <BottomFooter />
        </>
      )}
    </>
  );
}
