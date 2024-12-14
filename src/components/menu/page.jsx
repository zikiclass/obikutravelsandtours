"use client";
import styles from "./styles.module.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SailingIcon from "@mui/icons-material/Sailing";
import CastleIcon from "@mui/icons-material/Castle";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
export default function Menu({ active }) {
  const isSmallScreen = useMediaQuery("(max-width:750px)");
  return (
    <>
      <div className={styles.container}>
        <Link
          className={`${styles.menu} ${active === "top" && styles.active}`}
          href="/"
        >
          <AutoAwesomeIcon
            style={{ fontSize: isSmallScreen ? "13px" : "24px" }}
          />

          <span>Top Picks</span>
        </Link>
        <Link
          className={`${styles.menu} ${active === "hotels" && styles.active}`}
          href="hotels"
        >
          <CastleIcon style={{ fontSize: isSmallScreen ? "13px" : "24px" }} />

          <span>Hotels</span>
        </Link>
        <Link
          className={`${styles.menu} ${active === "car" && styles.active}`}
          href="car"
        >
          <DirectionsCarIcon
            style={{ fontSize: isSmallScreen ? "13px" : "24px" }}
          />

          <span>Car Rental</span>
        </Link>
        <Link
          className={`${styles.menu} ${active === "cruise" && styles.active}`}
          href="cruises"
        >
          <SailingIcon style={{ fontSize: isSmallScreen ? "13px" : "24px" }} />

          <span>Cruises</span>
        </Link>
        <Link
          className={`${styles.menu} ${active === "short" && styles.active}`}
          href="shortlets"
        >
          <HomeWorkIcon style={{ fontSize: isSmallScreen ? "13px" : "24px" }} />

          <span>Short-lets</span>
        </Link>
        <Link
          className={`${styles.menu} ${active === "event" && styles.active}`}
          href="events"
        >
          <BusinessCenterIcon
            style={{ fontSize: isSmallScreen ? "13px" : "24px" }}
          />

          <span>Events</span>
        </Link>
        <Link
          className={`${styles.menu} ${active === "flight" && styles.active}`}
          href="flight"
        >
          <FlightTakeoffRoundedIcon
            style={{ fontSize: isSmallScreen ? "13px" : "24px" }}
          />

          <span>Flight Tickets</span>
        </Link>
      </div>
    </>
  );
}