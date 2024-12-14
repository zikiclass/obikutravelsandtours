import styles from "./styles.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const images = [1, 2, 3];

export default function Item() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.carousel}>
        <div className={styles.imagesWrapper}>
          {images.map((img, index) => (
            <div key={index} className={styles.item}>
              <Skeleton height={250} width={330} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <span>
            <Skeleton width={120} />
          </span>
          <span className={styles.new}>
            <span>
              <Skeleton width={50} />
            </span>
          </span>
        </div>
        <div className={styles.body}>
          <div className={styles.faint}>
            <span>
              <Skeleton />
            </span>
            <span>
              <Skeleton />
            </span>
          </div>
          <div className={styles.dark}>
            <Skeleton />{" "}
            <small>
              <Skeleton />
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
