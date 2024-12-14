import Item from "../item/skeletonItem";
import styles from "./styles.module.css";
export default function Loading() {
  return (
    <div className={styles.container}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
}
