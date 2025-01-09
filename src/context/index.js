"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [totalPriceCart, setTotalPriceCart] = useState(0);
  const [forgotContainer, setShowForgotContainer] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [updateQuery, setUpdateQuery] = useState("");
  const [emailVerification, setEmailVerification] = useState("");
  const [useId, setUseId] = useState("");
  const [linkActive, setLinkActive] = useState("signin");
  const [emailVerifyForm, setEmailVerifyForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [showOTPForgot, setShowOTPForgot] = useState(false);
  const [OTPForgotPassword, showOTPForgotPassword] = useState(false);
  const [uniqueUpdate, setUniqueUpdate] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        totalPriceCart,
        setTotalPriceCart,
        updateQuery,
        setUpdateQuery,
        uniqueUpdate,
        setUniqueUpdate,
        useId,
        setUseId,
        forgotContainer,
        setShowForgotContainer,
        showProcessing,
        setShowProcessing,
        showPassword,
        setShowPassword,
        emailVerification,
        setEmailVerification,
        linkActive,
        setLinkActive,
        emailVerifyForm,
        setEmailVerifyForm,
        showForm2,
        setShowForm2,
        otpEmail,
        setOtpEmail,
        verifyCode,
        setVerifyCode,
        showOTPForgot,
        setShowOTPForgot,
        OTPForgotPassword,
        showOTPForgotPassword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
