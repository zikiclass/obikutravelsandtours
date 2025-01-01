"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";
export default function SignIn() {
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [logging, setLogging] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const handleClick = (e) => {
    e.preventDefault();
    if (!password && !showPassword) {
      if (!email) {
        setError("Please enter a valid Email Address");
      } else if (!emailRegex.test(email)) {
        setError("Please enter a valid Email Address");
      } else {
        setError("");
        setShowPassword(true);
      }
    } else {
      if (!password) {
        setError("Please enter password");
      } else {
        setLogging(true);
      }
    }
  };
  return (
    <form>
      <div style={{ display: showPassword ? "none" : "block" }}>
        <label>Email Address</label>
        <input
          type="text"
          name="email"
          placeholder="travelstours@email.com"
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
      </div>
      <div style={{ display: showPassword ? "block" : "none" }}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="***************"
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
      </div>
      <span className={styles.error}>{error}</span>
      <Link href="forgot" className={styles.forgot}>
        Forgot password?
      </Link>
      <button
        onClick={handleClick}
        style={{ display: logging ? "none" : "block" }}
      >
        <span>Continue</span>
      </button>
      <div
        className={styles.processing}
        style={{ display: logging ? "block" : "none" }}
      >
        <div
          className={styles.loadSpin}
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "92%",
            padding: "0",
            margin: "0",
          }}
        >
          <InfinitySpin
            visible={true}
            width="100"
            color="#ecc531"
            ariaLabel="infinity-spin-loading"
          />
          <span>Logging...</span>
        </div>
      </div>
    </form>
  );
}
