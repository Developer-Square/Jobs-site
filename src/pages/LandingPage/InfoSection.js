import React from "react";

const InfoSection = () => {
  return (
    <div className="section-background top-0">
      <div className="container">
        <div className="one-third column">
          <div className="icon-box rounded alt">
            <i className="ln ln-icon-Folder-Add" />
            <h4>Add Resume</h4>
            <p>
              Pellentesque habitant morbi tristique senectus netus ante et
              malesuada fames ac turpis egestas maximus neque.
            </p>
          </div>
        </div>
        <div className="one-third column">
          <div className="icon-box rounded alt">
            <i className="ln ln-icon-Search-onCloud" />
            <h4>Search For Jobs</h4>
            <p>
              Pellentesque habitant morbi tristique senectus netus ante et
              malesuada fames ac turpis egestas maximus neque.
            </p>
          </div>
        </div>
        <div className="one-third column">
          <div className="icon-box rounded alt">
            <i className="ln ln-icon-Business-ManWoman" />
            <h4>Find Crew</h4>
            <p>
              Pellentesque habitant morbi tristique senectus netus ante et
              malesuada fames ac turpis egestas maximus neque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
