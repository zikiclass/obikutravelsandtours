import styles from "./styles.module.css";
import img1 from "../../../img/img-20240201-wa0051.jpg";
import map from "../../../img/map.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import GppGoodIcon from "@mui/icons-material/GppGood";
import Image from "next/image";
import Link from "next/link";
export default function AboutListing() {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.identity}>
          <Image
            src={img1}
            alt="Obiku Travels & Tours"
            className={styles.listImg}
          />
          <div className={styles.identity__}>
            <h4>
              Listed by <Link href="#">Rent Ng</Link>
            </h4>
            <StarRoundedIcon style={{ fontSize: "14px" }} /> <span>New</span>
            <GppGoodIcon style={{ fontSize: "14px" }} />{" "}
            <span> Identity Verified</span>
          </div>
        </div>
        <div className={styles.listingDescription}>
          <h4>Listing Description</h4>
          <p>The fine art of living!!</p>
          <p>
            Enjoy a relaxing stay in our beautiful 1 bedroom apartment in
            Chevron, Lekki. Tastefully furnished to suit your needs and comfort
            style in a serene environment.
          </p>
          <ul>
            <li>Its features include:</li>

            <li>Gated and secured estate</li>

            <li>24 hours electricity</li>

            <li>House keeping</li>
          </ul>
          <ul>
            <li>Jacuzzi</li>

            <li>Super fast wifi</li>

            <li>Ample Parking Space</li>

            <li>Fully equipped kitchen.</li>
          </ul>
          <button>Read More</button>
        </div>
        <div className={styles.listingOffers}>
          <h4>What this listing offers</h4>
          <div>
            <span>Spa</span>
          </div>
        </div>
        <div className={styles.landMark}>
          <h4>Landmark</h4>
          <Image src={map} alt="Obiku Travels & Tours" />
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#595959"
                fill-rule="evenodd"
                d="M3.25 10.143C3.25 5.244 7.155 1.25 12 1.25c4.845 0 8.75 3.994 8.75 8.893c0 2.365-.674 4.905-1.866 7.099c-1.19 2.191-2.928 4.095-5.103 5.112a4.2 4.2 0 0 1-3.562 0c-2.175-1.017-3.913-2.92-5.103-5.112c-1.192-2.194-1.866-4.734-1.866-7.099M12 2.75c-3.992 0-7.25 3.297-7.25 7.393c0 2.097.603 4.392 1.684 6.383c1.082 1.993 2.612 3.624 4.42 4.469a2.7 2.7 0 0 0 2.291 0c1.809-.845 3.339-2.476 4.421-4.469c1.081-1.99 1.684-4.286 1.684-6.383c0-4.096-3.258-7.393-7.25-7.393m0 5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5M8.25 10a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0"
                clip-rule="evenodd"
              ></path>
            </svg>{" "}
            <span>Lekki/Ikate And Environs, Lagos</span>
          </div>
        </div>
      </div>
    </>
  );
}
