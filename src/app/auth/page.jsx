"use client";
import { useState, useContext, useRef } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";
import { GlobalContext } from "@/context";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import axios from "axios";
import { passwordChangeSchema } from "../validationSchema";
export default function SignIn() {
  const router = useRouter();

  const {
    forgotContainer,
    setShowForgotContainer,
    showProcessing,
    setShowProcessing,
    showPassword,
    setShowPassword,
    OTPForgotPassword,
    showOTPForgotPassword,
    setLinkActive,
    setEmailVerifyForm,
    setOtpEmail,
    showOTPForgot,
    setShowOTPForgot,
  } = useContext(GlobalContext);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [logging, setLogging] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordChange: "",
    passwordConfirmChange: "",
    forgotEmail: "",
  });
  const [errors, setErrors] = useState({});

  const handleClick = (e) => {
    e.preventDefault();
    if (formData.email) setShowPassword(true);
    else
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email",
      }));
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowProcessing(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        isAdmin: false,
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

        if (
          result?.error === "Account not verified. Please verify your email."
        ) {
          setLinkActive("signup");
          setEmailVerifyForm(true);
          setOtpEmail(formData.email);
        }

        setShowProcessing(false);
        setShowPassword(false);
      } else {
        Swal.fire({
          icon: "success",
          text: "Login successful!",
          timer: 1500,
        });

        router.push("/user/dashboard");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sign in failed. Please try again",
        timer: 1500,
      });
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

  const hanldeSendOTP = async (e) => {
    e.preventDefault();
    setLogging(true);
    const getRandomInt = (min, max) =>
      Math.floor(Math.random() * (max - min)) + min;
    const randomCode = getRandomInt(100000, 1000000).toString();
    const formDataWithCode = {
      ...formData,
      forgotCode: randomCode,
    };
    await axios.post("/api/forgot_password", formDataWithCode);

    await sendVerificationEmail(formData.forgotEmail, randomCode);

    Swal.fire({
      icon: "success",
      text: "Otp sent successfully",
      timer: 1500,
    });

    setShowOTPForgot(true);

    setLogging(false);
  };
  const handleTogglePasswordVisibility = () => {
    setDisplayPassword(!displayPassword);
  };
  const handleSubmitOtp = async () => {
    setLogging(true);
    const otpValue = otp.join(""); // Join OTP array into a single string

    if (otpValue.length !== 6) {
      Swal.fire({
        icon: "error",
        text: "Please enter a valid 6-digit OTP",
        timer: 1500,
      });
      return;
    }

    try {
      const response = await fetch("/api/verifyForgotOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.forgotEmail, // Pass the email from form data
          otp: otpValue,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: "OTP Verified",
          timer: 1500,
        });
        setLogging(false);
        setShowOTPForgot(false);
        showOTPForgotPassword(true);
      } else {
        Swal.fire({
          icon: "error",
          text: data.message || "Failed to verify OTP",
          timer: 1500,
        });
        setLogging(false);
        showOTPForgotPassword(false);
        setShowOTPForgot(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "An error occurred while verifying OTP.",
        timer: 1500,
      });
      setLogging(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLogging(true);
    // Create validation schema from Zod
    const validation = passwordChangeSchema.safeParse(formData);

    // Check for errors
    if (!validation.success) {
      const errorMessages = {};
      validation.error.errors.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages); // Set errors in state
      return; // Prevent form submission
    }

    try {
      await axios.post("/api/changePassword", formData);
      Swal.fire({
        icon: "success",
        text: "Password reset successfully",
        timer: 1500,
      });
      /* SENDING EMAIL LOGIC */

      await sendPasswordResetEmail(formData.forgotEmail);
      setShowForgotContainer(false);
      showOTPForgotPassword(false);
      setLogging(false);
      /* ------------------ */
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        timer: 1500,
      });
      setLogging(false);
    }
  };

  const sendVerificationEmail = async (email, verifyCode) => {
    const subject = "Password Reset 🔸";
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
            <p>Dear User,</p>
            <p>We have received your notification to reset your password. For the safety of your account, we would like to verify your identity. </p>
            
            <p>Kindly use the One-time Passcode
            sent to you to complete your reset process. Your account recovery code is: <span>${verifyCode}</span></p>
              <p>If you did not initiate this activity, kindly ignore this message.</p>

              <p>Thank you for choosing Obiku Travels & Tours.</p>
            </div>
            <center>
            &copy; 2025 <a href="https://www.obikutravelsandtours.com/">Obiku Travels & Tours</a>. All rights reserved.
            </center>
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
        to: formData.forgotEmail,
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

  const sendPasswordResetEmail = async (email) => {
    const subject = "You have Reset your password 🔸";
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
            <p>Dear User,</p>
            <p>This is a confirmation message that you are back in action! Your password for your account (Name of customer) has been reset. Kindly login to keep (using our services, connecting with others etc).</p>
            
           
              <p>If you did not initiate this activity, do not hesitate to contact our customare care (phone or email) to terminate the process.</p>

              <p></p>
              <p>Your safety is our priority.</p>
              
              <p>Thank you for choosing Obiku Travels & Tours.</p>
            </div>
            <center>
            &copy; 2025 <a href="https://www.obikutravelsandtours.com/">Obiku Travels & Tours</a>. All rights reserved.
            </center>
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
        to: formData.forgotEmail,
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
    <>
      <div style={{ display: forgotContainer ? "none" : "block" }}>
        <form action="">
          <Toaster position="top-center" />
          <div style={{ display: showPassword ? "none" : "block" }}>
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              placeholder="travelstours@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
            {errors.general && (
              <span className={styles.error}>{errors.general}</span>
            )}
            <span
              onClick={() => setShowForgotContainer(true)}
              className={styles.forgot}
            >
              Forgot password?
            </span>
            <button
              onClick={handleClick}
              style={{ display: showProcessing ? "none" : "block" }}
            >
              <span>Continue</span>
            </button>
          </div>

          <div style={{ display: showPassword ? "block" : "none" }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="***************"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
            {errors.general && (
              <span className={styles.error}>{errors.general}</span>
            )}
            <span
              onClick={() => setShowForgotContainer(true)}
              className={styles.forgot}
            >
              Forgot password?
            </span>
            <div
              className={styles.btnGroup}
              style={{ display: showProcessing ? "none" : "flex" }}
            >
              <span
                className={styles.resend}
                onClick={() => setShowPassword(false)}
              >
                <FaArrowLeftLong />
                Back
              </span>
              <button onClick={handleSubmit}>Continue</button>
            </div>
          </div>

          <div
            className={styles.processing}
            style={{ display: showProcessing ? "block" : "none" }}
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
      </div>

      <div
        style={{
          display:
            forgotContainer && !showOTPForgot && !OTPForgotPassword
              ? "block"
              : "none",
        }}
      >
        <form action="">
          <label>Email Address</label>
          <input
            type="text"
            name="forgotEmail"
            placeholder="travelstours@email.com"
            value={formData.forgotEmail}
            onChange={handleChange}
          />
          <div
            className={styles.btnGroup}
            style={{ display: logging ? "none" : "flex" }}
          >
            <span
              className={styles.resend}
              onClick={() => setShowForgotContainer(false)}
            >
              <FaArrowLeftLong />
              Back
            </span>
            <button onClick={hanldeSendOTP}>Send OTP</button>
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
              <span>Processing...</span>
            </div>
          </div>
        </form>
      </div>

      <div
        style={{
          display: showOTPForgot ? "block" : "none",
          margin: "1rem 0px",
        }}
      >
        <label>Enter OTP sent to your {formData.forgotEmail}:</label>
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
        <div
          className={styles.btnGroup}
          style={{ display: logging ? "none" : "flex" }}
        >
          <span className={styles.resend} onClick={hanldeSendOTP}>
            Resend OTP
          </span>
          <span className={styles.button} onClick={handleSubmitOtp}>
            Continue
          </span>
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
            <span>Processing...</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: forgotContainer && OTPForgotPassword ? "block" : "none",
          margin: "1rem 0px",
        }}
      >
        <div className={styles.formGroup}>
          <div>
            <label>Password</label>
            <input
              type={displayPassword ? "text" : "password"}
              name="passwordChange"
              placeholder="*********"
              value={formData.passwordChange}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type={displayPassword ? "text" : "password"}
              name="passwordConfirmChange"
              placeholder="********"
              value={formData.passwordConfirmChange}
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
            checked={displayPassword}
            onChange={handleTogglePasswordVisibility}
          />
          Show Password
        </div>
        <span
          style={{ display: logging ? "none" : "block" }}
          className={styles.button}
          onClick={handlePasswordChange}
        >
          Change Password
        </span>
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
            <span>Processing...</span>
          </div>
        </div>
      </div>
    </>
  );
}
