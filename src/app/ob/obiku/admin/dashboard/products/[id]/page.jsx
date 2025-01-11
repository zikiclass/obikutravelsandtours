"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../../../ui/dashboard/products/singleProduct/singles.module.css";
import Swal from "sweetalert2";

const SingleProductPage = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        const data = await res.json();
        if (data.product) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Convert price to a float
    data.price = parseFloat(data.price);

    // Convert features checkboxes to an object with boolean values
    const features = {};
    const featureElements = e.target.querySelectorAll('input[name="features"]');
    featureElements.forEach((checkbox) => {
      features[checkbox.value] = checkbox.checked;
    });
    data.features = features;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        // Correct route
        method: "PUT", // Ensure you're using PUT for updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          text: "Product updated successfully",
        });
        router.push("/ob/obiku/admin/dashboard/products"); // Redirect after success
      } else {
        Swal.fire({
          icon: "error",
          text: result.error || "Failed to update product",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        text: "Error updating product",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !product) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          {/* Display the main product image */}
          <Image
            src={product.mainImage || "/noavatar.png"}
            alt="Main Product Image"
            width={300}
            height={300}
            className={styles.productImage}
          />
        </div>
        <div className={styles.productImages}>
          <h3>Product Images</h3>
          {/* Loop over productImages array and display each image */}
          {product.productImages && product.productImages.length > 0 ? (
            <div className={styles.imagesGrid}>
              {product.productImages.map((image) => (
                <div key={image.id} className={styles.imageWrapper}>
                  <Image
                    src={image.imageUrl}
                    alt={`Product Image ${image.id}`}
                    width={100}
                    height={100}
                    className={styles.productImageThumbnail}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No additional images available</p>
          )}
        </div>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={product.id} />
          <label>Title</label>
          <input
            type="text"
            name="title"
            defaultValue={product.title}
            required
          />

          <label>Product Type</label>
          <input
            type="text"
            name="productType"
            defaultValue={product.productType}
            required
          />

          <label>Price</label>
          <input
            type="number"
            name="price"
            defaultValue={product.price}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            defaultValue={product.location}
            required
          />

          <label>Listed by</label>
          <input
            type="text"
            name="listedby"
            defaultValue={product.listedby}
            required
          />

          <label>Description</label>
          <textarea name="desc" defaultValue={product.desc} required />

          <label>Features</label>
          {/* Dynamically render checkboxes based on product.features */}
          <div className={styles.checkBox}>
            {product.features &&
              Object.keys(product.features).map((feature) => (
                <div key={feature} className={styles.checkboxWrapper}>
                  <input
                    id={feature}
                    type="checkbox"
                    name="features"
                    value={feature}
                    defaultChecked={product.features[feature]}
                  />
                  <label htmlFor={feature}>{feature}</label>
                </div>
              ))}
          </div>

          <button type="submit" className={styles.updateButton}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
