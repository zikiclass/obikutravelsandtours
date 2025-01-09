"use client";

import Search from "../../ui/dashboard/search/search";
import styles from "../../ui/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import Swal from "sweetalert2";
const AdminPage = () => {
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd, MMMM yyyy");
  };
  // const { count, users } = await fetchUsers(q, page);
  const [admins, setAdmins] = useState([]);
  const getAdmins = async () => {
    const response = await axios.get(`/api/admin/register`);
    if (response.data) setAdmins(response.data);
  };
  useEffect(() => {
    getAdmins();
  }, []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete this record?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes delete",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Delete(id);
      } else if (result.isDenied) {
        Swal.fire({
          icon: "info",
          text: "No delete request was made",
          timer: 2000,
        });
      }
    });
  };

  const Delete = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/register?id=${id}`);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Admin record deleted successfully",
          timer: 2000,
        });
        getAdmins();
      } else {
        Swal.fire({
          icon: "error",
          text: "Error deleting record",
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        timer: 2000,
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span></span>
        <Link href="admin/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td className={styles.mobile}>Name</td>
              <td>Email</td>
              <td className={styles.mobile}>Created At</td>

              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>
                  <div className={styles.user}>{admin.fullname}</div>
                </td>
                <td>{admin.email}</td>
                <td>{formatDate(admin.date)}</td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default AdminPage;
