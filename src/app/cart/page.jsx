"use client";
import Footer from "@/components/footer/page";
import BottomFooter from "@/components/footer_bottom/page";
import Header from "@/components/header/page";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cartContext"; // Ensure this is correctly imported
import Image from "next/image";
import styles from "./styles.module.css"; // Make sure to create the appropriate styles

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const { cart, removeFromCart } = useCart(); // Assuming you have a removeFromCart function in context
  const userIsSignedIn = false; // Set this flag based on your user authentication logic

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate subtotal, charges, and total
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const charges = subtotal * 0.1; // 10% charge
  const total = subtotal + charges;

  // Handle remove item from cart
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  // Handle checkout button click
  const handleCheckout = () => {
    if (userIsSignedIn) {
      // Proceed to checkout page (Redirect or perform any checkout logic here)
      console.log("Proceeding to checkout...");
    } else {
      // Redirect to sign-in page if not signed in
      console.log("Redirecting to sign-in...");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              position: "fixed",
              width: "100%",
              backgroundColor: "white",
              top: "0px",
              zIndex: "10000",
            }}
          >
            <Header />
          </div>

          <div className={styles.container}>
            {/* Reservation Cart Section */}
            <div className={styles.cartSection}>
              <h2 className={styles.cartHeader}>Reservation Cart</h2>

              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <div className={styles.cartItems}>
                  {cart.map((item) => (
                    <div className={styles.cartItem} key={item.id}>
                      <div className={styles.itemImage}>
                        <Image
                          src={item.img} // Make sure img URL is correct
                          width={100}
                          height={80}
                          alt={item.title}
                          className={styles.imgs}
                        />
                      </div>
                      <div className={styles.itemDetails}>
                        <p className={styles.itemTitle}>{item.title}</p>
                        <p className={styles.itemLocation}>{item.location}</p>
                      </div>
                      <div className={styles.itemQuantity}>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <div className={styles.itemPrice}>
                        <p>${item.price.toFixed(2)}</p>
                      </div>
                      <div className={styles.removeButton}>
                        <button onClick={() => handleRemoveItem(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cart Summary Section */}
              {cart.length > 0 && (
                <div className={styles.cartSummary}>
                  <div className={styles.cartSubTotal}>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Charges (10%): ${charges.toFixed(2)}</p>
                  </div>
                  <div className={styles.cartTotal}>
                    <p>Total: ${total.toFixed(2)}</p>
                  </div>

                  {/* Checkout Section */}
                  <div className={styles.checkoutSection}>
                    {userIsSignedIn ? (
                      <button
                        onClick={handleCheckout}
                        className={styles.checkoutButton}
                      >
                        Proceed to Checkout
                      </button>
                    ) : (
                      <button className={styles.signInButton}>
                        Sign In to Checkout
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <BottomFooter />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
