"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import logo from "../../img/logo.png";
import Image from "next/image";
import Link from "next/link";
import { CheckBox } from "@mui/icons-material";
export default function SignIn() {
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
          <label>Email / Phone</label>
          <input
            type="text"
            name="email_phone"
            placeholder="travelstours@email.com / +23481607000000"
          />
          <Link href="forgot" className={styles.forgot}>
            Forgot password?
          </Link>
          <button type="submit">Continue</button>
        </div>
        <div
          className={`${styles.form} ${
            linkActive === "signin" && styles.formHide
          }`}
        >
          <label>Phone number</label>
          <input type="text" name="phone" placeholder="+23481607000000" />
          <div className={styles.formGroup}>
            <div>
              <label>Password</label>
              <input type="password" name="password" placeholder="*********" />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                placeholder="********"
              />
            </div>
          </div>
          <div className={styles.showPassword}>
            <input type="checkbox" />
            Show Password
          </div>
          <button type="submit">Continue</button>
        </div>
      </div>
      <div className={styles.img}></div>
    </div>
  );
}
