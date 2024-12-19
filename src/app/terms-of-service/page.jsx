"use client";
import { useState, useEffect } from "react";
import Header from "@/components/header/page";
import styles from "./styles.module.css";
import Footer from "@/components/footer/page";
import BottomFooter from "@/components/footer_bottom/page";
import Link from "next/link";
import Loader from "@/components/Loader";
export default function Terms() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              position: "fixed",
              width: "100%",
              backgroundColor: "white",
              top: "0px",
              zIndex: "10000",
            }}
          >
            <Header />{" "}
          </div>
          <div className={styles.header}>
            <span>Terms Of Service</span>
          </div>
          <div className={styles.content}>
            <h5>Last Updated: 15/03/2024</h5>
            <p>
              Welcome to Obiku Travels & Tours! a hospitality app/website
              providing a platform for booking hotels, car rentals, boat
              cruises, and short-term apartment rentals. These Terms and
              Conditions ("Terms") govern your use of the Obiku Travels & Tours
              app and website ("Platform").
            </p>
            <p>
              By accessing or using the Platform, you agree to be bound by these
              Terms. Please read them carefully before using our services. If
              you do not agree with these Terms, please do not use Obiku Travels
              & Tours.
            </p>
            <p>
              By accessing or using Obiku Travels & Tours, you acknowledge that
              you have read, understood, and agreed to these Terms and our
              Privacy Policy. If you do not agree with these Terms, please do
              not use our platform.
            </p>
            <ol className={styles.list}>
              <li className={styles.list_sub}>
                Definitions
                <ol
                  type="a"
                  style={{ listStyleType: "lower-alpha", paddingLeft: "20px" }}
                >
                  <li>
                    "Obiku Travels & Tours" refers to the Obiku Travels & Tours
                    app/website and Obiku Travels & Tours LIMITED which is the
                    company operating it.
                  </li>
                  <li>
                    "User," "You," or "Your" refers to anyone who uses the Obiku
                    Travels & Tours Platform.
                  </li>

                  <li>
                    "Service" refers to the various hospitality services offered
                    through the Obiku Travels & Tours Platform, including hotel
                    bookings, car rentals, boat cruises, and short-term
                    apartment rentals.
                  </li>

                  <li>
                    "Host" refers to individuals or businesses that list their
                    properties or services on Obiku Travels & Tours.
                  </li>

                  <li>
                    "Guest" refers to individuals who use Obiku Travels & Tours
                    to book accommodations or services.
                  </li>
                </ol>
              </li>
              <li className={styles.list_sub}>
                Registration and User Account
                <ol type="a">
                  <li>
                    You must create a user account to use the Platform. You
                    agree to provide accurate, complete and up-to-date
                    information during the registration process. It is your
                    responsibility to maintain the confidentiality and security
                    of your account information for all activities associated
                    with your account and to update it when necessary.
                  </li>
                  <li>
                    You are responsible for all activities conducted through
                    your account, and you agree not to share your account
                    information with others. You must notify Obiku Travels &
                    Tours immediately of any unauthorized use of your account.
                  </li>
                </ol>
              </li>
              <li className={styles.list_sub}>
                Services
                <ol
                  style={{ listStyleType: "lower-alpha", paddingLeft: "20px" }}
                >
                  <li>
                    Obiku Travels & Tours facilitates bookings and reservations
                    for various hospitality services, including but not limited
                    to hotels, car rentals, boat cruises, events booking and
                    short-term apartment rentals. Our hospitality services,
                    include:
                    <ol
                      style={{
                        listStyleType: "lower-roman",
                        paddingLeft: "20px",
                      }}
                    >
                      <li>
                        Hotel Reservations: Obiku Travels & Tours allows users
                        to browse, search for, and book hotel accommodations
                        worldwide. We act as an intermediary between users and
                        hotels.
                      </li>

                      <li>
                        Car Rentals: Our platform facilitates the booking of
                        rental cars from various providers. You can rent
                        vehicles for your travel needs.
                      </li>

                      <li>
                        Boat Cruises: Obiku Travels & Tours offers boat cruise
                        bookings for users looking for memorable water-based
                        experiences. We partner with cruise operators to provide
                        these services.
                      </li>

                      <li>
                        Events booking/management: Obiku Travels & Tours acts as
                        an intermediary between users and service providers,
                        facilitating the booking process for various types of
                        events, such as conferences, concerts, festivals, and
                        other special occasions.
                      </li>

                      <li>
                        Short Let Apartments: Users can search and book
                        short-term apartment rentals for stays in various
                        locations, providing a flexible and unique lodging
                        experience.
                      </li>
                    </ol>
                  </li>
                  <li>
                    The availability, quality, and accuracy of listings are the
                    responsibility of the Hosts. Obiku Travels & Tours does not
                    endorse any Hosts or guarantee the accuracy of their
                    listings.
                  </li>
                  <li>
                    When you make a reservation through Obiku Travels & Tours,
                    you will receive a confirmation email or notification with
                    the booking details.
                  </li>
                  <li>
                    By booking a service through Obiku Travels & Tours, you
                    agree to abide by the terms and conditions set by the Host,
                    including payment, cancellation, and any other policies they
                    may have.
                  </li>
                </ol>
              </li>
              <li className={styles.list_sub}>
                Payment and Fees
                <ol style={{ listStyleType: "lower-alpha" }}>
                  <li>
                    Payment for services may be made through the Platform. Obiku
                    Travels & Tours will collect payment on behalf of the Host
                    and remit the funds to them, minus any applicable fees.
                  </li>
                  <li>
                    Payments for bookings are processed through secure payment
                    gateways. You agree to pay all fees, taxes, and additional
                    charges associated with your bookings. The prices listed on
                    our platform are subject to change.
                  </li>

                  <li>
                    Obiku Travels & Tours requires at least a 5% payment as
                    service charge from merchants who utilize its platform.
                  </li>

                  <li>
                    You agree to pay all applicable fees, taxes, and charges
                    associated with your bookings.
                  </li>

                  <li>
                    Obiku Travels & Tours may charge service fees, which will be
                    clearly disclosed before the booking is confirmed.
                  </li>

                  <li> Cancellation and Refunds</li>

                  <li>
                    Cancellation policies are determined by the Host and will be
                    clearly specified in the listing. Each booking may have
                    specific cancellation policies. You are responsible for
                    understanding and adhering to these policies. Any refund
                    requests will be handled in accordance with the relevant
                    provider's policy and our refund policy.
                  </li>

                  <li>
                    Refunds for canceled bookings are subject to the Host's
                    cancellation policy and Obiku Travels & Tours's refund
                    policy.
                  </li>
                </ol>
              </li>
              <li className={styles.list_sub}>
                Privacy
                <ol style={{ listStyleType: "lower-alpha" }}>
                  <li>
                    Obiku Travels & Tours collects and processes personal
                    information in accordance with its Privacy Policy. By using
                    the Platform, you consent to the collection and use of your
                    data as described in the Privacy Policy.
                  </li>

                  <li>
                    Your privacy is important to us. Our Privacy Policy explains
                    how we collect, use, and protect your personal information.
                    By using Obiku Travels & Tours, you consent to our privacy
                    practices.
                  </li>
                </ol>
              </li>
              <li className={styles.list_sub}>
                Google Account Integration
                <ol style={{ listStyleType: "lower-alpha" }}>
                  <li>
                    By signing up or logging in using your Google account, you
                    agree to allow Obiku Travels & Tours to access, use, and
                    store the information associated with your Google account,
                    including but not limited to your profile information, email
                    address, and any other information provided by Google as
                    part of its authentication process.
                  </li>

                  <li>
                    You understand and acknowledge that Obiku Travels & Tours
                    will use this information in accordance with its Privacy
                    Policy. By using your Google account to sign up, you grant
                    Obiku Travels & Tours permission to collect, use, and
                    disclose this information without requiring any additional
                    permissions.
                  </li>

                  <li>
                    Please review our Privacy Policy for more details on how we
                    handle and protect your information.
                  </li>
                </ol>
              </li>
              <li className={styles.list_sub}>
                Intellectual Property
                <ol style={{ listStyleType: "lower-alpha" }}>
                  <li>
                    All content on Obiku Travels & Tours, including but not
                    limited to text, graphics, logos, and software, is protected
                    by intellectual property rights. You agree not to reproduce,
                    distribute, or use our content without prior written
                    consent.
                  </li>
                </ol>
              </li>
              <li className={styles.list_sub}>
                Prohibited Activities
                <p>
                  You agree not to use the Platform for any unlawful,
                  fraudulent, or unauthorized purposes, including but not
                  limited to:
                </p>
                <ol style={{ listStyleType: "lower-alpha" }}>
                  <li>Violating any laws, regulations, or these Terms.</li>

                  <li> Infringing upon intellectual property rights.</li>

                  <li>
                    {" "}
                    Transmitting or uploading viruses, malware, or other harmful
                    software.
                  </li>

                  <li> Harassing, abusing, or impersonating other Users.</li>

                  <li>
                    {" "}
                    Collecting data from the Platform without authorization.
                  </li>
                </ol>
              </li>
              <li className={styles.list_sub}>
                Termination
                <ol style={{ listStyleType: "lower-alpha" }}>
                  <li>
                    Obiku Travels & Tours may suspend or terminate your access
                    to the Platform at its discretion if you violate these Terms
                    or engage in any activities that may harm Obiku Travels &
                    Tours, other Users, or third parties.
                  </li>

                  <li>
                    Obiku Travels & Tours may terminate your access to our
                    platform at our discretion, for any reason, without prior
                    notice. You can also close your account at any time.
                  </li>
                </ol>
              </li>
              <li className={styles.list_sub}>
                Disclaimer and Liability
                <p>
                  Obiku Travels & Tours is not responsible for the quality,
                  safety, or accuracy of listings or services provided by Hosts.
                </p>
                <ol style={{ listStyleType: "lower-alpha" }}>
                  <li>
                    To the extent permitted by law, Obiku Travels & Tours
                    disclaims all liability for any damages, losses, or claims
                    arising from your use of the Platform.
                  </li>

                  <li>
                    Obiku Travels & Tours is not responsible for the quality,
                    safety, or availability of services offered by our partners.
                    You use our platform at your own risk.
                  </li>

                  <li> Changes to Terms </li>

                  <li>
                    Obiku Travels & Tours may update these Terms at any time.
                    Continued use of the Platform after any changes will
                    constitute your acceptance of the revised Terms.
                  </li>
                </ol>
              </li>
              <li className={styles.list_sub}>
                Contact
                <p>
                  If you have any questions or concerns about these Terms,
                  please contact us at{" "}
                  <Link href="mail:support@obikutravelsandtours.com">
                    support@obikutravelsandtours.com
                  </Link>{" "}
                  .
                </p>
              </li>
            </ol>
            <p>
              By using <b>Obiku Travels & Tours</b>, you agree to these Terms
              and Conditions. Please review these Terms regularly to stay
              informed about any updates or changes.
            </p>
          </div>
          <BottomFooter />
          <Footer />
        </>
      )}
    </>
  );
}
