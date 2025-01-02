"use client";
import { useState } from "react";
import Footer from "@/components/footer/page";
import BottomFooter from "@/components/footer_bottom/page";
import Header from "@/components/header/page";
import styles from "./styles.module.css";
import { FaUserCircle } from "react-icons/fa";
import SubList from "./sublist";
import { RiUser3Line } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { TbCalendarTime } from "react-icons/tb";
import { GoHeart } from "react-icons/go";
import { LuWallet } from "react-icons/lu";
import { SlBell } from "react-icons/sl";
import { LiaComments } from "react-icons/lia";
import { MdArrowBackIos } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import PersonalInformation from "./personalInformation";
import Referral from "./referral";
import Bookings from "./bookings";
import SavedLists from "./savedLists";
import Notifications from "./notifications";
import Reviews from "./reviews";

export default function Profile() {
  const [showDialog, setShowDialog] = useState("");
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.profile}>
          <div>
            <FaUserCircle size={50} />
          </div>
          <div>
            <span>Mark James</span>
            <span>@markjame53</span>
          </div>
        </div>
        <div
          className={styles.sublist}
          style={{ display: showDialog === "" ? "flex" : "none" }}
        >
          <SubList
            icon={<RiUser3Line size={20} />}
            title="My personal information"
            onClick={() => setShowDialog("personal")}
          />
          <SubList
            icon={<HiOutlineUsers size={20} />}
            title="Referrals"
            onClick={() => setShowDialog("referral")}
          />
          <SubList
            icon={<TbCalendarTime size={20} />}
            title="Bookings"
            onClick={() => setShowDialog("bookings")}
          />
          <SubList
            icon={<GoHeart size={20} />}
            title="Saved lists"
            onClick={() => setShowDialog("savedlists")}
          />
          <SubList
            icon={<LuWallet size={20} />}
            title="Wallet"
            onClick={() => setShowDialog("wallet")}
          />
          <SubList
            icon={<SlBell size={20} />}
            title="Notifications"
            onClick={() => setShowDialog("notifications")}
          />
          <SubList
            icon={<LiaComments size={20} />}
            title="Reviews"
            onClick={() => setShowDialog("reviews")}
          />

          <div className={`${styles.list} ${styles.delete}`}>
            <div>
              <RiDeleteBin5Line size={20} />
              <span>Delete Account</span>
            </div>
          </div>
        </div>
        <div
          className={styles.dialog}
          style={{ display: showDialog === "" ? "none" : "block" }}
        >
          <span onClick={() => setShowDialog("")}>
            <MdArrowBackIos />
          </span>

          <div style={{ display: showDialog === "personal" ? "flex" : "none" }}>
            <PersonalInformation />
          </div>
          <div style={{ display: showDialog === "referral" ? "flex" : "none" }}>
            <Referral />
          </div>
          <div style={{ display: showDialog === "bookings" ? "flex" : "none" }}>
            <Bookings />
          </div>
          <div
            style={{ display: showDialog === "savedlists" ? "flex" : "none" }}
          >
            <SavedLists />
          </div>
          <div
            style={{
              display: showDialog === "notifications" ? "flex" : "none",
            }}
          >
            <Notifications />
          </div>
          <div style={{ display: showDialog === "reviews" ? "flex" : "none" }}>
            <Reviews />
          </div>
        </div>
      </div>
      <BottomFooter />
      <Footer />
    </>
  );
}
