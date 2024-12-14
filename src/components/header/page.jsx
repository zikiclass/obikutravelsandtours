"use client";
import styles from "./styles.module.css";
import logo from "../../img/logo.png";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src={logo} alt="Obiku Travels & Tours" className={styles.logo} />
      </Link>
      <Link href="/signin" className={styles.btn}>
        Sign In
      </Link>
    </div>
  );
}