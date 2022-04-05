import React from "react";
import { useLocation } from "react-router-dom";
import { useDeviceType } from "helpers/useDeviceType";

import Sticky from "react-stickynode";
import { useStickyState } from "contexts/app/app.provider";
import { LayoutWrapper } from "./Layout.style";
import { isCategoryPage } from "./is-home-page";
import MobileHeader from "./Header/MobileHeader";
import Header from "./Header/Header";
import SeekerStepper from "pages/ProfileStepper/SeekerStepper";
import EmployerStepper from "pages/ProfileStepper/EmployerStepper";
import UserContext from "contexts/user/user.provider";

const DashboardProfile = (props) => {
  const isSticky = useStickyState("isSticky");
  const location = useLocation();
  const { desktop, mobile, tablet } = useDeviceType();
  const { user } = React.useContext(UserContext);

  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;

  const isHomePage = isCategoryPage(pathname);
  return (
    <LayoutWrapper className={`layoutWrapper ${props?.className}`}>
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
            pathname={pathname}
          />
        </Sticky>
      )}
      <div style={{ flex: "1 0 auto" }}>
        {user?.isSeeker && <SeekerStepper />}
        {user?.isEmployer && <EmployerStepper />}
      </div>
    </LayoutWrapper>
  );
};

export default DashboardProfile;
