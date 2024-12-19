"use client";
import { useState, useEffect } from "react";
import Header from "@/components/header/page";
import styles from "../terms-of-service/styles.module.css";
import Footer from "@/components/footer/page";
import BottomFooter from "@/components/footer_bottom/page";
import Link from "next/link";
import Loader from "@/components/Loader";
export default function Privacy() {
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
            <Header />
          </div>
          <div className={styles.header}>
            <span>Privacy Policy</span>
          </div>
          <div className={styles.content}>
            <h5>Last Updated: 18th June, 2024</h5>

            <ol className={styles.list}>
              <li className={styles.list_sub}>
                Introduction
                <p>
                  Welcome to Obiku Travels & Tours! We are committed to
                  protecting your privacy and ensuring the security of your
                  personal information. This Privacy Policy outlines how we
                  collect, use, store, and share your information when you use
                  our platform. By using Obiku Travels & Tours, you agree to the
                  practices described in this Privacy Policy.
                </p>
              </li>
              <li className={styles.list_sub}>
                Information We Collect
                <p>
                  We collect the following personal information when you use our
                  platform:
                </p>
                <ul style={{ listStyleType: "disc" }}>
                  <li>
                    <b>Name:</b> Used for profile display and personalization.
                  </li>

                  <li>
                    <b>Email Address:</b> Used for sign-in, notifications, and
                    account verification.
                  </li>

                  <li>
                    <b>Phone Number:</b> Used for sign-in, notifications, and
                    account verification.
                  </li>

                  <li>
                    <b>Date of Birth:</b> Used to verify age eligibility (users
                    must be 18 or older).
                  </li>
                </ul>
              </li>
              <li className={styles.list_sub}>
                How We Use Your Information
                <p>
                  Your personal information is used to enhance your experience
                  on Obiku Travels & Tours. Specifically, we use your
                  information to:
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                    <b>Sign-Up and Sign-In:</b> Use Google OAuth to simplify the
                    registration and login process.
                  </li>

                  <li>
                    <b>Profile Completion:</b> Populate your profile with your
                    name, email, and phone number.
                  </li>

                  <li>
                    <b>Communication:</b> Send notifications about reservations
                    and important updates.
                  </li>

                  <li>
                    <b>Verification:</b> Verify your identity and age to ensure
                    compliance with our age restriction policy (18+).
                  </li>
                </ul>
              </li>
              <li className={styles.list_sub}>
                Sharing Your Information
                <p>
                  We do not share your personal information with third parties,
                  except in the following situations:
                </p>
                <ul style={{ listStyleType: "disc" }}>
                  <li>
                    <b>Merchant View:</b> Your name, email, and phone number are
                    shared with merchants to facilitate communication and
                    reservation verification.
                  </li>

                  <li>
                    <b>Legal Compliance:</b> If required by law or in response
                    to a valid request from a law enforcement authority.
                  </li>
                </ul>
              </li>
              <li className={styles.list_sub}>
                Data Security
                <p>
                  We prioritize the security of your personal information. We
                  implement appropriate technical and organizational measures to
                  protect your data from unauthorized access, alteration,
                  disclosure, or destruction.
                </p>
              </li>
              <li className={styles.list_sub}>
                In-Product Privacy Notifications
                <p>
                  We ensure that privacy notifications are prominently displayed
                  within our app interface, making it easy for users to find and
                  understand how their data is used.
                </p>
              </li>
              <li className={styles.list_sub}>
                Google API Services
                <p>
                  Our use of Google user data complies with Google&apos;s
                  Limited Use Requirements:
                </p>
                <ul style={{ listStyleType: "disc" }}>
                  <li>
                    <b>Appropriate Access:</b> We only request access to the
                    scopes necessary for providing our services.
                  </li>

                  <li>
                    <b>Limited Use:</b> We use the data solely for user-facing
                    features and do not transfer it except as necessary for
                    service improvement, security, legal compliance, or as part
                    of a merger/acquisition.
                  </li>

                  <li>
                    <b>Human Access:</b> We do not allow humans to read your
                    data unless we have your explicit consent, it is necessary
                    for security purposes, or required by law.
                  </li>
                </ul>
              </li>
              <li className={styles.list_sub}>
                Secure Data Handling
                <p>
                  We adhere to stringent security practices to protect the data
                  obtained through Google OAuth. Depending on the scope and
                  number of user grants, we undergo annual security assessments
                  and obtain a Letter of Assessment from a Google-designated
                  third party.
                </p>
              </li>
              <li className={styles.list_sub}>
                Updates to This Privacy Policy
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or legal requirements. We will notify
                  you of any significant changes by posting the new Privacy
                  Policy on our website and updating the effective date.
                </p>
              </li>
              <li className={styles.list_sub}>
                Contact Us
                <p>
                  If you have any questions or concerns about this Privacy
                  Policy or our data practices, please contact us at:
                </p>
                <ul style={{ listStyleType: "disc" }}>
                  <li>
                    <b> Email:</b> [Insert Contact Email]
                  </li>

                  <li>
                    <b>Phone:</b> [Insert Contact Phone Number]
                  </li>

                  <li>
                    <b>Address:</b> [Insert Contact Address]
                  </li>
                </ul>
              </li>
              <li className={styles.list_sub}>
                Links to Other Websites
                <p>
                  Our platform may contain links to other websites. We are not
                  responsible for the privacy practices or the content of these
                  websites. Please review the privacy policies of those websites
                  before providing any personal information.
                </p>
              </li>
              <li className={styles.list_sub}>
                Children&apos;s Privacy
                <p>
                  Our platform is not intended for users under the age of 18. We
                  do not knowingly collect personal information from children
                  under 18. If we become aware that we have inadvertently
                  received personal information from a user under the age of 18,
                  we will delete such information from our records.
                </p>
              </li>
              <li className={styles.list_sub}>
                Your Rights
                <p>
                  Depending on your jurisdiction, you may have certain rights
                  regarding your personal information, including the right to
                  access, correct, delete, or restrict its use. To exercise
                  these rights, please contact us using the contact information
                  provided above.
                </p>
              </li>
              <li className={styles.list_sub}>
                Consent
                <p>
                  By using our platform, you consent to the collection and use
                  of your personal information as described in this Privacy
                  Policy. If you do not agree with this policy, please do not
                  use our platform.
                </p>
              </li>
            </ol>
            <p>
              Thank you for choosing Obiku Travels & Tours. We value your trust
              and are committed to protecting your privacy.
            </p>
          </div>
          <BottomFooter />
          <Footer />
        </>
      )}
    </>
  );
}
