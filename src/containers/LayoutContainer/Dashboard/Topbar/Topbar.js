import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { DrawerContext } from "contexts/drawer/drawer.context";
import Popover from "components/Popover/Popover";
import Notification from "components/Notification/Notification";
import { AuthContext } from "contexts/auth/auth.context";
import { SETTINGS } from "constants/constants";
// import AuthenticationForm from "../../SignInOutForm/Form";
import { NotificationIcon, AlertDotIcon } from "components/AllSvgIcon";
import {
  TopbarWrapper,
  TopbarRightSide,
  ProfileImg,
  Image,
  Logo,
  LogoImage,
  AlertDot,
  NotificationIconWrapper,
  UserDropdowItem,
  NavLink as NavBarLink,
  LogoutBtn,
  CloseButton,
  DrawerWrapper,
} from "./Topbar.style";
import {
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
} from "../../Header/Header.style";
import UserImage from "image/user.jpg";
import Drawer from "components/Drawer/Drawer";
import Logoimage from "image/thedb.png";
import NavLink from "components/NavLink/NavLink";
import Sidebar from "../Sidebar/Sidebar";
// import AuthenticationForm from "containers/SignInOutForm/Form";
import { PROFILE_PAGE } from "constants/routes.constants";

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
  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
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

  // eslint-disable-next-line no-unused-vars
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage src={Logoimage} alt="TheDB" />
        </Link>
      </Logo>

      <DrawerWrapper>
        <Drawer
          width="316px"
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
              <CloseButton />
            </DrawerClose>
          }
        >
          <Scrollbars autoHide>
            <DrawerContentWrapper>
              <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
            </DrawerContentWrapper>
          </Scrollbars>
        </Drawer>
      </DrawerWrapper>

      <TopbarRightSide>
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

        <Popover
          direction="right"
          className="user-pages-dropdown"
          handler={
            <ProfileImg>
              <Image src={UserImage} alt="user" />
            </ProfileImg>
          }
          content={
            <UserDropdowItem>
              <NavBarLink to={PROFILE_PAGE} exact={false}>
                Profile
              </NavBarLink>
              <NavBarLink to={SETTINGS} exact={false}>
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
        <NavLink
          className="menu-item"
          href={PROFILE_PAGE}
          label={`${
            profile.first_name !== "" ? profile.first_name : profile.email
          }`}
        />
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
