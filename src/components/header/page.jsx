"use client";
import styles from "./styles.module.css";
import logo from "../../img/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [logged, setLogged] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.isAdmin === false) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);
  // Create a ref for the menu container to check if the click is inside it
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null); // To check if click is on the menu button

  const handleClick = () => {
    // Toggle the menu visibility
    setShowMenu((prevState) => !prevState);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error during NextAuth sign out", error);
    }
  };

  // Close the menu if clicking outside the menu or menu button
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown and the menu button
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setShowMenu(false); // Close the menu
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { cart } = useCart();
  const itemCount = cart.length;
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src={logo} alt="Obiku Travels & Tours" className={styles.logo} />
      </Link>
      {logged ? (
        <div className={styles.wrapper}>
          <div className={styles.wrap}>
            <div onClick={() => router.push("/cart")}>
              <IoCartOutline size={28} />
              {itemCount > 0 && (
                <span className={`${logged && styles.bounce}`}>
                  {itemCount}
                </span>
              )}
            </div>
            <div
              className={styles.menu}
              onClick={handleClick}
              ref={menuButtonRef} // Attach ref to the menu button
            >
              <IoMdMenu size={24} />
              <FaUserCircle size={25} />
            </div>
          </div>
          <div
            ref={menuRef} // Attach ref to the dropdown
            className={styles.dropdown}
            style={{ display: showMenu ? "flex" : "none" }}
          >
            <Link href="/profile" className={styles.link}>
              Manage Profile
            </Link>
            <Link href="/orders" className={styles.link}>
              Orders
            </Link>
            {/* <Link href="#" className={styles.link}>
              Business Dashboard
            </Link> */}
            <p onClick={handleSignOut} className={styles.linkP}>
              Logout
            </p>
          </div>
        </div>
      ) : (
        <Link href="auth" target="_blank" className={styles.btn}>
          Sign In
        </Link>
      )}
    </div>
  );
}
