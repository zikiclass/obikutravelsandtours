import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Obiku Travels & Tours",
  description:
    "Obiku Travels & Tours, Obiku Hotel Reservations, Obiku Car Rental, Obiku Cruises, Obiku Short-lets, Flight Tickets, Events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
