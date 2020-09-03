import { AlertDotIcon, NotificationIcon } from "components/AllSvgIcon";
import Drawer from "components/Drawer/Drawer";
import Notification from "components/Notification/Notification";
import Popover from "components/Popover/Popover";
import { SETTINGS } from "constants/constants";
import { PROFILE_PAGE } from "constants/routes.constants";
import { AuthContext } from "contexts/auth/auth.context";
import { DrawerContext } from "contexts/drawer/drawer.context";
import Logoimage from "image/db.png";
import UserImage from "image/user.jpg";
import React, { useContext, useCallback } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link, useHistory } from "react-router-dom";
import { useDeviceType } from "helpers/useDeviceType";
import {
  DrawerClose,
  DrawerContentWrapper,
  HamburgerIcon,
} from "../../Header/Header.style";
import Sidebar from "../Sidebar/Sidebar";
import {
  AlertDot,
  CloseButton,
  DrawerWrapper,
  Image,
  Logo,
  LogoImage,
  LogoutBtn,
  NavLink as NavBarLink,
  NotificationIconWrapper,
  ProfileImg,
  TopbarRightSide,
  TopbarWrapper,
  UserDropdowItem,
} from "./Topbar.style";
import { CloseIcon } from "components/AllSvgIcon";

const data = [
  {
    title: "Application Successful",
    time: "5m",
    message: "You will be contacted soon",
  },
];

const Topbar = ({ refs }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(DrawerContext);
  const {
    authState: { profile },
    authDispatch,
  } = useContext(AuthContext);
  const userAgent = navigator.userAgent;
  const deviceType = useDeviceType(userAgent);
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

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("thedb_auth_profile");
      localStorage.removeItem("thedb_auth_payload");
      localStorage.removeItem("thedb_auth_roles");
      localStorage.removeItem("thedb_applications");
      localStorage.removeItem("thedb_org_profile");
      localStorage.removeItem("thedb_individual_profile");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };
  // eslint-disable-next-line no-unused-vars
  const resetSearch = () => {
    dispatch({
      type: "RESET",
    });
  };

  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage src={Logoimage} alt="TheDB" />
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
              <Sidebar onMenuItemClick={toggleHandler} isOpen={state.isOpen} />
            </DrawerContentWrapper>
          </Scrollbars>
        </Drawer>
      </DrawerWrapper>

      <TopbarRightSide>
        {deviceType.desktop ? (
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
        ) : null}

        <Link
          style={{ color: "#fff", margin: "0 10px", fontSize: "13px" }}
          to={PROFILE_PAGE}
        >
          {profile.first_name !== "" ? profile.first_name : profile.email}
        </Link>
        <Popover
          direction="right"
          className="user-pages-dropdown"
          handler={
            <ProfileImg>
              <Image src={img} alt="user" />
            </ProfileImg>
          }
          content={
            <UserDropdowItem>
              <NavBarLink to={PROFILE_PAGE} exact>
                Profile
              </NavBarLink>
              <NavBarLink to={SETTINGS} exact>
                Settings
              </NavBarLink>
              <LogoutBtn
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </LogoutBtn>
            </UserDropdowItem>
          }
        />
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
