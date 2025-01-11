import Image from "next/image";
import styles from "./styles.module.css";
import img1 from "../../../img/img-20240808-wa0024.jpg";
import img2 from "../../../img/img-20240808-wa0023.jpg";
import img3 from "../../../img/img-20240808-wa0025.jpg";
import img4 from "../../../img/img-20240808-wa0026.jpg";
import img5 from "../../../img/img-20240808-wa0028.jpg";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
export default function ImagesDisplay({ product }) {
  const images = product.productImages.map((img) => img.imageUrl);
  return (
    <>
      <div className={styles.images}>
        <Image
          src={product.mainImage}
          width={100}
          height={80}
          alt="Obiku Travels & Tours"
          className={styles.imgs}
        />
        <div className={styles.imgCollections}>
          {images.map((img, index) => (
            <div key={index}>
              <Image
                src={img}
                alt={`Product Image ${index + 2}`}
                layout="intrinsic"
                width={200}
                height={200}
                className={styles.img}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
