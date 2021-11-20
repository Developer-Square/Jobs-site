import React from "react";
import { useLocation, useHistory } from "react-router-dom";
// import SearchBox from "components/SearchBox/SearchBox";
// import { SearchContext } from "contexts/search/search.context";
import { AuthContext } from "contexts/auth/auth.context";
import { RightMenu } from "./Menu/RightMenu/RightMenu";
import { LeftMenu } from "./Menu/LeftMenu/LeftMenu";
import HeaderWrapper from "./Header.style";
import UserImage from "image/user.jpg";
import LogoImage from "image/logo.svg";
import { isCategoryPage } from "../is-home-page";

const Header = ({ className, isSticky }) => {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname.replace(/\/+$/, "");
  const pathname = path[0] === "/" ? path.substr(1) : path;
  // const query = new URLSearchParams(location.search);
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext(AuthContext);
  const img = localStorage.getItem("thedb_individual_profile")
    ? JSON.parse(localStorage.getItem("thedb_individual_profile"))["image"]
    : localStorage.getItem("thedb_org_profile")
    ? JSON.parse(localStorage.getItem("thedb_org_profile"))["logo"]
    : UserImage;
  // const { state, dispatch } = useContext(SearchContext);

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

  // const onSearch = (text) => {
  //   dispatch({
  //     type: "UPDATE",
  //     payload: {
  //       ...state,
  //       text,
  //     },
  //   });
  // };

  // const onClickHandler = (searchValue) => {
  //   const categoryParam = query.get("category") ? query.get("category") : "";

  //   const queryParams = query.get("category")
  //     ? `category=${categoryParam}&text=${searchValue}`
  //     : `&text=${searchValue}`;

  //   history.push(`${pathname}?${queryParams}`);
  // };
  const showSearch = isCategoryPage(`/${pathname}`);
  return (
    <HeaderWrapper className={className}>
      <div className="container-x">
        <div className="sixteen columns">
          <nav className="menu" style={{ display: "flex" }}>
            <LeftMenu logo={LogoImage} isSticky={isSticky} />
            {/* {!showSearch && (
              <SearchBox
                className="headerSearch"
                handleSearch={(value) => onSearch(value)}
                onClick={(value) => onClickHandler(value)}
                placeholder="Search anything..."
                hideType={true}
                minimal={true}
                showSvg={true}
                style={{ width: "100%" }}
                value={state.text || ""}
              />
            )} */}
            <RightMenu
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              avatar={img}
              isSticky={isSticky}
              isHomePage={showSearch}
            />
          </nav>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
