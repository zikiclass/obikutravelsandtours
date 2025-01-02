import styles from "./styles.module.css";
export default function PersonalInformation() {
  return (
    <div className={styles.personalWrap}>
      <form>
        <h4>Personal Information</h4>
        <div className={styles.row}>
          <div className={styles.col}>
            <label>Full Name</label>
            <input type="text" value="Mark James" name="fullname" />
          </div>
          <div className={styles.col}>
            <label>Email</label>
            <input type="email" value="ezekieledafe5@gmail.com" name="email" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <label>Phone number</label>
            <input type="text" value="+2348160758477" name="phone" />
          </div>
          <div className={styles.col}>
            <label>Date of Birth</label>
            <input type="date" value="07/09/1998" name="dateofbirth" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <label>Emergency Phone</label>
            <input type="text" value="" name="emergency_phone" />
          </div>
          <div className={styles.col}>
            <label>Emergency Email</label>
            <input type="email" value="" name="emergency_email" />
          </div>
        </div>
        <button>Save changes</button>
      </form>
      <form>
        <h4>Change Password</h4>
        <div className={styles.row}>
          <div className={styles.col}>
            <label>Old Password</label>
            <input type="password" value="**********" name="password" />
          </div>
          <div className={styles.col}>
            <label>New Password</label>
            <input type="password" value="**********" name="new_password" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <label>Confirm New Password</label>
            <input
              type="password"
              value="************"
              name="confirm_password"
            />
          </div>
        </div>

        <button>Save changes</button>
      </form>
    </div>
  );
}
