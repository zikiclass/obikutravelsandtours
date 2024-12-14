"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
export default function BottomFooter() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.icon}>
          <CampaignOutlinedIcon style={{ fontSize: "17px" }} />
        </div>
        <span>Start getting reservations.</span>
        <Link href="#" className={styles.link}>
          Become a host <EastOutlinedIcon />
        </Link>
      </div>
    </>
  );
}
