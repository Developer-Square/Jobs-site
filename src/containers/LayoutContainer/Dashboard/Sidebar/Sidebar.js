import React, { useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import {
  SidebarWrapper,
  NavLink,
  MenuWrapper,
  Svg,
  LogoutBtn,
} from "./Sidebar.style";
import {
  DASHBOARD,
  PROFILE_PAGE,
  JOBS,
  GIGS,
  INTERNSHIPS,
} from "constants/routes.constants";
import { AuthContext } from "contexts/auth/auth.context";

import { DashboardIcon, SettingIcon, LogoutIcon } from "components/AllSvgIcon";
import { CategoryIcon } from "components/AllSvgIcon";
import { APPLICATIONS } from "constants/routes.constants";

const sidebarMenus = [
  {
    name: "Dashboard",
    path: DASHBOARD,
    exact: true,
    icon: <DashboardIcon />,
  },

  {
    name: "Profile",
    path: PROFILE_PAGE,
    exact: true,
    icon: <SettingIcon />,
  },
  {
    name: "Jobs",
    path: JOBS,
    exact: true,
    icon: <CategoryIcon />,
  },
  {
    name: "Gigs",
    path: GIGS,
    exact: true,
    icon: <CategoryIcon />,
  },
  {
    name: "Internships",
    path: INTERNSHIPS,
    exact: true,
    icon: <CategoryIcon />,
  },
];

export default withRouter(function Sidebar({ refs, style, onMenuItemClick }) {
  const history = useHistory();
  const {
    authState: { profile },
    authDispatch,
  } = useContext(AuthContext);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("thedb_auth_profile");
      localStorage.removeItem("thedb_auth_payload");
      localStorage.removeItem("thedb_auth_roles");
      localStorage.removeItem("thedb_applications");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };
  return (
    <SidebarWrapper ref={refs} style={style}>
      <MenuWrapper>
        {sidebarMenus.map((menu, index) => (
          <NavLink
            to={menu.path}
            key={index}
            exact={menu.exact}
            activeStyle={{
              color: "#6C3A1F",
              backgroundColor: "#f7f7f7",
              borderRadius: "50px 0 0 50px",
            }}
            onClick={onMenuItemClick}
          >
            {menu.icon ? <Svg>{menu.icon}</Svg> : ""}
            {menu.name}
          </NavLink>
        ))}
        {profile.is_individual ? (
          <NavLink
            to={APPLICATIONS}
            exact={true}
            activeStyle={{
              color: "#6C3A1F",
              backgroundColor: "#f7f7f7",
              borderRadius: "50px 0 0 50px",
            }}
            onClick={onMenuItemClick}
          >
            <Svg>
              <CategoryIcon />
            </Svg>
            Applications
          </NavLink>
        ) : null}
      </MenuWrapper>

      <LogoutBtn
        onClick={() => {
          handleLogout();
        }}
      >
        <Svg>
          <LogoutIcon />
        </Svg>
        Logout
      </LogoutBtn>
    </SidebarWrapper>
  );
});
