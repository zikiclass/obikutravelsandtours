"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { LuClipboardCopy } from "react-icons/lu";
export default function Referral() {
  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  return (
    <div className={styles.referral}>
      <div className={styles.row}>
        <div>
          <h4>Current Level: Level 1</h4>
          <span className={styles.progressbar}></span>
          <label>
            Current spending: <b>₦ 0.00</b>
          </label>
        </div>
      </div>
      <div className={styles.row}>
        <div>
          <h4>Referral Levels</h4>
          <div
            className={styles.currentLevel}
            onClick={() => {
              setShowContent1(!showContent1);
              setShowContent2(false);
            }}
          >
            <div>
              <label>Level 1</label>
              <span>Current</span>
            </div>
            <div className={styles.bonus}>
              <label>1.00% bonus</label>
              {showContent1 ? (
                <MdOutlineKeyboardArrowUp size={20} />
              ) : (
                <MdOutlineKeyboardArrowDown size={20} />
              )}
            </div>
          </div>
          <div
            className={styles.Content}
            style={{ display: showContent1 ? "block" : "none" }}
          >
            <h5>Referral Bonus:</h5>
            <p>
              Earn a 1.00% bonus on every purchase made by someone you refer.
            </p>
            <h5>Spending Requirements:</h5>
            <p>
              To qualify for the referral bonus, you the referrer must have
              spent between <b>₦ 0.00</b> and <b>₦ 500,000.00</b>.
            </p>
          </div>
          <div
            className={styles.level2}
            onClick={() => {
              setShowContent2(!showContent2);
              setShowContent1(false);
            }}
          >
            <div>
              <label>Level 2</label>
            </div>
            <div className={styles.bonus}>
              <label>1.50% bonus</label>
              {showContent2 ? (
                <MdOutlineKeyboardArrowUp size={20} />
              ) : (
                <MdOutlineKeyboardArrowDown size={20} />
              )}
            </div>
          </div>
          <div
            className={styles.Content}
            style={{ display: showContent2 ? "block" : "none" }}
          >
            <h5>Referral Bonus:</h5>
            <p>
              Earn a 1.50% bonus on every purchase made by someone you refer.
            </p>
            <h5>Spending Requirements:</h5>
            <p>
              To qualify for the referral bonus, you the referrer must have
              spent between <b>₦ 500,000.00</b> and <b>∞</b>.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <h4>Your Referral Link</h4>
          <div className={styles.ref}>
            <input
              type="text"
              readOnly
              value="https://www.obikutravelsandtours.com/auth?ref=MARKJAME53"
              name="referral"
            />
            <div className={styles.copy}>
              <LuClipboardCopy size={20} style={{ color: "white" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
