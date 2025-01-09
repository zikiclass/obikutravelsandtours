"use client";
import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { InfinitySpin } from "react-loader-spinner";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { z } from "zod";
import { userSchema } from "../validationSchema";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";

export default function SignUp() {
  const [logging, setLogging] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    dateofBirth: "",
    email: "",
    referrercode: "",
  });
  const [errors, setErrors] = useState({});
  const {
    emailVerifyForm,
    setEmailVerifyForm,
    verifyCode,
    setVerifyCode,
    otpEmail,
    setLinkActive,
    showForm2,
    setShowForm2,
  } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);

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
      case "phoneNumber":
        if (!value) {
          tempErrors.phoneNumber = "Phone number is required.";
        } else if (!/^\+?\d{11,15}$/.test(value)) {
          tempErrors.phoneNumber = "Please enter a valid phone number.";
        } else {
          tempErrors.phoneNumber = "";
        }
        break;

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

      case "dateofBirth":
        if (!value) {
          tempErrors.dateofBirth = "Date of birth is required.";
        } else {
          tempErrors.dateofBirth = "";
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

  const handleClick = (e) => {
    e.preventDefault();
    if (!errors.phoneNumber && !errors.password && !errors.confirmPassword) {
      setShowForm2(true);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create validation schema from Zod
    const validation = userSchema.safeParse(formData);

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
    setLogging(true);
    const toastId = toast.loading("Creating account...");
    try {
      const getRandomInt = (min, max) =>
        Math.floor(Math.random() * (max - min)) + min;
      const randomCode = getRandomInt(100000, 1000000).toString();
      setVerifyCode(randomCode);
      const formDataWithCode = {
        ...formData,
        randomCode: randomCode,
      };
      await axios.post("/api/register", formDataWithCode);
      toast.dismiss(toastId);

      /* SENDING EMAIL LOGIC */

      await sendVerificationEmail(formData.email, randomCode);

      /* ------------------ */

      toast.success("Account successfully registered");
      setEmailVerifyForm(true);
    } catch (error) {
      toast.error(error.message);
      toast.dismiss(toastId);
    }
  };

  const handleResendOtp = async () => {
    await sendVerificationEmail(formData.email, verifyCode);
    toast.success("Verification email sent successfully!");
  };
  const sendVerificationEmail = async (email, verifyCode) => {
    const subject = "Please verify your email address";
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
              <p>Welcome to Obiku Travels & Tours. Thanks for joining us. <br /> Please use the code below to verify your email address.</p>
              <p>Your email verification code is: <span>${verifyCode}</span></p>
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
        to: email,
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

  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to store OTP digits
  const inputRefs = useRef([]);
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers
    if (/[^0-9]/.test(value)) return;

    // Update the OTP array
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Focus the next input field if the value is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If backspace is pressed on the first empty field, do nothing
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // If backspace is pressed in the last field and it's empty, focus the previous field
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmitOtp = async () => {
    const otpValue = otp.join(""); // Join OTP array into a single string

    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await fetch("/api/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: otpEmail !== "" ? otpEmail : formData.email, // Pass the email from form data
          otp: otpValue,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("OTP verified successfully!");
        setLinkActive("signin");
      } else {
        toast.error(data.message || "Failed to verify OTP");
      }
    } catch (error) {
      toast.error("An error occurred while verifying OTP.");
      console.error(error);
    }
  };
  return (
    <>
      <form action="">
        <Toaster position="top-center" />
        <div
          style={{ display: emailVerifyForm || showForm2 ? "none" : "block" }}
        >
          <label>Phone number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="+23481607000000"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <span className={styles.error}>{errors.phoneNumber}</span>
          )}
          <div className={styles.formGroup}>
            <div>
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="*********"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>
          </div>
          <div className={styles.showPassword}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleTogglePasswordVisibility}
            />
            Show Password
          </div>
          <span className={styles.button} onClick={handleClick}>
            Continue
          </span>
        </div>
        <div
          style={{ display: showForm2 && !emailVerifyForm ? "block" : "none" }}
        >
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Obiku Travels"
            value={formData.fullname}
            onChange={handleChange}
          />
          {errors.fullname && (
            <span className={styles.error}>{errors.fullname}</span>
          )}
          <span className={styles.fade}>First name followed by Last name</span>
          <div className={styles.formGroup}>
            <div>
              <label>Date of Birth</label>
              <div className={styles.date_input_container}>
                <input
                  type="date"
                  id="dateInput"
                  name="dateofBirth"
                  value={formData.dateofBirth}
                  onChange={handleChange}
                />

                <label for="dateInput" className={styles.floating_label}>
                  dd/mm/yyy
                </label>
              </div>

              {errors.dateofBirth && (
                <span className={styles.error}>{errors.dateofBirth}</span>
              )}
              <span className={styles.fade}>
                To sign up you need to be at least 18, your Date of Birth wont
                be visible to others who use Obiku Travels & Tours
              </span>
            </div>

            <div>
              <label>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
              <span className={styles.fade}>
                We&apos;ll send you trip confirmations and receipts.
              </span>
            </div>
          </div>

          <label>Referrer Code (Optional)</label>
          <input
            type="text"
            name="referrercode"
            placeholder="e.g OBIKU1234"
            value={formData.referrercode}
            onChange={handleChange}
          />

          <span className={styles.aggrement}>
            By clicking &quot;Agree and continue&quot;, I agree to Obiku&apos;s{" "}
            <Link
              href="/terms-of-service"
              target="_blank"
              className={styles.linkTerms}
            >
              Terms of Service
            </Link>{" "}
            and acknowledge the Privacy Policy.
          </span>
          <div
            className={styles.btnGroup}
            style={{ display: logging ? "none" : "flex" }}
          >
            <span onClick={() => setShowForm2(false)}>
              <IoArrowBackOutline /> Back
            </span>
            <button onClick={onSubmit}>Agree and Continue</button>
          </div>
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
        </div>

        <div
          style={{
            display: emailVerifyForm ? "block" : "none",
            margin: "1rem 0px",
          }}
        >
          <label>Enter OTP sent to your Email address:</label>
          <div className={styles.inputGroup}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <div className={styles.btnGroup}>
            <span
              className={styles.resend}
              style={{ display: emailVerifyForm ? "none" : "block" }}
              onClick={handleResendOtp}
            >
              Resend OTP
            </span>
            <span className={styles.button} onClick={handleSubmitOtp}>
              Verify Account
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
