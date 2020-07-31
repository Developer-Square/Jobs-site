import React from "react";
import NavLink from "components/NavLink/NavLink";
import Button from "components/Button/Button";
import Popover from "components/Popover/Popover";
import { JOBS, GIGS, HELP_PAGE } from "constants/routes.constants";
import { AuthorizedMenu } from "../AuthorizedMenu";
import { HelpIcon } from "components/AllSvgIcon";
import { RightMenuBox } from "./RightMenu.style";

export const RightMenu = ({ onLogout, avatar, isAuthenticated, onJoin }) => {
  return (
    <RightMenuBox>
      <NavLink className="menu-item" href={JOBS} label="Jobs" />
      <NavLink className="menu-item" href={GIGS} label="Gigs" />
      <NavLink
        className="menu-item"
        href={HELP_PAGE}
        label="Need Help"
        iconClass="menu-icon"
        icon={<HelpIcon />}
      />

      {!isAuthenticated ? (
        <Button
          onClick={onJoin}
          size="small"
          title="Join"
          style={{ fontSize: 15, color: "#5918e6", backgroundColor: "#e6c018" }}
        />
      ) : (
        <Popover
          direction="right"
          className="user-pages-dropdown"
          handler={<img src={avatar} alt="user" />}
          content={<AuthorizedMenu onLogout={onLogout} />}
        />
      )}
    </RightMenuBox>
  );
};
