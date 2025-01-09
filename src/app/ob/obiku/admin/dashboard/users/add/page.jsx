"use client";
import { useState } from "react";
import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";
import { userSchema } from "@/app/validationSchema";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
const AddUserPage = () => {
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateofBirth: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const updatedErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: updatedErrors[name],
    }));
  };
  const validateField = (name, value) => {
    const tempErrors = { ...errors };

    switch (name) {
      case "phoneNumber":
        if (!value) {
          tempErrors.phoneNumber = "Phone number is required.";
        } else if (!/^\+?\d{11,15}$/.test(value)) {
          tempErrors.phoneNumber = "Please enter a valid phone number.";
        } else {
          tempErrors.phoneNumber = "";
        }
        break;

      case "password":
        if (!value) {
          tempErrors.password = "Password is required.";
        } else if (value.length < 6) {
          tempErrors.password = "Password must be at least 6 characters.";
        } else {
          tempErrors.password = "";
        }
        break;

      case "confirmPassword":
        if (!value) {
          tempErrors.confirmPassword = "Please confirm your password.";
        } else if (value !== formData.password) {
          tempErrors.confirmPassword = "Passwords do not match.";
        } else {
          tempErrors.confirmPassword = "";
        }
        break;

      case "fullname":
        if (!value) {
          tempErrors.fullname = "Full name is required.";
        } else {
          tempErrors.fullname = "";
        }
        break;

      case "dateofBirth":
        if (!value) {
          tempErrors.dateofBirth = "Date of birth is required.";
        } else {
          tempErrors.dateofBirth = "";
        }
        break;

      case "email":
        if (!value) {
          tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          tempErrors.email = "Please enter a valid email address.";
        } else {
          tempErrors.email = "";
        }
        break;

      default:
        break;
    }

    return tempErrors;
  };
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    // Create validation schema from Zod
    const validation = userSchema.safeParse(formData);

    // Check for errors
    if (!validation.success) {
      const errorMessages = {};
      validation.error.errors.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages); // Set errors in state
      return; // Prevent form submission
    }

    // If validation passes, continue with form submission
    try {
      const response = await axios.post("/api/register", formData);
      if (response.status === 201) {
        setSubmit(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Client account has been registered",
          timer: 2000,
        });
        setSubmit(false);
        router.push("/ob/obiku/admin/dashboard/users");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email address already registered",
          timer: 2000,
        });
        setSubmit(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email address already registered",
        timer: 2000,
      });
      setSubmit(false);
    }
  };
  return (
    <div className={styles.container}>
      <Toaster position="top-center" />
      <form action="">
        <div className={styles.form} style={{ marginBottom: "1rem" }}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && (
              <span className={styles.error}>{errors.fullname}</span>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div>
            <input
              type="phone"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <span className={styles.error}>{errors.phoneNumber}</span>
            )}
          </div>

          <div>
            <input
              type="date"
              placeholder="DD/MM/YYY"
              name="dateofBirth"
              value={formData.dateofBirth}
              onChange={handleChange}
            />
            {errors.dateofBirth && (
              <span className={styles.error}>{errors.dateofBirth}</span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
        </div>
        <button onClick={onSubmit}>
          {" "}
          {submit ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
