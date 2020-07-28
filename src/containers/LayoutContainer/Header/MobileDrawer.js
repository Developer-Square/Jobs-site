import React, { useContext } from "react";
import { openModal } from "@redq/reuse-modal";
import { useHistory } from "react-router-dom";
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

import {
  JOBS,
  GIGS,
  CONTACT,
  PROFILE_PAGE,
  HELP_PAGE,
} from "constants/routes.constants";

const DrawerMenuItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Jobs",
    href: JOBS,
  },
  {
    id: 3,
    label: "Gigs",
    href: GIGS,
  },
  {
    id: 4,
    label: "Profile",
    href: PROFILE_PAGE,
  },
  {
    id: 5,
    label: "Contact Us",
    href: CONTACT,
  },
  {
    id: 7,
    label: "Help",
    href: HELP_PAGE,
  },
];

const MobileDrawer = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(DrawerContext);
  const {
    authState: { isAuthenticated },
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

  return (
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
                  <img src={UserImage} alt="user_avatar" />
                </UserAvatar>
                <UserDetails>
                  <h3>Msichana na Kijana</h3>
                  <span>+254 720 000 000</span>
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
