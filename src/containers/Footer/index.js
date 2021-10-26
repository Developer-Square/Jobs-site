/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
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
            <Fade left cascade>
              <div className="seven columns">
                <h4>About</h4>
                <p>The Database - Jobs need People.</p>
                <Link to="/auth" className="button">
                  Get Started
                </Link>
              </div>
              <div className="three columns">
                <h4>We Care</h4>
                <ul className="footer-links">
                  <li>
                    <Link to={`${HELP_PAGE}`}>FAQs</Link>
                  </li>
                  <li>
                    <Link to={`${TOS}`}>Terms of Service</Link>
                  </li>
                  <li>
                    <Link to={`${TOS}`}>Privacy Policy</Link>
                  </li>
                </ul>
              </div>
              <div className="three columns">
                <h4>About</h4>
                <ul className="footer-links">
                  <li>
                    <Link to={`${SDG}`}>Our SDGs</Link>
                  </li>
                  <li>
                    <Link to="/">Press Releases</Link>
                  </li>
                  <li>
                    <Link to="/">Awards</Link>
                  </li>
                  <li>
                    <Link to="/">Testimonials</Link>
                  </li>
                  <li>
                    <Link to="/">Timeline</Link>
                  </li>
                </ul>
              </div>
              <div className="three columns">
                <h4>Others</h4>
                <ul className="footer-links">
                  <li>
                    <Link to="/pricing">Pricing</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </Fade>
          </div>
          {/* Bottom */}
          <div className="container-x">
            <div className="footer-bottom">
              <div className="sixteen columns">
                <h4>Follow Us</h4>
                <ul className="social-icons">
                  <li>
                    <Link
                      className="facebook"
                      to="https://facebook.com/thedatabase.co.ke"
                    >
                      <i className="icon-facebook" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="twitter"
                      to="https://twitter.com/ThedatabaseKe"
                    >
                      <i className="icon-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="instagram"
                      to="https://www.instagram.com/thedatabase.co.ke/"
                    >
                      <i className="icon-instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="linkedin"
                      to="https://www.linkedin.com/company/thedb"
                    >
                      <i className="icon-linkedin" />
                    </Link>
                  </li>
                </ul>
                <div className="copyrights">
                  © Copyright {new Date().getFullYear()} by{" "}
                  <Link to="/">TheDatabase</Link>. All Rights Reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Back To Top Button */}
        <div id="backtotop">
          <Link to="#"> </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
