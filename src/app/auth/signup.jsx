"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";
export default function SignUp() {
  const [logging, setLogging] = useState(false);

  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirm_passwordError, setConfirmPasswordError] = useState("");

  const [fullnameError, setFullnameError] = useState("");
  const [dateofBirthError, setDateofBirthError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [referrercodeError, setReferrerrcodeError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const [fullname, setFullname] = useState("");
  const [dateofBirth, setDateofBirth] = useState("");
  const [email, setEmail] = useState("");
  const [referrercode, setReferrerrcode] = useState("");

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    !phoneNumber && setPhoneError("Please enter a phone number");
    !password && setPasswordError("Please enter a password");
    !confirm_password &&
      setConfirmPasswordError("Please confirm your password");
    if (password && confirm_password) {
      password !== confirm_password
        ? setConfirmPasswordError("Password mismatch!")
        : setShowForm2(true);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    !fullname && setFullnameError("Please enter your full name");

    !dateofBirth && setDateofBirthError("Please enter a valid date");

    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid Email Address");
    } else {
      if (fullname && dateofBirth && email) {
        //setShowForm3(true);
        setLogging(true);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/auth");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div style={{ display: showForm2 ? "none" : "block" }}>
        <label>Phone number</label>
        <input
          type="text"
          name="phone"
          placeholder="+23481607000000"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setPhoneError("");
          }}
        />
        <span className={styles.error}>{phoneError}</span>
        <div className={styles.formGroup}>
          <div>
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="*********"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <span className={styles.error}>{passwordError}</span>
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              placeholder="********"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
              }}
            />
            <span className={styles.error}>{confirm_passwordError}</span>
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
        <button onClick={handleClick}>Continue</button>
      </div>
      <div style={{ display: showForm2 && !showForm3 ? "block" : "none" }}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Obiku Travels"
          onChange={(e) => {
            setFullname(e.target.value);
            setFullnameError("");
          }}
        />
        <span className={styles.error}>{fullnameError}</span>
        <span className={styles.fade}>First name followed by Last name</span>
        <div className={styles.formGroup}>
          <div>
            <label>Date of Birth</label>
            <div className={styles.date_input_container}>
              <input
                type="date"
                id="dateInput"
                name="dateofbirth"
                onChange={(e) => {
                  setDateofBirth(e.target.value);
                  setDateofBirthError("");
                }}
              />
              <label for="dateInput" className={styles.floating_label}>
                dd/mm/yyy
              </label>
            </div>

            <span className={styles.error}>{dateofBirthError}</span>
            <span className={styles.fade}>
              To sign up you need to be at least 18, your Date of Birth wont be
              visible to others who use Obiku Travels & Tours
            </span>
          </div>

          <div>
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            <span className={styles.error}>{emailError}</span>
            <span className={styles.fade}>
              We&apos;ll send you trip confirmations and receipts.
            </span>
          </div>
        </div>

        <label>Referrer Code (Optional)</label>
        <input type="text" name="referrercode" placeholder="e.g OBIKU1234" />
        <span className={styles.error}>{referrercodeError}</span>
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
          <button onClick={handleContinue}>Agree and Continue</button>
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
        style={{ display: showForm3 ? "block" : "none", margin: "1rem 0px" }}
      >
        <label>Enter OTP sent to your Email address:</label>
        <div className={styles.inputGroup}>
          <input type="text" maxLength={1} />
          <input type="text" maxLength={1} />
          <input type="text" maxLength={1} />
          <input type="text" maxLength={1} />
          <input type="text" maxLength={1} />
          <input type="text" maxLength={1} />
        </div>
        <div className={styles.btnGroup}>
          <span className={styles.resend}>Resend OTP</span>
          <button onClick={handleSubmit}>Continue</button>
        </div>
      </div>
    </>
  );
}
