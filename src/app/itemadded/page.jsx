// components/CartAddedModal.js
"use client";
import { useState } from "react";
import styles from "./CartAddedModal.module.css";

const CartAddedModal = ({
  isOpen,
  onClose,
  heading,
  message,
  buttonText,
  buttonAction,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  const handleClose = () => {
    setShowModal(false);
    if (onClose) onClose(); // optional callback when closed
  };

  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction(); // Execute the button action passed in the props
    }
    handleClose(); // Optionally close the modal after button click
  };

  if (!showModal) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={handleClose}>
          X
        </button>
        <div className={styles.content}>
          <svg
            className={styles.cartIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="50px"
            height="50px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18M9 17h6M9 13h6M4 5h16l-2 12H6L4 5z"
            />
          </svg>
          <h2>{heading}</h2>
          <p>{message}</p>
          <button className={styles.proceedButton} onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartAddedModal;
