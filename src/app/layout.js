import RootLayoutWithBackground from "./RootLayoutWithBackground"; // Import the client component

export const metadata = {
  title: "Obiku Travels & Tours",
  description:
    "Obiku Travels & Tours, Obiku Hotel Reservations, Obiku Car Rental, Obiku Cruises, Obiku Short-lets, Flight Tickets, Events",
};

export default function RootLayout({ children }) {
  return <RootLayoutWithBackground>{children}</RootLayoutWithBackground>;
}
