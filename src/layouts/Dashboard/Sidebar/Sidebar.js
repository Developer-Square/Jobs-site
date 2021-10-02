import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  SidebarWrapper,
  MenuWrapper,
  Svg,
  LogoutBtn,
  LogoImage,
} from "./Sidebar.style";
import UserContext from "contexts/user/user.provider";
import Logoimage from "image/thedb.png";
import { LogoutIcon } from "components/AllSvgIcon";
import { groupBy } from "utils/groupBy";

export default withRouter(function Sidebar(props) {
  const menuItems = groupBy(props.routes, "category");
  const [activeLink, setActiveLink] = React.useState(false);
  const [openParent, setOpenParent] = React.useState(false);
  const { user, logout } = useContext(UserContext);
  const setLink = (title) => {
    if (props.onMenuItemClick) {
      props.onMenuItemClick();
    }

    setActiveLink(title);
  };

  const handleLogout = () => logout();

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
            <ul data-submenu-title={"TheDatabase"}>
              {!props?.deviceType?.desktop && (
                <li>
                  <Link
                    to={{
                      pathname: "",
                    }}
                  >
                    Hi 👋 {user?.fullName}
                  </Link>
                </li>
              )}

              {user?.isSeeker && (
                <div>
                  <div
                    // clasName={"sidebar-link-button"}
                    style={{
                      display: "block",
                      borderLeft: "3px solid transparent",
                      transition: "0.3s",
                      lineHeight: "25px",
                      fontSize: "14px",
                      padding: "0 10px",
                    }}
                  >
                    {user?.seeker?.status === "OPEN" && (
                      <div className="sidebar-link">
                        <img
                          alt="open to jobs"
                          src={
                            "https://developers.turing.com/static/media/openToOffers.c87ed54c.svg"
                          }
                        />{" "}
                        Open to offers
                      </div>
                    )}
                    {user?.seeker?.status === "BUSY" && (
                      <div className="sidebar-link">
                        <img
                          alt="open to jobs"
                          src={
                            "https://developers.turing.com/static/media/not_available_for_work.2848971e.svg"
                          }
                        />{" "}
                        Busy
                      </div>
                    )}
                    {user?.seeker?.status === "LOOKING" && (
                      <div className="sidebar-link">
                        <img
                          alt="open to jobs"
                          src={
                            "https://developers.turing.com/static/media/available_for_work.74e15aac.svg"
                          }
                        />{" "}
                        Actively Looking
                      </div>
                    )}
                  </div>
                </div>
              )}
              <li>
                <Link
                  to={{
                    pathname: "/vacancies",
                  }}
                >
                  View Jobs
                </Link>
              </li>
            </ul>
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
