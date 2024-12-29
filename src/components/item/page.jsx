import { useState } from "react";
import styles from "./styles.module.css";
import img1 from "../../img/img-20240723-wa0028.jpg";
import img2 from "../../img/img-20240807-wa0054.jpg";
import img3 from "../../img/img-20240726-wa0205.jpg";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useRouter } from "next/navigation";
const images = [img1, img2, img3];

export default function Item() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.carousel}>
        <div
          className={styles.imagesWrapper}
          onClick={() => router.push("listing/23")}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className={styles.item}>
              <Image
                src={img}
                alt={`Obiku Travels & Tours - Image ${index + 1}`}
                layout="intrinsic"
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
          {/* Conditionally render left arrow */}
          {isLeftArrowVisible && (
            <ArrowBackIosIcon
              onClick={prevImage}
              className={styles.prevImage}
            />
          )}

          {/* Always show the right arrow */}
          {currentIndex < images.length - 1 && (
            <ArrowForwardIosIcon
              onClick={nextImage}
              className={styles.nextImage}
            />
          )}
        </div>

        <div className={styles.TopNote}>
          <span>Free Wifi + 6 more</span>
        </div>
        <div className={styles.shortCut}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              class="block group-active:scale-[85%] fill-transparent h-[16px] w-[16px] stroke-[#111] !stroke-[2px] overflow-visible transition-all duration-150 false"
            >
              <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
            </svg>
          </div>
          <div>
            <svg
              class="block group-active:scale-[85%] fill-transparent h-[16px] w-[16px] stroke-[#111] d!stroke-[2px] overflow-visible transition-all duration-150"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M240 88.23a54.43 54.43 0 0 1-16 37L189.25 160a54.27 54.27 0 0 1-38.63 16h-.05A54.63 54.63 0 0 1 96 119.84a8 8 0 0 1 16 .45A38.62 38.62 0 0 0 150.58 160a38.4 38.4 0 0 0 27.31-11.31l34.75-34.75a38.63 38.63 0 0 0-54.63-54.63l-11 11A8 8 0 0 1 135.7 59l11-11a54.65 54.65 0 0 1 77.3 0a54.86 54.86 0 0 1 16 40.23m-131 97.43l-11 11A38.4 38.4 0 0 1 70.6 208a38.63 38.63 0 0 1-27.29-65.94L78 107.31a38.63 38.63 0 0 1 66 28.4a8 8 0 0 0 16 .45A54.86 54.86 0 0 0 144 96a54.65 54.65 0 0 0-77.27 0L32 130.75A54.62 54.62 0 0 0 70.56 224a54.28 54.28 0 0 0 38.64-16l11-11a8 8 0 0 0-11.2-11.34"
              ></path>
            </svg>
          </div>
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
          <span>Deluxe Room</span>
          <span className={styles.new}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#f59e0b"
              class="w-3 fill-amber-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              ></path>
            </svg>
            <span>New</span>
          </span>
        </div>
        <div className={styles.body}>
          <div className={styles.faint}>
            <span>Ibusa III, Delta</span>
            <span>Hotel by BON Hotel Asaba</span>
          </div>
          <div className={styles.dark}>
            Daily ₦ 204,338.75 <small>₦ 211,750.00</small>
          </div>
        </div>
      </div>
    </div>
  );
}
