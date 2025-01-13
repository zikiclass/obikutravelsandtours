"use client";
import Footer from "@/components/footer/page";
import BottomFooter from "@/components/footer_bottom/page";
import Header from "@/components/header/page";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSadTear, FaArrowRight } from "react-icons/fa";
import styles from "./styles.module.css";

// Mock order data (replace with actual API call)
const mockOrders = [
  {
    id: "1",
    date: "2023-01-13",
    items: [
      { title: "Item 1", quantity: 2, price: 200 },
      { title: "Item 2", quantity: 1, price: 150 },
    ],
    total: 550,
    status: "Pending",
  },
  {
    id: "2",
    date: "2023-02-25",
    items: [{ title: "Item 3", quantity: 1, price: 400 }],
    total: 400,
    status: "Processed",
  },
];

const formatPrice = (price) => {
  return price.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth"); // Redirect to authentication page if not logged in
    } else {
      // Replace with actual API call to fetch the user's orders
      setOrders(mockOrders); // Here we're using mock data
    }
  }, [status, router]);

  const handleViewOrderDetails = (orderId) => {
    // Redirect to a detailed order page
    router.push(`/order-details/${orderId}`);
  };

  return (
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
        <h2 className={styles.orderHistoryHeader}>Your Order History</h2>

        {orders.length === 0 ? (
          <div className={styles.emptyOrder}>
            <FaSadTear size={60} />
            <p>No orders placed yet.</p>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div className={styles.orderCard} key={order.id}>
                <div className={styles.orderSummary}>
                  <p>
                    <strong>Order Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Total:</strong> {formatPrice(order.total)}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                </div>
                <button
                  onClick={() => handleViewOrderDetails(order.id)}
                  className={styles.viewDetailsButton}
                >
                  <FaArrowRight /> View Details
                </button>
              </div>
            ))}
          </div>
        )}

        <BottomFooter />
        <Footer />
      </div>
    </>
  );
}
