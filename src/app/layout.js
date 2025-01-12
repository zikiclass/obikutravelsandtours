"use client"; // Add this to mark the component as a Client Component

import { Inter } from "next/font/google";
import RootLayoutWithBackground from "./RootLayoutWithBackground";
import "./globals.css";
import AuthProvider from "./auth/Provider";
import GlobalState from "@/context";
import { useEffect } from "react";
import { WhatsApp } from "@mui/icons-material";
import { metadata } from "./metadata";
import { CartProvider } from "@/context/cartContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    const smartsuppScript = document.createElement("script");
    smartsuppScript.type = "text/javascript";
    smartsuppScript.src = "https://www.smartsuppchat.com/loader.js?";
    smartsuppScript.async = true;
    smartsuppScript.onload = () => {
      window._smartsupp = window._smartsupp || {};
      window._smartsupp.key = "d3f60df74f98eb6f8fd1cac09ccda0a38bfa6277";
    };
    document.head.appendChild(smartsuppScript);

    const whatsappScript = document.createElement("script");
    whatsappScript.type = "text/javascript";
    whatsappScript.src = "https://web.whatsapp.com/s/widget.js";
    whatsappScript.async = true;
    document.head.appendChild(whatsappScript);

    return () => {
      document.head.removeChild(smartsuppScript);
      document.head.removeChild(whatsappScript);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <AuthProvider>
          <GlobalState>
            <CartProvider>
              <RootLayoutWithBackground>{children}</RootLayoutWithBackground>
            </CartProvider>
          </GlobalState>
        </AuthProvider>

        <div id="whatsapp-chat" className="whatsapp-chat">
          <a
            href="https://wa.me/+2349047972021"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp style={{ fontSize: "30px" }} />
          </a>
        </div>
      </body>
    </html>
  );
}
