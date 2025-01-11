// components/item/page.js
import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useRouter } from "next/navigation";

export default function Item({ product }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product.productImages.map((image) => image.imageUrl);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const isLeftArrowVisible = currentIndex > 0;

  // Format numbers as currency with commas for thousands and period for decimals
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // If product.features is an object, convert it into a readable string
  const features =
    product.features && typeof product.features === "object"
      ? Object.keys(product.features)
          .filter((key) => product.features[key]) // Only include true values
          .map((key) => key.charAt(0).toUpperCase() + key.slice(1)) // Capitalize first letter
          .join(", ") // Join features into a string
      : product.features || ""; // Fallback if features is not an object

  return (
    <div className={styles.wrapper}>
      <div className={styles.carousel}>
        <div
          className={styles.imagesWrapper}
          onClick={() => router.push(`listing/${product.id}`)}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className={styles.item}>
              <Image
                src={img}
                alt={`Product ${index + 1}`}
                layout="intrinsic"
                width={500}
                height={300}
                className={styles.imgSlider}
              />
            </div>
          ))}
        </div>

        <div
          className={`${styles.navigation} ${
            !isLeftArrowVisible ? styles.shiftRight : ""
          }`}
        >
          {isLeftArrowVisible && (
            <ArrowBackIosIcon
              onClick={prevImage}
              className={styles.prevImage}
            />
          )}

          {currentIndex < images.length - 1 && (
            <ArrowForwardIosIcon
              onClick={nextImage}
              className={styles.nextImage}
            />
          )}
        </div>

        <div className={styles.TopNote}>
          <span>{features}</span> {/* Render the formatted features */}
        </div>

        <div className={styles.shortCut}>
          <FavoriteBorderRoundedIcon />
        </div>

        <div className={styles.dots}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${
                currentIndex === index ? styles.activeDot : ""
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <span>{product.title}</span>
        </div>
        <div className={styles.body}>
          <div className={styles.faint}>
            <span>{product.location}</span>
            <span>{product.listedby}</span>
          </div>
          <div className={styles.dark}>
            Daily ₦ {formatPrice(product.price)}{" "}
            <small>₦ {formatPrice(product.price * 1.05)}</small>{" "}
            {/* Example price with discount */}
          </div>
        </div>
      </div>
    </div>
  );
}
