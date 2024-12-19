import Image from "next/image";
import styles from "./styles.module.css";
import img1 from "../../../img/img-20240808-wa0024.jpg";
import img2 from "../../../img/img-20240808-wa0023.jpg";
import img3 from "../../../img/img-20240808-wa0025.jpg";
import img4 from "../../../img/img-20240808-wa0026.jpg";
import img5 from "../../../img/img-20240808-wa0028.jpg";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
export default function ImagesDisplay() {
  return (
    <>
      <div className={styles.images}>
        <Image src={img1} alt="Obiku Travels & Tours" className={styles.imgs} />
        <div className={styles.imgCollections}>
          <div>
            <Image
              src={img2}
              alt="Obiku Travels & Tours"
              className={styles.img}
            />
            <Image
              src={img3}
              alt="Obiku Travels & Tours"
              className={styles.img}
            />
          </div>
          <div>
            <Image
              src={img4}
              alt="Obiku Travels & Tours"
              className={styles.img}
            />
            <div className={styles.lastImg}>
              <Image
                src={img5}
                alt="Obiku Travels & Tours"
                className={styles.img}
              />
              <button>
                <InsertPhotoOutlinedIcon style={{ fontSize: "16px" }} />
                See all images
              </button>
              <div className={styles.blackShade}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
