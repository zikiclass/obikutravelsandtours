"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import logo from "../../img/logo.png";
import Image from "next/image";
import Link from "next/link";
import { CheckBox } from "@mui/icons-material";
import SignUp from "./signup";
export default function Layout({ children }) {
  const [linkActive, setLinkActive] = useState("signin");
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link href="/">
          <Image
            src={logo}
            className={styles.logo}
            alt="Obiku Travels & Tours"
          />
        </Link>
        <h4>Welcome Back</h4>
        <p>Welcome Back, Please enter your details</p>
        <div className={styles.topLinks}>
          <div
            className={`${
              linkActive === "signin" ? styles.active : styles.link
            }`}
            onClick={() => setLinkActive("signin")}
          >
            Sign In
          </div>
          <div
            className={`${
              linkActive === "signup" ? styles.active : styles.link
            }`}
            onClick={() => setLinkActive("signup")}
          >
            Sign Up
          </div>
        </div>
        <div
          className={`${styles.form} ${
            linkActive === "signup" && styles.formHide
          }`}
        >
          {children}
        </div>
        <div
          className={`${styles.form} ${
            linkActive === "signin" && styles.formHide
          }`}
        >
          <SignUp />
        </div>
      </div>
      <div className={styles.img}></div>
    </div>
  );
}
