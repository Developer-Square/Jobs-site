/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import LogoImage from "image/thedb.png";
import moment from "moment";
import draftToHtml from "draftjs-to-html";

const Page = ({
  yearsData = [],
  qualificationData = [],
  types = [],
  data = [],
}) => {
  const jobType = types.find(({ name }) => name === data?.jobType);
  const qualificationType = qualificationData.find(
    ({ name }) => name === data?.minQualification,
  );
  const yearsType = yearsData.find(({ name }) => name === data?.yearsOfExp);
  console.log("years", data.description);
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
            <a href="#" className="button dark">
              <i className="fa fa-star" /> Bookmark This Job
            </a>
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
            <div
              // dangerouslySetInnerHTML={{
              //   __html: JSON.parse(data?.description),
              // }}
            />
            {draftToHtml(data.description)}
            {/* <p className="margin-reset">
              The Food Service Specialist ensures outstanding customer service
              is provided to food customers and that all food offerings meet the
              required stock levels and presentation standards. Beginning your
              career as a Food Steward will give you a strong foundation in
              Speedway’s food segment that can make you a vital member of the
              front line team!
            </p>
            <br />
            <p>
              The <strong>Food Service Specialist</strong> will have
              responsibilities that include:
            </p>
            <ul className="list-1">
              <li>
                Executing the Food Service program, including preparing and
                presenting our wonderful food offerings to hungry customers on
                the go!
              </li>
              <li>
                Greeting customers in a friendly manner and suggestive selling
                and sampling items to help increase sales.
              </li>
              <li>
                Keeping our Store food area looking terrific and ready for our
                valued customers by managing product inventory, stocking,
                cleaning, etc.
              </li>
              <li>
                We’re looking for associates who enjoy interacting with people
                and working in a fast-paced environment!
              </li>
            </ul>
            <br />
            <h4 className="margin-bottom-10">Job Requirment</h4>
            <ul className="list-1">
              <li>
                Excellent customer service skills, communication skills, and a
                happy, smiling attitude are essential.
              </li>
              <li>
                Must be available to work required shifts including weekends,
                evenings and holidays.
              </li>
              <li>
                Must be able to perform repeated bending, standing and reaching.
              </li>
              <li> Must be able to occasionally lift up to 50 pounds</li>
            </ul> */}
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
                  <i className="fa fa-clock-o" />
                  <div>
                    <strong>Positions:</strong>
                    <span>{data.positions}</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-money" />
                  <div>
                    <strong>Minimun Qualification</strong>
                    <span>{qualificationType.description}</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-money" />
                  <div>
                    <strong>Years of Experience</strong>
                    <span>{yearsType.description}</span>
                  </div>
                </li>
              </ul>
              <a href="#small-dialog" className="popup-with-zoom-anim button">
                Apply For This Job
              </a>
              <div
                id="small-dialog"
                className="zoom-anim-dialog mfp-hide apply-popup"
              >
                <div className="small-dialog-headline">
                  <h2>Apply For This Job</h2>
                </div>
                <div className="small-dialog-content">
                  <form action="#" method="get">
                    <input type="text" placeholder="Full Name" defaultValue />
                    <input
                      type="text"
                      placeholder="Email Address"
                      defaultValue
                    />
                    <textarea
                      placeholder="Your message / cover letter sent to the employer"
                      defaultValue={""}
                    />
                    {/* Upload CV */}
                    <div className="upload-info">
                      <strong>Upload your CV (optional)</strong>{" "}
                      <span>Max. file size: 5MB</span>
                    </div>
                    <div className="clearfix" />
                    <label className="upload-btn">
                      <input type="file" multiple />
                      <i className="fa fa-upload" /> Browse
                    </label>
                    <span className="fake-input">No file selected</span>
                    <div className="divider" />
                    <button className="send">Send Application</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Widgets / End */}
      </div>
    </div>
  );
};

export default Page;
