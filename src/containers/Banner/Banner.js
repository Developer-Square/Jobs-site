/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import { Waypoint } from "react-waypoint";
import { useStickyDispatch } from "contexts/app/app.provider";
// import bgImg from "image/landing.jpg";

const Banner = () => {
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
      // style={{ backgroundImage: `url(${bgImg})` }}
      data-img-width={2000}
      data-img-height={1330}
      data-diff={300}
    >
      <div className="container">
        <div className="sixteen columns">
          <div className="search-container">
            {/* Form */}
            <h2>Find Job</h2>
            <input
              type="text"
              className="ico-01"
              placeholder="job title, keywords or company name"
              style={{
                width: "90%;",
              }}
            />
            <button style={{ backgroundColor: "#e6c018" }}>
              <i className="fa fa-search" />
            </button>
            {/* Browse Jobs */}
            <div className="browse-jobs">
              Browse job offers by{" "}
              <a href="browse-categories.html"> category</a> or{" "}
              <a href="/">job titles</a>
            </div>
            {/* Announce */}
            <div className="announce">
              We’ve over <strong>15,000</strong> internship offers for you!
            </div>
            <Waypoint
              onEnter={removeSticky}
              onLeave={setSticky}
              onPositionChange={onWaypointPositionChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
