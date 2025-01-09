"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import logo from "../../../../../img/logo.png";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        isAdmin: true,
      });

      if (result?.error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: result.error, // Display the general error message
        }));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.error,
          timer: 1500,
        });

        setProcessing(false);
      } else {
        Swal.fire({
          icon: "success",
          text: "Login successful!",
          timer: 1500,
        });
        setProcessing(false);
        router.push("/ob/obiku/admin/dashboard");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sign in failed. Please try again",
        timer: 1500,
      });
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the general error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      general: "", // Reset general error on field change
    }));

    // Validate the specific field and set individual field errors
    const updatedErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: updatedErrors[name],
    }));
  };

  const validateField = (name, value) => {
    const tempErrors = { ...errors };

    switch (name) {
      case "email":
        if (!value) {
          tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          tempErrors.email = "Please enter a valid email address.";
        } else {
          tempErrors.email = "";
        }
        break;

      case "password":
        if (!value) {
          tempErrors.password = "Password is required.";
        } else {
          tempErrors.password = "";
        }
        break;

      default:
        break;
    }

    return tempErrors;
  };
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <Link href="/">
          <Image
            src={logo}
            alt="Obiku Travels & Tours"
            className={styles.logo}
          />
        </Link>
        <h4>Admin login</h4>
        <form action="">
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
            {errors.general && (
              <span className={styles.error}>{errors.general}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="************"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSubmit} disabled={processing}>
            {processing ? "Signing..." : "Sign In"}{" "}
            {!processing && <ArrowForwardIcon style={{ fontSize: "16px" }} />}
          </button>
        </form>
      </div>
    </div>
  );
}
