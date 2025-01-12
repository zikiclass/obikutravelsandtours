import styles from "./styles.module.css";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useRouter } from "next/navigation";

// Utility function to format the price with commas
const formatPrice = (price) => {
  return price.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};

// Utility function to get a formatted date (Month Short + Day)
const formatDate = (date) => {
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options); // Adjust locale as needed
};

// Utility function to get tomorrow's date
const getTomorrow = () => {
  const today = new Date(); // Get current date
  today.setDate(today.getDate() + 1); // Set to tomorrow
  return today;
};

export default function AddtoCart({ product, handleAddToCart }) {
  const router = useRouter();

  // Example product data (you can replace this with real data)
  const price = product.price || 0; // Default to 68250 if no price is provided

  // Get today's date for check-in and tomorrow's date for check-out
  const today = new Date(); // Get today's date
  const tomorrow = getTomorrow(); // Get tomorrow's date

  // Format check-in and check-out dates
  const checkInDate = formatDate(today); // Today's date for check-in
  const checkOutDate = formatDate(tomorrow); // Tomorrow's date for check-out

  // Default quantity and occupants
  const quantity = product.quantity || 1;
  const occupants = product.occupants || 1;

  //const { cart, addToCart } = useCart();
  // const handleAddToCart = () => {
  // const productToAdd = {
  //   id: product.id,
  //   title: product.title,
  //   price: product.price,
  //   img: product.mainImage,
  //   quantity: 1,
  // };
  // addToCart(productToAdd);
  // router.push("/itemadded");
  // };
  return (
    <>
      <div className={styles.cartWrap}>
        {/* Price with formatted commas */}
        <span className={styles.amt1}>
          {formatPrice(price)} <small>Daily</small>
        </span>

        <div className={styles.dates}>
          <div className={styles.date_top}>
            {/* Check-in date */}
            <div className={styles.date_top_1}>
              <CalendarMonthOutlinedIcon />
              <div className={styles.check}>
                <small>Check in</small>
                <span>{checkInDate}</span> {/* Today's date */}
              </div>
            </div>

            {/* Check-out date (next day) */}
            <div className={styles.date_top_1}>
              <CalendarMonthOutlinedIcon />
              <div className={styles.check}>
                <small>Check out</small>
                <span>{checkOutDate}</span> {/* Tomorrow's date */}
              </div>
            </div>
          </div>

          <div className={styles.date_bottom}>
            <GroupOutlinedIcon />
            <div className={styles.details}>
              <small>Details</small>
              <span>
                {quantity} Quantity, {occupants} Occupant(s)
              </span>
            </div>
          </div>
        </div>

        <button onClick={handleAddToCart}>Add to cart</button>

        <div className={styles.subtotal}>
          <span>Subtotal:</span>
          <h4>{formatPrice(price * quantity)}</h4> {/* Formatted subtotal */}
        </div>
      </div>
    </>
  );
}
