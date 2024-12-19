import styles from "./styles.module.css";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useRouter } from "next/navigation";
export default function AddtoCart() {
  const router = useRouter();
  return (
    <>
      <div className={styles.cartWrap}>
        <span className={styles.amt1}>
          &#8358; 68,250.00 <small>Daily</small>
        </span>
        <div className={styles.dates}>
          <div className={styles.date_top}>
            <div className={styles.date_top_1}>
              <CalendarMonthOutlinedIcon />
              <div className={styles.check}>
                <small>Check in</small>
                <span>Dec 19</span>
              </div>
            </div>
            <div className={styles.date_top_1}>
              <CalendarMonthOutlinedIcon />
              <div className={styles.check}>
                <small>Check out</small>
                <span>Dec 20</span>
              </div>
            </div>
          </div>
          <div className={styles.date_bottom}>
            <GroupOutlinedIcon />
            <div className={styles.details}>
              <small>Details</small>
              <span>1 Quantity, 1 Occupant(s)</span>
            </div>
          </div>
        </div>
        <button onClick={() => router.push("/auth")}>Add to cart</button>
        <div className={styles.subtotal}>
          <span>Subtotal:</span>

          <h4>&#8358; 68,250.00</h4>
        </div>
      </div>
    </>
  );
}
