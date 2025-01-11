"use client";
import { useEffect, useState } from "react";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import axios from "axios";

export default function DashboardPage() {
  const [admins, setAdmins] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const getTotals = async () => {
    const response = await axios.get(`/api/admin/register`);
    if (response.data) setAdmins(response.data);

    const usersResponse = await axios.get(`/api/admin/users`);
    if (usersResponse.data) setUsers(usersResponse.data);

    const productResponse = await axios.get(`/api/admin/products`);
    if (productResponse.data) setProducts(productResponse.data);
    // console.log(response);
  };
  useEffect(() => {
    getTotals();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card title="Total Products" qty={products.length} />
          <Card title="Total Users" qty={users.length} />
          <Card title="Total Admin" qty={admins.length} />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
}
