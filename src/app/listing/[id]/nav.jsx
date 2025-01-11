import styles from "./styles.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
export default function Nav({ product }) {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <span>{product.title}</span>
        </div>
        <div className={styles.right}>
          <div>
            <StarRoundedIcon style={{ fontSize: "17px" }} />
            <span>New</span>
          </div>
          <div className={styles.dot}>
            <CircleRoundedIcon style={{ fontSize: "7px" }} />
            <span>{product.reviews} reviews</span>
          </div>
          <div className={styles.dot}>
            <CircleRoundedIcon style={{ fontSize: "7px" }} />
            <span>{product.location}</span>
          </div>
          <div className={styles.heart}>
            <FavoriteBorderRoundedIcon
              style={{ fontSize: "16px", color: "#444" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
