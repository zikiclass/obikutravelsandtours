import styles from "./styles.module.css";
import { MdArrowForwardIos } from "react-icons/md";
export default function SubList({ icon, title, onClick }) {
  return (
    <div className={styles.list} onClick={onClick}>
      <div>
        {icon}
        <span>{title}</span>
      </div>
      <MdArrowForwardIos />
    </div>
  );
}
