import React, { useContext } from "react";
import { openModal } from "@redq/reuse-modal";
import { useHistory, useLocation } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import Drawer from "components/Drawer/Drawer";
import Button from "components/Button/Button";
import NavLink from "components/NavLink/NavLink";
import { CloseIcon } from "components/AllSvgIcon";
import { DrawerContext } from "contexts/drawer/drawer.context";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "../../SignInOutForm/Form";
import {
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
  DrawerProfile,
  LogoutView,
  LoginView,
  UserAvatar,
  UserDetails,
  DrawerMenu,
  DrawerMenuItem,
  UesrOptionMenu,
} from "./Header.style";
import UserImage from "image/user.jpg";
import { useStickyState } from "contexts/app/app.provider";
import { CONTACT, PROFILE_PAGE, HELP_PAGE } from "constants/routes.constants";
import { SDG } from "constants/routes.constants";
import { isCategoryPage } from "../is-home-page";

const DrawerMenuItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Profile",
    href: PROFILE_PAGE,
  },
  {
    id: 3,
    label: "Contact Us",
    href: CONTACT,
  },
  {
    id: 4,
    label: "Help",
    href: HELP_PAGE,
  },
];

const MobileDrawer = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(DrawerContext);
  const {
    authState: { isAuthenticated, profile },
    authDispatch,
  } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;
  const img = localStorage.getItem("thedb_individual_profile")
    ? JSON.parse(localStorage.getItem("thedb_individual_profile"))["image"]
    : localStorage.getItem("thedb_org_profile")
    ? JSON.parse(localStorage.getItem("thedb_org_profile"))["logo"]
    : UserImage;

  const isHomePage = isCategoryPage(pathname);
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

  const signInOutForm = () => {
    dispatch({
      type: "TOGGLE",
    });

    authDispatch({
      type: "SIGNIN",
    });

    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };
  const isSticky = useStickyState("isSticky");
  const classStyle = isSticky
    ? {}
    : isHomePage
    ? { backgroundColor: "white" }
    : {};

  return (
    <Drawer
      width="316px"
      drawerHandler={
        <HamburgerIcon>
          <span style={classStyle} />
          <span style={classStyle} />
          <span style={classStyle} />
        </HamburgerIcon>
      }
      open={state.isOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <DrawerClose>
          <CloseIcon />
        </DrawerClose>
      }
    >
      <Scrollbars autoHide>
        <DrawerContentWrapper>
          <DrawerProfile>
            {isAuthenticated ? (
              <LoginView>
                <UserAvatar>
                  <img src={img} alt="user_avatar" />
                </UserAvatar>
                <UserDetails>
                  <h3>{profile.full_name}</h3>
                  <span>{profile.email}</span>
                </UserDetails>
              </LoginView>
            ) : (
              <LogoutView>
                <Button
                  title="Join In"
                  size="small"
                  className="sign_in"
                  // variant="primary"
                  onClick={signInOutForm}
                />
              </LogoutView>
            )}
          </DrawerProfile>

          <DrawerMenu>
            {DrawerMenuItems.map((item) => (
              <DrawerMenuItem key={item.id}>
                <NavLink
                  onClick={toggleHandler}
                  href={item.href}
                  label={item.label}
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
            ))}
            <DrawerMenuItem>
              <NavLink
                onClick={toggleHandler}
                href={SDG}
                label={"Sustainable Development Goals"}
                className="drawer_menu_item"
              />
            </DrawerMenuItem>
          </DrawerMenu>

          {isAuthenticated && (
            <UesrOptionMenu>
              <DrawerMenuItem>
                <NavLink
                  href="/profile"
                  label="Your Account Settings"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
              <DrawerMenuItem>
                <NavLink
                  href="/profile"
                  label="Profile"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
              <DrawerMenuItem>
                <NavLink
                  href="/dashboard/gigs"
                  label="Gigs"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
              <DrawerMenuItem>
                <NavLink
                  href="/dashboard/jobs"
                  label="Jobs"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
              <DrawerMenuItem>
                <div onClick={handleLogout} className="drawer_menu_item">
                  <span className="logoutBtn">Logout</span>
                </div>
              </DrawerMenuItem>
            </UesrOptionMenu>
          )}
        </DrawerContentWrapper>
      </Scrollbars>
    </Drawer>
  );
};

export default MobileDrawer;
