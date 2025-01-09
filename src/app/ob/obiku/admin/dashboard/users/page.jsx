"use client";
import { useEffect, useState } from "react";
import styles from "../../ui/dashboard/users/users.module.css";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { MdSearch } from "react-icons/md";

const UsersPage = () => {
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd, MMMM yyyy");
  };

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const usersPerPage = 15;

  // Fetch users based on search query and pagination
  const getUsers = async () => {
    const response = await axios.get(
      `/api/register?page=${currentPage}&limit=${usersPerPage}&search=${searchQuery}`
    );
    if (response.status === 200) {
      setUsers(response.data.users);
      setTotalUsers(response.data.totalUsers); // Update total users for pagination
    }
  };

  useEffect(() => {
    getUsers(); // Re-fetch users when searchQuery or currentPage changes
  }, [currentPage, searchQuery]);

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
      const response = await axios.delete(`/api/register?id=${id}`);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          text: "User record deleted successfully",
          timer: 2000,
        });
        getUsers(); // Re-fetch users after deletion
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

  // Pagination logic
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.searchContainer}>
          <MdSearch />
          <input
            type="text"
            placeholder="Search for a user..."
            className={styles.inputSearch}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link href="users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td className={styles.mobile}>Name</td>
              <td>Email</td>
              <td>Created At</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.user}>{user.fullname}</div>
                </td>
                <td>{user.email}</td>
                <td>{formatDate(user.date)}</td>
                <td>
                  {user.verifyCode === "verified" ? (
                    "Verified"
                  ) : (
                    <span style={{ color: "red" }}>Not Verified</span>
                  )}
                </td>

                <td>
                  <div className={styles.buttons}>
                    <Link href={`users/${user.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>

                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(user.id)}
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

      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default UsersPage;
