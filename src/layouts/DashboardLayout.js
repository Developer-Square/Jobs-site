import React from "react";
import Sidebar from "./Dashboard/Sidebar/Sidebar";
import styled from "styled-components";
import logoImage from "image/thedb.png";
import { Link, useLocation } from "react-router-dom";
import { indexOf, isEmpty } from "lodash";

export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 50px;
`;
const DashboardLayout = (props) => {
  const location = useLocation();
  const pathLocation = location.pathname.replace(/\/+$/, "");
  const pathname =
    pathLocation[0] === "/" ? pathLocation.substr(1) : pathLocation;
  const builder = pathLocation.split("/").includes("builder");
  const getPath = (arr, a, b = 0, val = "") => {
    if (arr && !isEmpty(arr)) {
      if (a === 0) {
        return "/";
      }
      if (a === b || arr.length === a || arr.length === b) {
        return val;
      } else {
        return getPath(arr, a, b + 1, `${val}/${arr[b]}`);
      }
    } else {
      return "/";
    }
  };
  const pathValues = pathname.split("/").reduce((arr, p) => {
    const rootPathIndex = indexOf(pathname.split("/"), p);
    console.log(rootPathIndex);
    arr.push({
      name: (p.charAt(0).toUpperCase() + p.slice(1)).replace("-", " "),
      path: getPath(pathLocation.split("/"), rootPathIndex),
    });
    return arr;
  }, []);
  console.log(pathValues);
  return (
    <div>
      {builder ? (
        props.children
      ) : (
        <>
          <header className={"dashboard-header"}>
            <div className="container">
              <div className="sixteen columns">
                {/* Logo */}
                <div id="logo">
                  <h1>
                    <Link to="/">
                      <LogoImage src={logoImage} alt="TheDB" />
                    </Link>
                  </h1>
                </div>
                {/* Menu */}
                <nav id="navigation" className={"menu"}>
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
                  <ul className="responsive float-right">
                    <li>
                      <Link to="dashboard.html">
                        <i className="fa fa-cog" /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="index.html">
                        <i className="fa fa-lock" /> Log Out
                      </Link>
                    </li>
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

          {/* Titlebar
================================================== */}
          {/* Dashboard */}
          <div id="dashboard" style={{ display: "inherit" }}>
            {/* Responsive Navigation Trigger */}
            <Link to="#" className="dashboard-responsive-nav-trigger">
              <i className="fa fa-reorder" /> Dashboard Navigation
            </Link>
            <Sidebar path={props.path} routes={props.routes} />
            {/* Content
	================================================== */}
            <div
              className={builder ? "" : "dashboard-content"}
              style={builder ? { marginLeft: 0, padding: 0 } : {}}
            >
              {/* Titlebar */}

              <div id="titlebar">
                <div className="row">
                  <div className="col-md-12">
                    {/* Breadcrumbs */}
                    <nav id="breadcrumbs">
                      <ul>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        {pathValues.map((singlePath, i) => (
                          <li key={i}>
                            <Link
                              to={{
                                pathname: location.path,
                                pageProps: {
                                  title: singlePath.name,
                                },
                              }}
                            >
                              {singlePath.name}
                            </Link>
                          </li>
                        ))}

                        {/* <li>
                          <Link to="/dashboard">
                            {pathname === "dashboard"
                              ? `Hello, ${profile.username}!`
                              : pathname.replace("/", " > ").replace("-", " ")}
                          </Link>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>

              {/* Content */}
              {props.children}

              <div className="row">
                {/* Copyrights */}
                <div className="col-md-12">
                  <div className="copyrights">
                    © Copyright {new Date().getFullYear()}{" "}
                    <Link to="/">TheDatabase</Link>. All Rights Reserved.
                  </div>
                </div>
              </div>
            </div>
            {/* Content / End */}
          </div>
          {/* Dashboard / End */}
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
