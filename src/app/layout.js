// app/layout.js
import { Inter } from "next/font/google";
import RootLayoutWithBackground from "./RootLayoutWithBackground"; // Import your client-side component
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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <RootLayoutWithBackground>{children}</RootLayoutWithBackground>
      </body>
    </html>
  );
}
