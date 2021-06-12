import React from "react";
import { useLocation } from "react-router-dom";
import Sticky from "react-stickynode";
import Footer from "containers/Footer";
import Header from "./Header/Header";
import { useStickyState } from "contexts/app/app.provider";
import { LayoutWrapper } from "./Layout.style";
import { isCategoryPage } from "./is-home-page";
import MobileHeader from "./Header/MobileHeader";

const Layout = ({
  className,
  children,
  deviceType: { mobile, tablet, desktop },
  token,
}) => {
  const isSticky = useStickyState("isSticky");
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;

  const isHomePage = isCategoryPage(pathname);
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      {(mobile || tablet) && (
        <Sticky enabled={isSticky} innerZ={1001}>
          <MobileHeader
            className={`${isSticky ? "sticky" : "unSticky"} ${
              isHomePage ? "home" : ""
            }`}
            pathname={pathname}
            isSticky={isSticky}
          />
        </Sticky>
      )}

      {desktop && (
        <Sticky enabled={isSticky} innerZ={1001}>
          <MobileHeader
            className={`${isSticky ? "sticky" : "unSticky"} ${
              isHomePage ? "home" : ""
            } desktop`}
            isSticky={isSticky}
            pathname={pathname}
          />
          <Header
            className={`${isSticky ? "sticky" : "unSticky"} ${
              isHomePage ? "home" : ""
            }`}
            isSticky={isSticky}
            token={token}
            pathname={pathname}
          />
        </Sticky>
      )}
      {!isHomePage && (
        <div
          style={{
            marginTop: "90px",
            position: "relative",
          }}
        />
      )}
      {children}
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
