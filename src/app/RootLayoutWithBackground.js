"use client";

import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayoutWithBackground({ children }) {
  const pathname = usePathname();

  const bodyClass = pathname.startsWith("/ob/obiku/admin/dashboard")
    ? "dashboard"
    : "";

  return (
    <html lang="en">
      <body className={`${inter.className} ${bodyClass}`}>{children}</body>
    </html>
  );
}
