import { Inter } from "next/font/google";
import RootLayoutWithBackground from "./RootLayoutWithBackground"; // Import your client-side component
import "./globals.css";
import AuthProvider from "./auth/Provider";
import GlobalState from "@/context";
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
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <AuthProvider>
          <GlobalState>
            <RootLayoutWithBackground>{children}</RootLayoutWithBackground>
          </GlobalState>
        </AuthProvider>
      </body>
    </html>
  );
}
