import React from "react";

const InfoSection = () => {
  return (
    <div className="section-background top-0">
      <div className="container-x">
        <div className="one-third column">
          <div className="icon-box rounded alt">
            <i className="ln ln-icon-Folder-Add" />
            <h4>Sign Up</h4>
            <p>
              Get started on The Database by creating your account and profile.
            </p>
          </div>
        </div>
        <div className="one-third column">
          <div className="icon-box rounded alt">
            <i className="ln ln-icon-Search-onCloud" />
            <h4>Search For Listings</h4>
            <p>
              Get instant access to thousands of listings that match your
              interests and expertise.
            </p>
          </div>
        </div>
        <div className="one-third column">
          <div className="icon-box rounded alt">
            <i className="ln ln-icon-Business-ManWoman" />
            <h4>Apply and Get Hired</h4>
            <p>
              Apply for openings that excite you without hustle. Wait for the
              employer for interviewing and hiring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
