"use client";
import { useState, useEffect } from "react";
import Item from "../item/page";
import styles from "./styles.module.css";
import Loading from "./loading";
export default function Lists() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.container}>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </div>
          <button className={styles.load}>Load more</button>
        </>
      )}
    </>
  );
}
