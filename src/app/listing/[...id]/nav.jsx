import styles from "./styles.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
export default function Nav() {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.arrow}>
            <ArrowBackIosIcon style={{ fontSize: "17px" }} />
          </div>
          <span>One bedroom apartment</span>
        </div>
        <div className={styles.right}>
          <div>
            <StarRoundedIcon style={{ fontSize: "17px" }} />
            <span>New</span>
          </div>
          <div className={styles.dot}>
            <CircleRoundedIcon style={{ fontSize: "7px" }} />
            <span>0 reviews</span>
          </div>
          <div className={styles.dot}>
            <CircleRoundedIcon style={{ fontSize: "7px" }} />
            <span>Lekki, NG</span>
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
