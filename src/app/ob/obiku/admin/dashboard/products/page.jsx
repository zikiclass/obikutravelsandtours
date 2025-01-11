"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../ui/dashboard/products/products.module.css";
import Search from "../../ui/dashboard/search/search";
import { MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const ProductsPage = ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotaProducts] = useState(0);

  const usersPerPage = 15;

  // Fetch products data from the API
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `/api/upload?page=${currentPage}&limit=${usersPerPage}&search=${searchQuery}`
      );
      const data = await res.json();

      if (data.products) {
        setProducts(data.products);
        setTotaProducts(data.totalProducts);
      } else {
        console.error("Failed to fetch products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on page load
  }, [currentPage, searchQuery]);

  const handleDelete = async (id) => {
    Swal.fire({
      icon: "info",
      text: "Are you sure you want to delete this product?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes delete",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReq();
      } else if (result.isDenied) {
        Swal.fire({
          icon: "info",
          text: "No delete request was made",
          timer: 2000,
        });
      }
    });

    const deleteReq = async () => {
      try {
        const res = await fetch(`/api/upload`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();

        if (data.message === "Product deleted successfully") {
          // Update UI: remove the deleted product from the state
          setProducts(products.filter((product) => product.id !== id));
          Swal.fire({
            icon: "success",
            text: "Product deleted successfully",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Failed to delete the product",
          });
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire({
          icon: "error",
          text: "Failed to delete the product" + error,
        });
      }
    };
  };
  const NumberWithCommas = ({ numberString }) => {
    const number = Number(numberString);
    const formattedNumber = number.toLocaleString();
    return <span>₦ {formattedNumber}</span>;
  };

  const totalPages = Math.ceil(totalProducts / usersPerPage);
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
        <Link href="products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Price</td>
            <td className={styles.mobile}>Created At</td>
            <td>Image</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.product}>{product.title}</div>
                </td>
                <td>
                  <NumberWithCommas numberString={product.price} />
                </td>
                <td className={styles.mobile}>
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>
                <td>
                  {/* Show only the first image in the productImages array */}
                  {product.productImages && product.productImages[0] ? (
                    <Image
                      src={product.productImages[0].imageUrl}
                      alt="Product Image"
                      width={80}
                      height={80}
                      className={styles.productImage}
                    />
                  ) : (
                    <span>No Image</span> // Fallback when no images are available
                  )}
                </td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`products/${product.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className={styles.noProducts}>
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination (uncomment when pagination logic is added) */}
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

export default ProductsPage;
