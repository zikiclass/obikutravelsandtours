import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet"; // For custom marker icons
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import axios from "axios";
import styles from "./styles.module.css";
import img1 from "../../../img/img-20240201-wa0051.jpg";
import map from "../../../img/map.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import GppGoodIcon from "@mui/icons-material/GppGood";
import Image from "next/image";
import Link from "next/link";

// Define custom icon for Leaflet marker (optional)
const markerIcon = new Icon({
  iconUrl: "/path-to-your-icon.png", // Custom marker icon (if needed)
  iconSize: [30, 30], // Size of the icon
  iconAnchor: [15, 30], // Position of the icon
  popupAnchor: [0, -30], // Popup position
});

// Geocoding with Nominatim (OpenStreetMap)
const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${address}&limit=1`
    );
    const location = response.data[0]; // First result
    if (location) {
      return { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
    } else {
      console.error("No geocoding results found for the address.");
      return null;
    }
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
};

export default function AboutListing({ product }) {
  const features = product.features || {};

  // Create an array of feature names that are true
  const activeFeatures = Object.entries(features)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (product.location) {
        const coordinates = await geocodeAddress(product.location);
        if (coordinates) {
          setLocation(coordinates); // Set the location if geocoding is successful
        }
      }
    };

    fetchLocation();
  }, [product.location]);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.identity}>
          <Image
            src={product.mainImage}
            width={60}
            height={60}
            alt="Obiku Travels & Tours"
            className={styles.listImg}
          />
          <div className={styles.identity__}>
            <h4>
              Listed by <Link href="#">{product.listedby}</Link>
            </h4>
            <StarRoundedIcon style={{ fontSize: "14px" }} /> <span>New</span>
            <GppGoodIcon style={{ fontSize: "14px" }} />{" "}
            <span> Identity Verified</span>
          </div>
        </div>
        <div className={styles.listingDescription}>
          <h4>Listing Description</h4>
          <p>{product.desc}</p>
        </div>
        <div className={styles.listingOffers}>
          <h4>What this listing offers</h4>
          <div className={styles.featuresSpan}>
            {activeFeatures.length > 0 ? (
              activeFeatures.map((feature, index) => (
                <div key={index}>
                  <span>
                    <GppGoodIcon style={{ fontSize: "12px" }} />{" "}
                    {feature.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </span>
                </div>
              ))
            ) : (
              <div>No features available</div>
            )}
          </div>
        </div>

        <div className={styles.landMark}>
          <h4>Landmark</h4>

          {/* Show map if location is available */}
          {location ? (
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={14}
              style={{ width: "100%", height: "300px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker
                position={[location.lat, location.lng]}
                icon={markerIcon} // Optional: Custom marker icon
              >
                <Popup>
                  Location: {location.lat}, {location.lng}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <Image src={map} alt="Obiku Travels & Tours" />
          )}

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#595959"
                fillRule="evenodd"
                d="M3.25 10.143C3.25 5.244 7.155 1.25 12 1.25c4.845 0 8.75 3.994 8.75 8.893c0 2.365-.674 4.905-1.866 7.099c-1.19 2.191-2.928 4.095-5.103 5.112a4.2 4.2 0 0 1-3.562 0c-2.175-1.017-3.913-2.92-5.103-5.112c-1.192-2.194-1.866-4.734-1.866-7.099M12 2.75c-3.992 0-7.25 3.297-7.25 7.393c0 2.097.603 4.392 1.684 6.383c1.082 1.993 2.612 3.624 4.42 4.469a2.7 2.7 0 0 0 2.291 0c1.809-.845 3.339-2.476 4.421-4.469c1.081-1.99 1.684-4.286 1.684-6.383c0-4.096-3.258-7.393-7.25-7.393m0 5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5"
                clipRule="evenodd"
              ></path>
            </svg>{" "}
            <span>{product.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}
