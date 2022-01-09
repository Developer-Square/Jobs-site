/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import { Waypoint } from "react-waypoint";
import Fade from "react-reveal/Fade";
import { useStickyDispatch } from "contexts/app/app.provider";
import bgImg from "image/landing.jpg";
// import SearchContainer from "containers/Search/SearchContainer";
import GetStarted from "components/GetStarted/GetStarted";

const Banner = (props) => {
  const useDispatch = useStickyDispatch();
  const setSticky = useCallback(
    () => useDispatch({ type: "SET_STICKY" }),
    [useDispatch],
  );
  const removeSticky = useCallback(
    () => useDispatch({ type: "REMOVE_STICKY" }),
    [useDispatch],
  );

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === "above") {
      setSticky();
    }
  };

  return (
    <div
      id="banner"
      className="with-transparent-header parallax background"
      style={{
        backgroundImage: `url(${props?.bannerImage || bgImg})`,
        maxHeight: "100vh",
        height: "100vh",
      }}
      data-img-width={2000}
      data-img-height={1330}
      data-diff={300}
    >
      <div
        className="container-x"
        style={{
          height: "100%",
        }}
      >
        <div className="sixteen columns" style={{ height: "100%" }}>
          <div
            className="search-container flex h-screen"
            style={{ height: "100%" }}
          >
            <div className={"align-middle my-auto"}>
              <Fade bottom>
                <div className="announce text-lg">
                  {props?.bannerSubHeading || (
                    <>
                      We’ve over <strong>15,000</strong> internship offers for
                      you!
                    </>
                  )}
                </div>
                <h2
                  style={{ borderLeft: "3px solid white" }}
                  className={"px-4 my-4 font-semibold text-5xl tracking-wide"}
                >
                  {props?.bannerHeading || "Great Careers Start Here"}
                </h2>
                <div>
                  <GetStarted
                    floatDirection="left"
                    buttonStyles={{
                      width: "auto",
                      height: "36px",
                      borderRadius: "50px",
                    }}
                  />
                  <br />
                </div>

                {/* <SearchContainer /> */}
                <Waypoint
                  onEnter={removeSticky}
                  onLeave={setSticky}
                  onPositionChange={onWaypointPositionChange}
                />
                {/* Browse Jobs */}
                {/* <div className="browse-jobs">
                Browse job by <a href="browse-categories.html"> category</a> or{" "}
                <a href="/">titles</a>
              </div> */}
                {/* Announce */}
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
