import styles from "./styles.module.css";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker"; // Import the DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the date picker

// Utility function to format the price with commas
const formatPrice = (price) => {
  return price.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};

// Format date as "Jan 13"
const formatShortDate = (date) => {
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options); // Jan 13
};

// Default number of occupants and quantity
const DEFAULT_QUANTITY = 1;
const DEFAULT_OCCUPANTS = 1;

export default function AddtoCart({ product, handleAddToCart }) {
  // State for check-in and check-out dates
  const [checkInDate, setCheckInDate] = useState(new Date()); // Default to today's date
  const [checkOutDate, setCheckOutDate] = useState(new Date()); // Default to today's date

  // Set the default check-out date to be tomorrow
  useEffect(() => {
    const tomorrow = new Date(checkInDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCheckOutDate(tomorrow);
  }, [checkInDate]); // Update check-out date when check-in date changes

  // Price and quantity from the product
  const price = product.price || 0;
  const quantity = product.quantity || DEFAULT_QUANTITY;
  const occupants = product.occupants || DEFAULT_OCCUPANTS;

  // Handle change of check-in date
  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    // Ensure check-out date is after the check-in date
    if (checkOutDate <= date) {
      const newCheckOutDate = new Date(date);
      newCheckOutDate.setDate(newCheckOutDate.getDate() + 1);
      setCheckOutDate(newCheckOutDate);
    }
  };

  // Handle change of check-out date
  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  return (
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
              {/* Date Picker for Check-in */}
              <DatePicker
                selected={checkInDate}
                onChange={handleCheckInChange}
                minDate={new Date()} // Don't allow selecting past dates
                dateFormat="MMM dd, yyyy" // Display format for the date
                className={styles.dateInput} // Custom styles for the input
              />
            </div>
          </div>

          {/* Check-out date */}
          <div className={styles.date_top_1}>
            <CalendarMonthOutlinedIcon />
            <div className={styles.check}>
              <small>Check out</small>
              {/* Date Picker for Check-out */}
              <DatePicker
                selected={checkOutDate}
                onChange={handleCheckOutChange}
                minDate={checkInDate} // Don't allow selecting check-out before check-in
                dateFormat="MMM dd, yyyy"
                className={styles.dateInput}
              />
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

      {/* Show formatted Check-in and Check-out Date */}
      <div className={styles.dateRange}>
        <small>Selected Dates:</small>
        <span>
          {formatShortDate(checkInDate)} to {formatShortDate(checkOutDate)}
        </span>
      </div>

      <button onClick={handleAddToCart}>Add to cart</button>

      <div className={styles.subtotal}>
        <span>Subtotal:</span>
        <h4>{formatPrice(price * quantity)}</h4> {/* Formatted subtotal */}
      </div>
    </div>
  );
}
