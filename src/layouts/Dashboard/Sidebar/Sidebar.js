import React, { useContext } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import {
  SidebarWrapper,
  MenuWrapper,
  Svg,
  LogoutBtn,
  LogoImage,
} from "./Sidebar.style";
import { AuthContext } from "contexts/auth/auth.context";
import Logoimage from "image/thedb.png";
import { LogoutIcon } from "components/AllSvgIcon";
import { groupBy } from "utils/groupBy";

export default withRouter(function Sidebar(props) {
  const menuItems = groupBy(props.routes, "category");
  const history = useHistory();
  const [activeLink, setActiveLink] = React.useState(false);
  const [openParent, setOpenParent] = React.useState(false);
  const { authDispatch } = useContext(AuthContext);
  const setLink = (title) => {
    if (props.onMenuItemClick) {
      props.onMenuItemClick();
    }

    setActiveLink(title);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("thedb_auth_profile");
      localStorage.removeItem("thedb_auth_payload");
      localStorage.removeItem("thedb_auth_roles");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };
  const isOpen = (menuItem) => {
    if (activeLink === menuItem.title && openParent) {
      return true;
    }
    return false;
  };
  const menuHandler = (section, parent = null) => {
    return section.map((menuItem) => {
      if (!menuItem.children || menuItem.children.length === 0) {
        return menuItem.dashboardItem ? (
          <li
            style={
              activeLink === menuItem.title
                ? { borderColor: "#21277f", backgroundColor: "#12177f0d" }
                : {}
            }
            key={menuItem.title}
          >
            <Link
              to={{
                pathname: `${props.path}${parent ? parent.url : ""}${
                  menuItem.url
                }`,
                pageProps: menuItem,
              }}
              exact={menuItem.exact}
              onClick={() => setLink(menuItem.title)}
            >
              {menuItem.title}
            </Link>
          </li>
        ) : null;
      }
      return (
        <li
          style={
            activeLink === menuItem.title
              ? { borderColor: "#21277f", backgroundColor: "#12177f0d" }
              : {}
          }
          key={menuItem.title}
          onClick={() => setOpenParent((curr) => !curr)}
          className={isOpen(menuItem) ? "active-submenu" : ""}
        >
          <Link
            to={{
              pathname: "",
            }}
            onClick={() => setLink(menuItem.title)}
          >
            {menuItem.title}
          </Link>
          <ul>{menuHandler(menuItem.children, menuItem)}</ul>
        </li>
      );
    });
  };
  return (
    <SidebarWrapper ref={props.refs} style={props.style}>
      {props.isOpen ? (
        <Link to="/">
          <LogoImage src={Logoimage} alt="TheDB" />
        </Link>
      ) : null}

      <MenuWrapper>
        <div className="dashboard-nav">
          <div className="dashboard-nav-inner">
            {Object.keys(menuItems).map((section, i) => (
              <ul key={i} data-submenu-title={section}>
                {menuHandler(menuItems[section])}
              </ul>
            ))}
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
          </div>
        </div>
      </MenuWrapper>
    </SidebarWrapper>
  );
});
