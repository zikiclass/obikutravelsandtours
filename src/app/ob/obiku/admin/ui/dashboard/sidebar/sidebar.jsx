import Image from "next/image";
import MenuLink from "./menuLink/menuLink"; // Make sure MenuLink is correctly exported from its file
import styles from "./sidebar.module.css";
import { signOut } from "next-auth/react";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { FaHotel, FaCar, FaBusAlt, FaBriefcase } from "react-icons/fa";
import { BsHousesFill } from "react-icons/bs";
import { PiAirplaneInFlightDuotone } from "react-icons/pi";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/ob/obiku/admin/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/ob/obiku/admin/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Admin",
        path: "/ob/obiku/admin/dashboard/admin",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Transactions",
        path: "/ob/obiku/admin/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
      {
        title: "Products",
        path: "/ob/obiku/admin/dashboard/hotels",
        icon: <FaHotel />,
      },
    ],
  },

  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/ob/obiku/admin/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/ob/obiku/admin/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/ob/obiku/admin/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/ob/obiku/admin/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/ob/obiku/admin/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

export default function Sidebar() {
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/ob/obiku/admin/signin" });
    } catch (error) {
      console.error("Error during NextAuth sign out", error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          src="/logo.png"
          alt="Obiku Travels & Tours"
          width="50"
          height="50"
          className={styles.userImage}
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>Obiku Travels</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout} onClick={handleSignOut}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
}
