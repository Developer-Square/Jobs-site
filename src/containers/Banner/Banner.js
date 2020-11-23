/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useCallback } from "react";
import { useRouterQuery } from "helpers/useRouterQuery";
import { useLocation, useHistory } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import SearchBox from "components/SearchBox/SearchBox";
import { SearchContext } from "contexts/search/search.context";
import { useStickyDispatch } from "contexts/app/app.provider";
import {
  BannerWrapper,
  BannerHeading,
  BannerSubHeading,
  BannerSubHeading1,
  BannerComponent,
} from "./Banner.style";
import Button from "components/Button/Button";
import AuthenticationForm from "containers/SignInOutForm/Form";
import { openModal } from "@redq/reuse-modal";
import { AuthContext } from "contexts/auth/auth.context";

const Banner = ({ imageUrl }) => {
  const { state, dispatch } = useContext(SearchContext);
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const query = useRouterQuery();

  const pathname = location.pathname;

  const handleSearchInput = (text) => {
    dispatch({
      type: "UPDATE",
      payload: {
        ...state,
        text,
      },
    });
  };

  function handleClickSearchButton(searchValue) {
    const categoryParam = query.get("category") ? query.get("category") : ``;

    const queryParams = query.get("category")
      ? `category=${categoryParam}&text=${searchValue}`
      : `&text=${searchValue}`;

    history.push(`${pathname}?${queryParams}`);
  }
  const useDispatch = useStickyDispatch();
  const setSticky = useCallback(() => useDispatch({ type: "SET_STICKY" }), [
    useDispatch,
  ]);
  const removeSticky = useCallback(
    () => useDispatch({ type: "REMOVE_STICKY" }),
    [useDispatch]
  );

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === "above") {
      setSticky();
    }
  };
  const handleRedirect = () => {
    history.push("/dashboard");
  };
  const handleJoin = () => {
    authDispatch({
      type: "SIGNUP",
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
    <BannerWrapper
      style={{
        backgroundImage: `linear-gradient(to right, rgb(33 39 127 / 0.72), rgb(33 39 127 / 0.72)),url(${imageUrl})`,
      }}
    >
      <BannerComponent>
        <BannerHeading>THE DATABASE </BannerHeading>
        <br />
        <BannerSubHeading1>Jobs Need People</BannerSubHeading1>
        <BannerSubHeading>
          Browse through job listings, get one that fits your skillset, do the work and get paid. 
          Fast and Easy!
        </BannerSubHeading>
        {isAuthenticated ? (
          <Button
            onClick={handleRedirect}
            size="small"
            title={`Go to Dashboard`}
            style={{
              fontSize: 15,
              color: "#fff",
              backgroundColor: "#e6c018",
              float: "right",
            }}
          />
        ) : (
          <Button
            onClick={handleJoin}
            size="small"
            title={`Get Started`}
            style={{
              fontSize: 15,
              color: "#fff",
              backgroundColor: "#e6c018",
              float: "right",
            }}
          />
        )}
        <SearchBox
          style={{
            width: 700,
            boxShadow: "0 21px 36px rgba(0,0,0,0.05)",
            borderRadius: "6px",
            overflow: "hidden",
            display: "none",
          }}
          handleSearch={(value) => handleSearchInput(value)}
          value={state.text || ""}
          onClick={handleClickSearchButton}
          className="banner-search"
          pathname={pathname}
        />
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </BannerComponent>
    </BannerWrapper>
  );
};
export default Banner;
