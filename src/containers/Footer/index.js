/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { TOS, HELP_PAGE, SDG } from "constants/routes.constants";

const Footer = () => {
  return (
    <>
      <div>
        <div className="margin-top-15" />
        <div
          id="footer"
          style={{
            width: "100%",
            // position: "absolute",
            // bottom: 0,
          }}
        >
          {/* Main */}
          <div className="container-x">
            <div className="seven columns">
              <h4>About</h4>
              <p>The Database - Jobs need People.</p>
              <a href="/auth" className="button">
                Get Started
              </a>
            </div>
            <div className="three columns">
              <h4>We Care</h4>
              <ul className="footer-links">
                <li>
                  <a href={`${HELP_PAGE}`}>FAQs</a>
                </li>
                <li>
                  <a href={`${TOS}`}>Terms of Service</a>
                </li>
                <li>
                  <a href={`${TOS}`}>Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div className="three columns">
              <h4>About</h4>
              <ul className="footer-links">
                <li>
                  <a href={`${SDG}`}>Our SDGs</a>
                </li>
                <li>
                  <a href="/">Press Releases</a>
                </li>
                <li>
                  <a href="/">Awards</a>
                </li>
                <li>
                  <a href="/">Testimonials</a>
                </li>
                <li>
                  <a href="/">Timeline</a>
                </li>
              </ul>
            </div>
            <div className="three columns">
              <h4>Others</h4>
              <ul className="footer-links">
                <li>
                  <a href="/pricing">Pricing</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Bottom */}
          <div className="container-x">
            <div className="footer-bottom">
              <div className="sixteen columns">
                <h4>Follow Us</h4>
                <ul className="social-icons">
                  <li>
                    <a
                      className="facebook"
                      href="https://facebook.com/thedatabase.co.ke"
                    >
                      <i className="icon-facebook" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="twitter"
                      href="https://twitter.com/ThedatabaseKe"
                    >
                      <i className="icon-twitter" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="https://www.instagram.com/thedatabase.co.ke/"
                    >
                      <i className="icon-instagram" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="linkedin"
                      href="https://www.linkedin.com/company/thedb"
                    >
                      <i className="icon-linkedin" />
                    </a>
                  </li>
                </ul>
                <div className="copyrights">
                  © Copyright {new Date().getFullYear()} by{" "}
                  <a href="/">TheDatabase</a>. All Rights Reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Back To Top Button */}
        <div id="backtotop">
          <a href="#"> </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
