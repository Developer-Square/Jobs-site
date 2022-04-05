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
        maxHeight: "90vh",
        height: "90vh",
        marginBottom: "40px",
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
        <div className="container h-screen relative z-20">
          <div className="h-full lg:full flex flex-col justify-end pb-4 lg:pb-0 lg:w-96 lg:justify-center">
            <div className="h-1/2 flex flex-col justify-center items-center text-center lg:items-start lg:text-left mb-4">
              <Waypoint
                onEnter={removeSticky}
                onLeave={setSticky}
                onPositionChange={onWaypointPositionChange}
              />

              <Fade bottom>
                <p className="text-xs lg:text-base leading-5 announce text-lg">
                  {props?.bannerSubHeading || (
                    <>
                      We’ve over <strong>15,000</strong> internship offers for
                      you!
                    </>
                  )}
                </p>
                <h2
                  style={{ borderLeft: "3px solid white" }}
                  className={
                    "px-4 my-4 font-semibold text-5xl tracking-wide text-white"
                  }
                >
                  {props?.bannerHeading || "Great Careers Start Here"}
                </h2>
                <GetStarted
                  floatDirection="left"
                  buttonStyles={{
                    width: "auto",
                    height: "36px",
                    borderRadius: "50px",
                  }}
                />
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
