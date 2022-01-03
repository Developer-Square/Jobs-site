import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import Drawer from "components/Drawer/Drawer";
import Button from "components/Button/Button";
import NavLink from "components/NavLink/NavLink";
import { CloseIcon } from "components/AllSvgIcon";
import { DrawerContext } from "contexts/drawer/drawer.context";
import { AuthContext } from "contexts/auth/auth.context";
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
import { CONTACT, HELP_PAGE } from "constants/routes.constants";
import { SDG } from "constants/routes.constants";
import { isCategoryPage } from "../is-home-page";
import { VACANCIES } from "constants/routes.constants";

const DrawerMenuItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Vacancies",
    href: VACANCIES,
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
          <span
            style={{
              ...classStyle,
              backgroundColor: isHomePage
                ? isSticky
                  ? `#1849B1`
                  : `#fff`
                : `#1849B1`,
            }}
          />
          <span
            style={{
              ...classStyle,
              backgroundColor: isHomePage
                ? isSticky
                  ? `#1849B1`
                  : `#fff`
                : `#1849B1`,
            }}
          />
          <span
            style={{
              ...classStyle,
              backgroundColor: isHomePage
                ? isSticky
                  ? `#1849B1`
                  : `#fff`
                : `#1849B1`,
            }}
          />
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
                  <img src={profile.avatar || img} alt="user_avatar" />
                </UserAvatar>
                <UserDetails>
                  <h3>{profile.fullName}</h3>
                  <span>{profile.email}</span>
                </UserDetails>
              </LoginView>
            ) : (
              <LogoutView onClick={toggleHandler}>
                <Button
                  title="Sign In"
                  size="small"
                  className="sign_in"
                  // variant="primary"
                  onClick={() => history.push(`/auth/`)}
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
                  onClick={toggleHandler}
                  href="/dashboard"
                  label="Dashboard"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
              <DrawerMenuItem>
                <NavLink
                  onClick={toggleHandler}
                  href="/dashboard/profile"
                  label="Account Settings"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
              <DrawerMenuItem>
                <NavLink
                  onClick={toggleHandler}
                  href="/dashboard/profile"
                  label="Profile"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
              <DrawerMenuItem>
                <NavLink
                  onClick={toggleHandler}
                  href="/dashboard/applications"
                  label="Applications"
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
              <DrawerMenuItem onClick={toggleHandler}>
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
