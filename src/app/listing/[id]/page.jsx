"use client";
import styles from "./styles.module.css";
import Footer from "@/components/footer/page";
import BottomFooter from "@/components/footer_bottom/page";
import Header from "@/components/header/page";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import Nav from "./nav";
import ImagesDisplay from "./images";
import AboutListing from "./about";
import AddtoCart from "./addtocart";
import axios from "axios";
import CartAddedModal from "@/app/itemadded/page";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";

export default function ListingView({ params }) {
  const router = useRouter();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (!id) {
      console.log("No ID found");
      return; // Avoid fetching until the id is available
    }

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/unique/?id=${id}`);
        setProduct(response.data);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        return () => clearTimeout(timer);
      }
    };

    fetchProductDetails();
  }, [id]);

  const [showItemAdded, setShowItemAdded] = useState(false);

  const { cart, addToCart } = useCart();

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.mainImage,
      location: product.location,
      quantity: 1,
    };
    addToCart(productToAdd);
    setShowItemAdded(true);
  };
  const handleProceedToCart = () => {
    setShowItemAdded(false);
    router.push("/cart");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
            {showItemAdded && (
              <CartAddedModal
                isOpen={showItemAdded}
                onClose={() => setShowItemAdded(false)}
                heading="Item Added to Cart!"
                message="Your reservation has been added to your cart. Please proceed to cart to make payments. Thank you."
                buttonText="Proceed to Cart"
                buttonAction={handleProceedToCart}
              />
            )}
            <Nav product={product} />
            <ImagesDisplay product={product} />
            <div className={styles.contents}>
              <AboutListing product={product} />
              <AddtoCart product={product} handleAddToCart={handleAddToCart} />
            </div>
          </div>
          <BottomFooter />
          <Footer />
        </>
      )}
    </>
  );
}
