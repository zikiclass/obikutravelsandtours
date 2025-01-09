"use client";

import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { adminSchema } from "@/app/validationSchema";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const AddUserPage = () => {
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const updatedErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: updatedErrors[name],
    }));
  };
  const validateField = (name, value) => {
    const tempErrors = { ...errors };

    switch (name) {
      case "password":
        if (!value) {
          tempErrors.password = "Password is required.";
        } else if (value.length < 6) {
          tempErrors.password = "Password must be at least 6 characters.";
        } else {
          tempErrors.password = "";
        }
        break;

      case "confirmPassword":
        if (!value) {
          tempErrors.confirmPassword = "Please confirm your password.";
        } else if (value !== formData.password) {
          tempErrors.confirmPassword = "Passwords do not match.";
        } else {
          tempErrors.confirmPassword = "";
        }
        break;

      case "fullname":
        if (!value) {
          tempErrors.fullname = "Full name is required.";
        } else {
          tempErrors.fullname = "";
        }
        break;

      case "email":
        if (!value) {
          tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          tempErrors.email = "Please enter a valid email address.";
        } else {
          tempErrors.email = "";
        }
        break;

      default:
        break;
    }

    return tempErrors;
  };
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    // Create validation schema from Zod
    const validation = adminSchema.safeParse(formData);

    // Check for errors
    if (!validation.success) {
      const errorMessages = {};
      validation.error.errors.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages); // Set errors in state
      return; // Prevent form submission
    }

    // If validation passes, continue with form submission
    try {
      await axios.post("/api/admin/register", formData);

      /* SENDING EMAIL LOGIC */

      await sendVerificationEmail();

      /* ------------------ */
      setSubmit(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Admin account has been registered",
        timer: 2000,
      });
      router.push("/ob/obiku/admin/dashboard/admin");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationEmail = async () => {
    const subject = "Admin account created successfully";
    const message = `
      <html>
        <head>
          <style>
            .container {
              width: 100%;
              padding: 1rem;
              height: 100%;
              gap: 1rem;
              background-color: #000;
            }
            .header {
              padding: 1rem;
              border-radius: 0.4rem;
              background-image: linear-gradient(to left, #9c7617, #ecc531);
              margin-bottom: 1rem;
            }
            .email-image {
              border-radius: 50%;
              width: 50px;
              height: 45px;
            }
            .content {
              background-color: #444;
              padding: 1rem;
              border-radius: 0.4rem;
              color: #fff;
            }
            .content p:nth-child(2) {
              margin-top: 1.1rem;
            }
            .content span {
              font-size: 2rem;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <center>
                <img src="https://www.obikutravelsandtours.com/logo.png" alt="Obiku Travels & Tours" class="email-image" />
              </center>
            </div>
            <div class="content">
              <p>Welcome to Obiku Travels & Tours. Thanks for joining us. <br /> Below are the details of the admin that just created an account with us.</p>
              <p>Fullname: ${formData.fullname}</p>
              <p>Email: ${formData.email}</p>
              <p>Password: ${formData.password}</p>
            </div>
          </div>
        </body>
      </html>
    `;
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "support@obikutravelsandtours.com",
        subject,
        html: message,
        from: '"Obiku Travels & Tours" support@obikutravelsandtours.com',
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to send email");
    }
  };
  return (
    <div className={styles.container}>
      <Toaster position="top-center" />
      <form action="">
        <div className={styles.form}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              onChange={handleChange}
              value={formData.fullname}
            />
            {errors.fullname && (
              <span className={styles.error}>{errors.fullname}oo</span>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
        </div>
        <button onClick={onSubmit}>
          {submit ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
