"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./styles.module.css";

// Mock order data for details page (replace with actual API)
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

export default function OrderDetails({ params }) {
  const [order, setOrder] = useState(null);
  const { orderId } = params;
  const router = useRouter();

  useEffect(() => {
    // Find the order by its ID (you can replace this with an API call)
    const foundOrder = mockOrders.find((order) => order.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Redirect if the order is not found
      router.push("/orders");
    }
  }, [orderId, router]);

  return (
    <div className={styles.container}>
      <button onClick={() => router.push("/orders")}>
        <FaArrowLeft /> Back to Orders
      </button>

      {order ? (
        <div className={styles.orderDetails}>
          <h3>Order Details - {order.date}</h3>
          <div>
            <h4>Items Ordered:</h4>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.title} x{item.quantity} - {item.price}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Status:</h4> {order.status}
          </div>
          <div>
            <h4>Total:</h4> {order.total}
          </div>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
}
