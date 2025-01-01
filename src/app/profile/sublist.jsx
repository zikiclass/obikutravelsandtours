import styles from "./styles.module.css";
import { MdArrowForwardIos } from "react-icons/md";
export default function SubList({ icon, title }) {
  return (
    <div className={styles.list}>
      <div>
        {icon}
        <span>{title}</span>
      </div>
      <MdArrowForwardIos />
    </div>
  );
}
