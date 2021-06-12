import React from "react";
import Footer from "containers/Footer";
import { LayoutWrapper } from "./Layout.style";
import logoImage from "image/thedb.png";
import styled from "styled-components";
import { AuthContext } from "contexts/auth/auth.context";
import { useHistory, useLocation } from "react-router-dom";

export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 50px;
`;

const Layout = ({ className, children }) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <div>
        <header className="sticky-header">
          <div className="container">
            <div className="sixteen columns">
              {/* Logo */}
              <div id="logo">
                <h1>
                  <a href="/">
                    <LogoImage src={logoImage} alt="TheDB" />
                  </a>
                </h1>
              </div>
              {/* Menu */}
              <nav id="navigation" className="menu">
                <ul id="responsive">
                  <li>
                    <a id={pathname === "" ? "current" : ""} href="/">
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      id={pathname === "pricing" ? "current" : ""}
                      href="/pricing"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      id={pathname === "contact-us" ? "current" : ""}
                      href="/contact-us"
                    >
                      Contact
                    </a>
                  </li>

                  <li>
                    <a
                      id={
                        pathname === "vacancies" || pathname === "categories"
                          ? "current"
                          : ""
                      }
                      href
                    >
                      Browse Listings
                    </a>
                    <ul>
                      <li>
                        <a href="/vacancies">Browse Vacancies</a>
                      </li>
                      {/* <li>
                        <a href="browse-resumes.html">Browse Resumes</a>
                      </li> */}
                      <li>
                        <a href="/categories">Browse Categories</a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="float-right">
                  {isAuthenticated ? (
                    <>
                      <li>
                        <a href>Dashboard</a>
                        <ul>
                          <li>
                            <a href="dashboard.html">Dashboard</a>
                          </li>
                          <li>
                            <a href="dashboard-messages.html">Messages</a>
                          </li>
                          <li>
                            <a href="dashboard-manage-resumes.html">
                              Manage Resumes
                            </a>
                          </li>
                          <li>
                            <a href="dashboard-add-resume.html">Add Resume</a>
                          </li>
                          <li>
                            <a href="dashboard-job-alerts.html">Job Alerts</a>
                          </li>
                          <li>
                            <a href="dashboard-manage-jobs.html">Manage Jobs</a>
                          </li>
                          <li>
                            <a href="dashboard-manage-applications.html">
                              Manage Applications
                            </a>
                          </li>
                          <li>
                            <a href="dashboard-add-job.html">Add Job</a>
                          </li>
                          <li>
                            <a href="dashboard-my-profile.html">My Profile</a>
                          </li>
                          <li>
                            <a href="dashboard-my-profile.html">Logout</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href>
                          <i class="fa fa-lock"></i> Log Out
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a
                          onClick={() => {
                            authDispatch({
                              type: "SIGNUP",
                            });
                            history.push(`/auth`);
                          }}
                          href
                        >
                          <i className="fa fa-user" /> Sign Up
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            authDispatch({
                              type: "SIGNIN",
                            });
                            history.push(`/auth`);
                          }}
                          href
                        >
                          <i className="fa fa-lock" /> Log In
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
              {/* Navigation */}
              <div id="mobile-navigation">
                <a href="#menu" className="menu-trigger">
                  <i className="fa fa-reorder" />
                </a>
              </div>
            </div>
          </div>
        </header>
        <div className="clearfix" />
      </div>

      {children}
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
