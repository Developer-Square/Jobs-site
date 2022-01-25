import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logoimage from "image/db.png";
import styled from "styled-components";
import LogoimageInverted from "image/thedb.png";
import UserContext from "contexts/user/user.provider";
import { isCategoryPage } from "../../../is-home-page";

export const Logo = styled.div`
  // margin-right: auto;

  // @media only screen and (max-width: 1199px) {
  //   display: none;
  // }
`;
export const LogoImage = styled.img`
  display: block;
  backface-visibility: hidden;
  max-width: 150px;
  max-height: 36px;
`;
export const LeftMenu = ({ isSticky, logo }) => {
  const location = useLocation();

  const { userType, setUserType } = React.useContext(UserContext);
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;

  const isHomePage = isCategoryPage(pathname);
  return (
    <ul style={{ display: "flex", margin: "0", width: "70%", color: "#fff" }}>
      <Logo>
        {!isHomePage ? (
          <Link to="/">
            <LogoImage src={LogoimageInverted} alt="TheDB" />
          </Link>
        ) : (
          <>
            {isSticky ? (
              <Link to="/">
                <LogoImage src={LogoimageInverted} alt="TheDB" />
              </Link>
            ) : (
              <Link to="/">
                <LogoImage src={Logoimage} alt="TheDB" />
              </Link>
            )}
          </>
        )}
      </Logo>
      <li>
        <Link
          style={{
            color: isHomePage ? (isSticky ? "#7b7b7b" : "#fff") : "#7b7b7b",
          }}
          id={"current"}
          to={{
            pathname: "",
          }}
          onClick={() => {
            if (userType === "Employer") {
              localStorage.setItem("thedb_user", "Seeker");
              setUserType("Seeker");
            } else if (userType === "Seeker") {
              localStorage.setItem("thedb_user", "Employer");
              setUserType("Employer");
            }
          }}
        >
          {userType === "Seeker" && "As Employer"}
          {userType === "Employer" && "As Seeker"}
        </Link>
      </li>
      <li>
        <Link
          style={{
            color: isHomePage ? (isSticky ? "#7b7b7b" : "#fff") : "#7b7b7b",
          }}
          id={pathname === "" ? "current" : ""}
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          style={{
            color: isHomePage ? (isSticky ? "#7b7b7b" : "#fff") : "#7b7b7b",
          }}
          id={pathname === "contact-us" ? "current" : ""}
          to="/help"
        >
          Help
        </Link>
      </li>

      <li>
        <Link
          style={{
            color: isHomePage ? (isSticky ? "#7b7b7b" : "#fff") : "#7b7b7b",
          }}
          id={
            pathname === "vacancies" || pathname === "categories"
              ? "current"
              : ""
          }
          to={"#"}
        >
          Jobs
        </Link>
        <ul>
          <li>
            <Link to="/vacancies">All Jobs</Link>
          </li>
          {/* <li>
                        <Link href="browse-resumes.html">Browse Resumes</Link>
                      </li> */}
          <li>
            <Link to="/categories">Job Categories</Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};
