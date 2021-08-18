import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logoimage from "image/db.png";
import styled from "styled-components";
import LogoimageInverted from "image/thedb.png";
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
  max-height: 50px;
`;
export const LeftMenu = ({ isSticky, logo }) => {
  const location = useLocation();
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
          id={pathname === "pricing" ? "current" : ""}
          to="/pricing"
        >
          Pricing
        </Link>
      </li>
      <li>
        <Link
          style={{
            color: isHomePage ? (isSticky ? "#7b7b7b" : "#fff") : "#7b7b7b",
          }}
          id={pathname === "contact-us" ? "current" : ""}
          to="/contact-us"
        >
          Contact
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
          F.A.Q
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
  );
};