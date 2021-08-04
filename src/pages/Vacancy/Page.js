/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from "moment";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";

import LogoImage from "image/thedb.png";
import DraftRenderer from "components/DraftRenderer/DraftRenderer";
import ModalContext from "contexts/modal/modal.provider";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";

import Bookmark from "./Bookmark";

const Page = ({
  vacancyID,
  yearsData = [],
  qualificationData = [],
  types = [],
  data = [],
}) => {
  const alert = useAlert();
  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);

  const handleLoginNotification = () => {
    alert.show(
      {
        title: "You must login to bookmark this job",
      },
      { type: "info", timeout: 5000 },
    );
    toast.error("You must login to bookmark this job");
  };
  const handleApplyJob = () => {
    alert.show(
      {
        title: "You must login to apply for this job",
      },
      { type: "info", timeout: 5000 },
    );
    toast.error("You must login to apply for this job");
  };
  const { emitter, events } = React.useContext(ModalContext);

  const handleClick = () => emitter.emit(events.APPLICATION_MODAL, data);
  // const handleClick = () => console.log("handling click");

  const jobType = types.find(({ name }) => name === data?.jobType);
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
              <a href="browse-jobs.html">{data?.industry?.name}</a>
            </span>
            <h2>
              {data?.title}{" "}
              <span className="full-time">{jobType?.description}</span>
            </h2>
          </div>
          <div className="six columns">
            <Bookmark
              handleLoginNotification={handleLoginNotification}
              isAuthenticated={isAuthenticated}
              data={data}
            />
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
                  <a href="#">
                    <i className="fa fa-link" /> {data?.postedBy?.website}
                  </a>
                </span>
                <span>
                  <a href="#">
                    <i className="fa fa-twitter" /> @kingrestaurants
                  </a>
                </span>
              </div>
              <div className="clearfix" />
            </div>
            <DraftRenderer content={JSON.parse(data?.description)} />
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
              </ul>
              <Button
                // href="#small-dialog"
                className="popup-with-zoom-anim button mt-8 ml-auto"
                onClick={isAuthenticated ? handleClick : handleApplyJob}
                title={`Apply For This job`}
              />
            </div>
          </div>
        </div>
        {/* Widgets / End */}
      </div>
    </div>
  );
};

export default Page;
