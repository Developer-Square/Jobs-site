/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "containers/Footer";
import { LayoutWrapper } from "./Layout.style";
import logoImage from "image/thedb.png";
import styled from "styled-components";
import { AuthContext } from "contexts/auth/auth.context";
import { Link, useLocation, useHistory } from "react-router-dom";

export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 50px;
`;

const Layout = (props) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("thedb_auth_profile");
      localStorage.removeItem("thedb_auth_payload");
      localStorage.removeItem("thedb_auth_roles");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };
  return (
    <LayoutWrapper className={`layoutWrapper ${props.className}`}>
      <div>
        <header className="sticky-header">
          <div className="container">
            <div className="sixteen columns">
              {/* Logo */}
              <div id="logo" style={{ width: "auto" }}>
                <h1>
                  <Link to="/">
                    <LogoImage src={logoImage} alt="TheDB" />
                  </Link>
                </h1>
              </div>
              {/* Menu */}
              <nav id="navigation" className="menu">
                <ul id="responsive">
                  <li>
                    <Link id={pathname === "" ? "current" : ""} to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      id={pathname === "pricing" ? "current" : ""}
                      to="/pricing"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      id={pathname === "contact-us" ? "current" : ""}
                      to="/contact-us"
                    >
                      Contact
                    </Link>
                  </li>

                  <li>
                    <Link
                      id={
                        pathname === "vacancies" || pathname === "categories"
                          ? "current"
                          : ""
                      }
                      to={"#"}
                    >
                      Browse Listings
                    </Link>
                    <ul>
                      <li>
                        <Link to="/vacancies">Browse Vacancies</Link>
                      </li>
                      {/* <li>
                        <Link href="browse-resumes.html">Browse Resumes</Link>
                      </li> */}
                      <li>
                        <Link to="/categories">Browse Categories</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="float-right">
                  {isAuthenticated ? (
                    <>
                      <li>
                        <Link to={""}>Dashboard</Link>
                        <ul>
                          <li>
                            <Link to={`/dashboard`}>Dashboard</Link>
                          </li>
                          <li>
                            <Link to={`/dashboard/messages`}>Messages</Link>
                          </li>
                          <li>
                            <Link to={`/dashboard/manage/resume`}>
                              Manage Resumes
                            </Link>
                          </li>
                          <li>
                            <Link to={`/dashboard/resume`}>Add Resume</Link>
                          </li>
                          <li>
                            <Link to={`/dashboard/alert`}>Job Alerts</Link>
                          </li>
                          <li>
                            <Link to={`/dashboard/manage/jobs`}>
                              Manage Jobs
                            </Link>
                          </li>
                          <li>
                            <Link to={`/dashboard/applications`}>
                              Manage Applications
                            </Link>
                          </li>
                          <li>
                            <Link to={`/dashboard/vacancy`}>Add Job</Link>
                          </li>
                          <li>
                            <Link to={`/dashboard/my-profile`}>My Profile</Link>
                          </li>
                          <li>
                            <Link to={`/`} onClick={() => handleLogout()}>Logout</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to={""} onClick={() => handleLogout()}>
                          <i className="fa fa-lock"></i> Log Out
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          onClick={() => {
                            authDispatch({
                              type: "SIGNUP",
                            });
                          }}
                          to={`/auth`}
                        >
                          <i className="fa fa-user" /> Sign Up
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => {
                            authDispatch({
                              type: "SIGNIN",
                            });
                          }}
                          to={`/auth`}
                        >
                          <i className="fa fa-lock" /> Log In
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
              {/* Navigation */}
              <div id="mobile-navigation">
                <Link to="#menu" className="menu-trigger">
                  <i className="fa fa-reorder" />
                </Link>
              </div>
            </div>
          </div>
        </header>
        <div className="clearfix" />
      </div>
      {props.children}
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
