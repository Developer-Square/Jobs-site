import React from "react";
import useComponentSize from "helpers/useComponentSize";
import Sidebar from "./Dashboard/Sidebar/Sidebar";
import Topbar from "./Dashboard/Topbar/Topbar";
import DrawerItems from "containers/DrawerItems/DrawerItems";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import {
  LayoutWrapper,
  ContentWrapper,
  ContentInnerWrapper,
} from "./Dashboard/Layout.style";
import { useDeviceType } from "helpers/useDeviceType";
import styled from "styled-components";
import logoImage from "image/thedb.png";
import { Link, useLocation } from "react-router-dom";
import { groupBy } from "utils/groupBy";

const SidedbarDesktop = styled.div`
  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;

export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 50px;
`;
const DashboardLayout = (props) => {
  let [topbarRef, { height }] = useComponentSize();
  let [sidebarRef, { width }] = useComponentSize();
  const { desktop } = useDeviceType();
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;
  console.log(groupBy(props.routes, "category"));

  return (
    <div>
      {/* Header
================================================== */}
      <header className="dashboard-header">
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
      <div id="dashboard">
        {/* Navigation
	================================================== */}
        {/* Responsive Navigation Trigger */}
        <Link to="#" className="dashboard-responsive-nav-trigger">
          <i className="fa fa-reorder" /> Dashboard Navigation
        </Link>
        <div className="dashboard-nav">
          <div className="dashboard-nav-inner">
            <ul data-submenu-title="Start">
              <li className="active">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/notifications">
                  Messages <span className="nav-tag">2</span>
                </Link>
              </li>
            </ul>
            <ul data-submenu-title="Management">
              <li>
                <Link>For Employers</Link>
                <ul>
                  <li>
                    <Link to="dashboard-manage-jobs.html">
                      Manage Jobs <span className="nav-tag">5</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="dashboard-manage-applications.html">
                      Manage Applications <span className="nav-tag">4</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="dashboard-add-job.html">Add Job</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link>For Candidates</Link>
                <ul>
                  <li>
                    <Link to="dashboard-manage-resumes.html">
                      Manage Resumes <span className="nav-tag">2</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="dashboard-job-alerts.html">Job Alerts</Link>
                  </li>
                  <li>
                    <Link to="dashboard-add-resume.html">Add Resume</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul data-submenu-title="Account">
              <li>
                <Link to="dashboard-my-profile.html">My Profile</Link>
              </li>
              <li>
                <Link to="index.html">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Navigation / End */}
        {/* Content
	================================================== */}
        <div className="dashboard-content">
          {/* Titlebar */}
          <div id="titlebar">
            <div className="row">
              <div className="col-md-12">
                <h2>Howdy, Tom!</h2>
                {/* Breadcrumbs */}
                <nav id="breadcrumbs">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
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
                {" "}
                © Copyright {new Date().getFullYear()}{" "}
                <Link to="/">TheDatabase</Link>. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
        {/* Content / End */}
      </div>
      {/* Dashboard / End */}
    </div>
  );
};

export default DashboardLayout;
