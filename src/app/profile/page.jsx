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
import { MdArrowForwardIos } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function Profile() {
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
        <div className={styles.sublist}>
          <SubList
            icon={<RiUser3Line size={20} />}
            title="My personal information"
          />
          <SubList icon={<HiOutlineUsers size={20} />} title="Referrals" />
          <SubList icon={<TbCalendarTime size={20} />} title="Bookings" />
          <SubList icon={<GoHeart size={20} />} title="Saved lists" />
          <SubList icon={<LuWallet size={20} />} title="Wallet" />
          <SubList icon={<SlBell size={20} />} title="Notifications" />
          <SubList icon={<LiaComments size={20} />} title="Reviews" />

          <div className={`${styles.list} ${styles.delete}`}>
            <div>
              <RiDeleteBin5Line size={20} />
              <span>Delete Account</span>
            </div>
          </div>
        </div>
      </div>
      <BottomFooter />
      <Footer />
    </>
  );
}
