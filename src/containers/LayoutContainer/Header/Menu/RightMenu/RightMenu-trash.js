import React from "react";
import NavLink from "components/NavLink/NavLink";
import Button from "components/Button/Button";
import Popover from "components/Popover/Popover";
import {
  JOBS,
  GIGS,
  ABOUT,
  HELP_PAGE,
  PROFILE_PAGE,
} from "constants/routes.constants";
import { AuthorizedMenu } from "../AuthorizedMenu";
import { HelpIcon } from "components/AllSvgIcon";
import { RightMenuBox } from "./RightMenu.style";
import { AuthContext } from "contexts/auth/auth.context";

export const RightMenu = ({
  isHomePage,
  isSticky,
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
}) => {
  const {
    authState: { profile },
  } = React.useContext(AuthContext);
  const className = isHomePage ? (isSticky ? "" : "sticky") : "";
  return (
    <RightMenuBox>
      {isAuthenticated ? (
        <>
          <NavLink
            className={`menu-item ${className}`}
            href={JOBS}
            label="Jobs"
          />
          <NavLink
            className={`menu-item ${className}`}
            href={GIGS}
            label="Gigs"
          />
        </>
      ) : (
        <NavLink
          className={`menu-item ${className}`}
          href={ABOUT}
          label="About"
        />
      )}
      <NavLink
        className={`menu-item ${className}`}
        href={HELP_PAGE}
        label="Need Help"
        iconClass="menu-icon"
        icon={
          <HelpIcon
            color={isHomePage ? (isSticky ? "#21277F" : "#e6c018") : "#21277F"}
          />
        }
      />

      {!isAuthenticated ? (
        <Button
          onClick={onJoin}
          size="small"
          title="Join"
          style={{
            fontSize: 15,
            backgroundColor: isHomePage
              ? isSticky
                ? "#21277F"
                : "#e6c018"
              : "#21277F",
          }}
        />
      ) : (
        <>
          <Popover
            direction="right"
            className="user-pages-dropdown"
            handler={<img src={avatar} alt="user" />}
            content={<AuthorizedMenu onLogout={onLogout} />}
          />
          <NavLink
            className={`menu-item ${className}`}
            href={PROFILE_PAGE}
            label={`${
              profile.fullName !== "" ? profile.fullName : profile.email
            }`}
          />
        </>
      )}
    </RightMenuBox>
  );
};
