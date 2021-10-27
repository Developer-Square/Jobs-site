// import { AlertDotIcon, NotificationIcon } from "components/AllSvgIcon";
import Drawer from "components/Drawer/Drawer";
// import Notification from "components/Notification/Notification";
import Popover from "components/Popover/Popover";
import { SETTINGS } from "constants/constants";
import { PROFILE_PAGE } from "constants/routes.constants";
import { DrawerContext } from "contexts/drawer/drawer.context";
import UserContext from "contexts/user/user.provider";
import Logoimage from "image/thedb.png";
import UserImage from "image/user.jpg";
import React, { useContext, useCallback } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
// import { useDeviceType } from "helpers/useDeviceType";
import {
  DrawerClose,
  DrawerContentWrapper,
  HamburgerIcon,
} from "../../Header/Header.style";
import Sidebar from "../Sidebar/Sidebar";
import {
  // AlertDot,
  CloseButton,
  DrawerWrapper,
  Image,
  Logo,
  LogoImage,
  // LogoutBtn,
  // NavLink as NavBarLink,
  // NotificationIconWrapper,
  ProfileImg,
  TopbarRightSide,
  TopbarWrapper,
  // UserDropdowItem,
} from "./Topbar.style";
import { CloseIcon } from "components/AllSvgIcon";
import { HELP_PAGE } from "constants/routes.constants";

export const data = [
  {
    title: "Application Successful",
    time: "5m",
    message: "You will be contacted soon",
  },
];

const Topbar = (props) => {
  const { state, dispatch } = useContext(DrawerContext);
  const { user, logout } = useContext(UserContext);

  // const userAgent = navigator.userAgent;
  // const deviceType = useDeviceType(userAgent);
  const img = localStorage.getItem("thedb_individual_profile")
    ? JSON.parse(localStorage.getItem("thedb_individual_profile"))["image"]
    : localStorage.getItem("thedb_org_profile")
    ? JSON.parse(localStorage.getItem("thedb_org_profile"))["logo"]
    : UserImage;
  // Toggle drawer
  const toggleHandler = useCallback(() => {
    dispatch({
      type: "TOGGLE",
    });
  }, [dispatch]);

  const handleLogout = () => logout();

  // eslint-disable-next-line no-unused-vars
  const resetSearch = () => {
    dispatch({
      type: "RESET",
    });
  };

  return (
    <TopbarWrapper ref={props.refs}>
      <Logo>
        <Link
          to="/"
          style={{
            display: "flex",
            color: "#ddd",
          }}
        >
          <LogoImage src={Logoimage} alt="TheDB" />
          <ul
            className="responsive"
            style={{
              margin: "0px",
              color: "#555",
              display: "flex",
              fontWeight: 700,
              alignItems: "center",
              padding: "10px",
            }}
          >
            <li>
              <Link
                style={{ margin: 0 }}
                to={{
                  pathname: "",
                }}
              >
                Hi 👋 {user?.fullName || user?.username}
              </Link>
            </li>
          </ul>
        </Link>
      </Logo>

      <DrawerWrapper>
        <Drawer
          width="250px"
          drawerHandler={
            <HamburgerIcon>
              <span />
              <span />
              <span />
            </HamburgerIcon>
          }
          open={state.isOpen}
          toggleHandler={toggleHandler}
          closeButton={
            <DrawerClose>
              <CloseButton>
                <CloseIcon />
              </CloseButton>
            </DrawerClose>
          }
        >
          <Scrollbars autoHide>
            <DrawerContentWrapper>
              <Sidebar
                path={props.path}
                routes={props.routes}
                onMenuItemClick={toggleHandler}
                isOpen={state.isOpen}
              />
            </DrawerContentWrapper>
          </Scrollbars>
        </Drawer>
      </DrawerWrapper>

      <TopbarRightSide>
        <nav className={"menu"}>
          <ul className="responsive float-right" style={{ margin: 0 }}>
            <li>
              <Link style={{ margin: 0 }} to="/dashboard">
                <i className="fa fa-cog" /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                style={{ margin: 0 }}
                to={{
                  pathname: "",
                }}
                onClick={() => {
                  handleLogout();
                }}
              >
                <i className="fa fa-lock" /> Log Out
              </Link>
            </li>
          </ul>
        </nav>

        {/* {deviceType.desktop ? (
          <Popover
            direction="right"
            content={<Notification data={data} />}
            accessibilityType={"tooltip"}
            placement={"bottomRight"}
            handler={
              <NotificationIconWrapper>
                <NotificationIcon />
                <AlertDot>
                  <AlertDotIcon />
                </AlertDot>
              </NotificationIconWrapper>
            }
          />
        ) : null} */}

        <Link
          style={{ color: "#fff", margin: "0 10px", fontSize: "13px" }}
          to={PROFILE_PAGE}
        >
          {user?.fullName !== "" ? user?.fullName : user?.email}
        </Link>
        <Popover
          direction="right"
          className="user-pages-dropdown"
          handler={
            <ProfileImg>
              <Image src={user?.avatar?.url || img} alt="user" />
            </ProfileImg>
          }
          content={
            <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
              <div className="py-2 bg-white text-blue-800 text-sm rounded-sm border border-main-color shadow-sm">
                <Link
                  className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  to={PROFILE_PAGE}
                  exact
                >
                  Profile
                </Link>
                <Link
                  className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  to={SETTINGS}
                >
                  Settings
                </Link>
                <Link
                  className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  to={HELP_PAGE}
                >
                  Help
                </Link>
                <div className="border-b" />
                <Link
                  className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    handleLogout();
                  }}
                  to={{
                    pathname: "",
                  }}
                >
                  Logout
                </Link>
              </div>
            </div>
          }
        />
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
