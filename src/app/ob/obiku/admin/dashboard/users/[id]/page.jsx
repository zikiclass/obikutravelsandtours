"use client";
import axios from "axios";
import styles from "../../../ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const SingleUserPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [user, setUser] = useState([]);

  const getUser = async (id) => {
    const response = await axios.get(`/api/admin/unique_user?id=${id}`);
    if (response.status === 200) setUser(response.data);
  };

  useEffect(() => {
    getUser(id);
  }, []);

  const VerifyAccount = (id) => {
    Swal.fire({
      title: "Do you want to verify this account?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes verify",
      denyButtonText: `Don't verify`,
    }).then((result) => {
      if (result.isConfirmed) {
        Verify(id);
      } else if (result.isDenied) {
        Swal.fire({
          icon: "info",
          text: "No verification request was made",
          timer: 2000,
        });
      }
    });
  };

  const Verify = async (id) => {
    try {
      const response = await axios.post(`/api/admin/verify_account?id=${id}`);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Account verified successfully",
        });
        router.push("/ob/obiku/admin/dashboard/users");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src="/avatar.jpg"
            alt=""
            width="150"
            height="150"
            className={styles.img}
          />
        </div>
        {user.fullname}
      </div>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <label>Full Name</label>
          <input type="text" name="fullname" value={user.fullname} />
          <label>Email</label>
          <input type="email" name="email" value={user.email} />
          <label>Phone</label>
          <input type="text" name="phone" value={user.phone} />
          <label>Date of Birth</label>
          <input type="text" name="dateofBirth" value={user.dateofbirth} />
          {user.verifyCode !== "verified" && (
            <button onClick={() => VerifyAccount(user.id)}>
              Verify Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
