"use client";
import { useState, useRef } from "react";
import styles from "../../../ui/dashboard/products/addProduct/addProduct.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const AddProductPage = () => {
  const router = useRouter();
  const inputFileRef = useRef(null);
  const [filePreviews, setFilePreviews] = useState({
    mainImage: null,
    productImages: [null, null, null, null],
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productType: "Hotel",
    title: "",
    reviews: "",
    location: "",
    listedby: "",
    price: "",
    desc: "",
    features: {
      freewifi: false,
      roomservice: false,
      frontdesk: false,
      fitness: false,
      aircon: false,
      pool: false,
      powersupply: false,
    },
    mainImage: "",
    productFiles: [],
  });

  // Handle file change for main image and product images
  const handleFileChange = (event, type, index = null) => {
    const file = event.target.files[0];
    if (file) {
      if (type === "mainImage") {
        setFilePreviews({
          ...filePreviews,
          mainImage: URL.createObjectURL(file),
        });
        setFormData({ ...formData, mainImage: file });
      } else {
        const updatedProductImages = [...filePreviews.productImages];
        updatedProductImages[index] = URL.createObjectURL(file);
        setFilePreviews({
          ...filePreviews,
          productImages: updatedProductImages,
        });
        const updatedProductFiles = [...formData.productFiles];
        updatedProductFiles[index] = file;
        setFormData({ ...formData, productFiles: updatedProductFiles });
      }
    }
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Prepare the data to be sent to the backend
      const dataToSubmit = new FormData();
      dataToSubmit.append("productType", formData.productType);
      dataToSubmit.append("title", formData.title);
      dataToSubmit.append("reviews", formData.reviews);
      dataToSubmit.append("location", formData.location);
      dataToSubmit.append("listedby", formData.listedby);
      dataToSubmit.append("price", formData.price);
      dataToSubmit.append("desc", formData.desc);
      dataToSubmit.append("features", JSON.stringify(formData.features));

      // Append the main image and product images as files
      dataToSubmit.append("mainImage", formData.mainImage);
      formData.productFiles.forEach((file, index) => {
        dataToSubmit.append(`productFiles[${index}]`, file);
      });

      // Send the form data to the backend
      const response = await fetch("/api/upload", {
        method: "POST",
        body: dataToSubmit,
      });

      const result = await response.json();
      Swal.fire({
        icon: "success",
        text: "Product uploaded successfully",
      });
      router.push("/ob/obiku/admin/dashboard/products");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Error uploading product: " + error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Product Type */}
        <select
          name="productType"
          value={formData.productType}
          onChange={(e) =>
            setFormData({ ...formData, productType: e.target.value })
          }
        >
          <option value="Hotel">Hotel</option>
          <option value="Car Rental">Car Rental</option>
          <option value="Bus Booking">Bus Booking</option>
          <option value="Short Lets">Short Lets</option>
          <option value="Events">Events</option>
          <option value="Flight Tickets">Flight Tickets</option>
          <option value="Charter Plane">Charter Plane</option>
        </select>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        {/* Reviews */}
        <input
          type="number"
          placeholder="Reviews"
          name="reviews"
          required
          value={formData.reviews}
          onChange={(e) =>
            setFormData({ ...formData, reviews: e.target.value })
          }
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location (e.g Asaba, NG)"
          name="location"
          required
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />

        {/* Listed by */}
        <input
          type="text"
          placeholder="Listed by ..."
          name="listedby"
          required
          value={formData.listedby}
          onChange={(e) =>
            setFormData({ ...formData, listedby: e.target.value })
          }
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          name="price"
          required
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        {/* Image Upload */}
        <div className={styles.divGroup}>
          <span>Main Image</span>
          <input
            type="file"
            ref={inputFileRef}
            accept="image/*"
            required
            onChange={(e) => handleFileChange(e, "mainImage")}
          />
          {filePreviews.mainImage && (
            <div style={{ marginBottom: "10px" }}>
              <h3>Selected File:</h3>
              <img
                src={filePreviews.mainImage}
                alt="Main Image Preview"
                style={{
                  maxWidth: "200px",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </div>

        {/* Additional Product Images */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className={styles.divGroup}>
            <span>Product Image {index + 1}</span>
            <input
              type="file"
              placeholder={`Select product ${index + 1}`}
              accept="image/*"
              onChange={(e) => handleFileChange(e, "productImage", index)}
            />
            {filePreviews.productImages[index] && (
              <div style={{ marginBottom: "10px" }}>
                <h3>Selected File:</h3>
                <img
                  src={filePreviews.productImages[index]}
                  alt={`Product Image ${index + 1} Preview`}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "150px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </div>
        ))}

        {/* Description */}
        <textarea
          required
          name="desc"
          rows="8"
          placeholder="Description"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
        ></textarea>

        {/* Features */}
        <div className={styles.checkBox}>
          {Object.keys(formData.features).map((feature) => (
            <div key={feature}>
              <input
                type="checkbox"
                id={feature}
                name={feature}
                checked={formData.features[feature]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    features: {
                      ...formData.features,
                      [feature]: e.target.checked,
                    },
                  })
                }
              />
              <label htmlFor={feature}>
                <span>{feature.replace(/([A-Z])/g, " $1").toUpperCase()}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
