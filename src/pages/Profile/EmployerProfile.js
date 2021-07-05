import React from "react";

const EmployerProfile = () => {
  return (
    <div>
      <h2>Employer Profile</h2>
      <div className="dashboard-list-box margin-top-30">
        <h4>Company Details</h4>
        <div className="dashboard-list-box-content">
          <div className="submit-page">
            {/* Company Name */}
            <div className="form">
              <h5>Company Name</h5>
              <input type="text" placeholder="Enter the name of the company" />
            </div>
            {/* Website */}
            <div className="form">
              <h5>
                Website <span>(optional)</span>
              </h5>
              <input type="text" placeholder="http://" />
            </div>
            {/* Teagline */}
            <div className="form">
              <h5>
                Tagline <span>(optional)</span>
              </h5>
              <input type="text" placeholder="Briefly describe your company" />
            </div>
            {/* Video */}
            <div className="form">
              <h5>
                Video <span>(optional)</span>
              </h5>
              <input
                type="text"
                placeholder="A link to a video about your company"
              />
            </div>
            {/* Twitter */}
            <div className="form">
              <h5>
                Twitter Username <span>(optional)</span>
              </h5>
              <input type="text" placeholder="@yourcompany" />
            </div>
            {/* Logo */}
            <div className="form">
              <h5>
                Logo <span>(optional)</span>
              </h5>
              <label className="upload-btn">
                <input type="file" multiple />
                <i className="fa fa-upload" /> Browse
              </label>
              <span className="fake-input">No file selected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
