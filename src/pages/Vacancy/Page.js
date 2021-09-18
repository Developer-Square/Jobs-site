/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from "moment";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";

import ModalContext from "contexts/modal/modal.provider";
import { AuthContext } from "contexts/auth/auth.context";

import DraftRenderer from "components/DraftRenderer/DraftRenderer";
import Button from "components/Button/Button";

import LogoImage from "image/job-list-logo-04.png";

import Bookmark from "./Bookmark";
import { checkJobType } from "utils";
import { findJobTypeDescription } from "utils";

const Page = ({
  vacancyID,
  payRateData = [],
  yearsData = [],
  qualificationData = [],
  types = [],
  data = [],
}) => {
  const alert = useAlert();
  const history = useHistory();
  const {
    authState: { profile, isAuthenticated },
  } = React.useContext(AuthContext);

  const handleLoginNotification = () => {
    toast.error("You must login to bookmark this job");
  };
  const handleApplyJob = () => {
    toast.error("You must login to apply for this job");
  };
  const { emitter, events } = React.useContext(ModalContext);

  const handleClick = () => {
    if (data?.isActive) {
      emitter.emit(events.APPLICATION_MODAL, data);
    } else {
      toast.info("Sorry 😔, Applications have been closed");
    }
  };

  const jobType = types.find(({ name }) => name === data?.jobType);
  const payRateType = payRateData.find(({ name }) => name === data?.payRate);
  const qualificationType = qualificationData.find(
    ({ name }) => name === data?.minQualification,
  );
  const yearsType = yearsData.find(({ name }) => name === data?.yearsOfExp);
  return (
    <div>
      <div id="titlebar">
        <div className="container">
          <div className="ten columns">
            <span>
              <Link to={{ pathname: "" }}>{data?.industry?.name}</Link>
            </span>
            <h2>
              {data?.title}{" "}
              <span
                className={`${checkJobType(
                  findJobTypeDescription(data, types),
                )}`}
              >
                {jobType?.description}
              </span>
            </h2>
            <span>
              <i class="fa fa-eye" /> {data?.timesViewed}{" "}
              {data?.timesViewed === 1 ? "View" : "Views"}
            </span>
          </div>
          <div className="six columns">
            {profile.isSeeker && (
              <Bookmark
                handleLoginNotification={handleLoginNotification}
                isAuthenticated={isAuthenticated}
                data={data}
                toast={toast}
                alert={alert}
              />
            )}
            {profile.isEmployer && profile.email === data.creator.email ? (
              <Button
                className="popup-with-zoom-anim button mt-8 ml-auto"
                title={<div style={{ color: "#FFFFFF" }}> Edit Job</div>}
                onClick={() => {
                  history.push(`/dashboard/vacancies/edit-job/${data?.id}`);
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="container">
        {/* Recent Jobs */}
        <div className="eleven columns">
          <div className="padding-right">
            {/* Company Info */}
            <div className="company-info">
              <img
                src={data?.postedBy?.logo?.url || LogoImage}
                alt="job-page-logo"
              />
              <div className="content">
                <h4>{data?.postedBy?.name}</h4>
                <span>
                  <Link
                    to={{ pathname: "" }}
                    onClick={() => window.open(`${data?.postedBy?.website}`)}
                  >
                    <i className="fa fa-link" /> {data?.postedBy?.website}
                  </Link>
                </span>
                {data.creator.socials.map((social, i) => {
                  return (
                    <span key={i}>
                      <Link to={{ pathname: "" }}>
                        <i className={`"fa fa-${social.network}`} />{" "}
                        {social.username}
                      </Link>
                    </span>
                  );
                })}
              </div>
              <div className="clearfix" />
            </div>
            <DraftRenderer content={JSON.parse(data?.description)} />
            {!isAuthenticated && (
              <Button
                className="popup-with-zoom-anim button mt-8 ml-auto"
                title={
                  <div style={{ color: "#FFFFFF" }}> Login to view Email</div>
                }
                onClick={() => {
                  history.push(`/auth/`);
                }}
              />
            )}
          </div>
        </div>
        {/* Widgets */}
        <div className="five columns">
          {/* Sort by */}
          <div className="widget">
            <h4>Overview</h4>
            <div className="job-overview">
              <ul>
                <li>
                  <i className="fa fa-clock-o" />
                  <div>
                    <strong>Posted:</strong>
                    <span>{moment(data?.createdAt).fromNow()}</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-user" />
                  <div>
                    <strong>Job Title:</strong>
                    <span>{data.title}</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-map-marker" />
                  <div>
                    <strong>Location:</strong>
                    <span>{data.location}</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-user" />
                  <div>
                    <strong>Positions:</strong>
                    <span>{data.positions}</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-certificate" />
                  <div>
                    <strong>Minimun Qualification</strong>
                    <span>{qualificationType.description}</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-clock-o" />
                  <div>
                    <strong>Years of Experience</strong>
                    <span>{yearsType.description}</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-calendar-o" />
                  <div>
                    <strong>Pay Rate</strong>
                    <span>{payRateType?.description}</span>
                  </div>
                </li>
              </ul>
              {profile.isSeeker && (
                <Button
                  // href="#small-dialog"
                  className="popup-with-zoom-anim button mt-8 ml-auto"
                  onClick={isAuthenticated ? handleClick : handleApplyJob}
                  title={`Apply For This job`}
                />
              )}
            </div>
          </div>
        </div>
        {/* Widgets / End */}
      </div>
    </div>
  );
};

export default Page;
