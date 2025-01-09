import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
export default function Card({ title, qty }) {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.number}>{qty}</span>
        <span className={styles.detail}></span>
      </div>
    </div>
  );
}
