/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const AddVacancy = () => {
  return (
    <div className="row">
      {/* Table*/}
      <div className="col-lg-12 col-md-12">
        <div className="dashboard-list-box margin-top-0">
          <h4>Job Details</h4>
          <div className="dashboard-list-box-content">
            <div className="submit-page">
              {/* Email */}
              <div className="form">
                <h5>Your Email</h5>
                <input
                  className="search-field"
                  type="text"
                  placeholder="mail@example.com"
                  defaultValue
                />
              </div>
              {/* Title */}
              <div className="form">
                <h5>Job Title</h5>
                <input
                  className="search-field"
                  type="text"
                  placeholder
                  defaultValue
                />
              </div>
              {/* Job Type */}
              <div className="form">
                <h5>Job Type</h5>
                <select
                  data-placeholder="Full-Time"
                  className="chosen-select-no-single"
                >
                  <option value={1}>Full-Time</option>
                  <option value={2}>Part-Time</option>
                  <option value={2}>Internship</option>
                  <option value={2}>Freelance</option>
                </select>
              </div>
              {/* Choose Category */}
              <div className="form">
                <div className="select">
                  <h5>Category</h5>
                  <select
                    data-placeholder="Choose Categories"
                    className="chosen-select"
                    multiple
                  >
                    <option value={1}>Web Developers</option>
                    <option value={2}>Mobile Developers</option>
                    <option value={3}>Designers &amp; Creatives</option>
                    <option value={4}>Writers</option>
                    <option value={5}>Virtual Assistants</option>
                    <option value={6}>Customer Service Agents</option>
                    <option value={7}>Sales &amp; Marketing Experts</option>
                    <option value={8}>Accountants &amp; Consultants</option>
                  </select>
                </div>
              </div>
              {/* Location */}
              <div className="form">
                <h5>
                  Location <span>(optional)</span>
                </h5>
                <input
                  className="search-field"
                  type="text"
                  placeholder="e.g. London"
                  defaultValue
                />
                <p className="note">
                  Leave this blank if the location is not important
                </p>
              </div>
              {/* Tags */}
              <div className="form">
                <h5>
                  Job Tags <span>(optional)</span>
                </h5>
                <input
                  className="search-field"
                  type="text"
                  placeholder="e.g. PHP, Social Media, Management"
                  defaultValue
                />
                <p className="note">
                  Comma separate tags, such as required skills or technologies,
                  for this job.
                </p>
              </div>
              {/* Description */}
              <div className="form" style={{ width: "100%" }}>
                <h5>Description</h5>
                <textarea
                  className="WYSIWYG"
                  name="summary"
                  cols={40}
                  rows={3}
                  id="summary"
                  spellCheck="true"
                  defaultValue={""}
                />
              </div>
              {/* Application email/url */}
              <div className="form">
                <h5>Application email / URL</h5>
                <input
                  type="text"
                  placeholder="Enter an email address or website URL"
                />
              </div>
              {/* TClosing Date */}
              <div className="form">
                <h5>
                  Closing Date <span>(optional)</span>
                </h5>
                <input data-role="date" type="text" placeholder="yyyy-mm-dd" />
                <p className="note">Deadline for new applicants.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-list-box margin-top-30">
          <h4>Company Details</h4>
          <div className="dashboard-list-box-content">
            <div className="submit-page">
              {/* Company Name */}
              <div className="form">
                <h5>Company Name</h5>
                <input
                  type="text"
                  placeholder="Enter the name of the company"
                />
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
                <input
                  type="text"
                  placeholder="Briefly describe your company"
                />
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
        <a href="#" className="button margin-top-30">
          Preview <i className="fa fa-arrow-circle-right" />
        </a>
      </div>
      {/* Copyrights */}
      <div className="col-md-12">
        <div className="copyrights">© 2019 WorkScout. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default AddVacancy;
