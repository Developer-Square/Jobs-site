import UserContext from "contexts/user/user.provider";
import React from "react";
import Activities from "./Activities";
import { numberWithCommas } from "utils";

const Dashboard = () => {
  const { user } = React.useContext(UserContext);

  return (
    <div className="product_tour__step_1">
      {/* Content */}
      <div className="product_tour__sub_step_1">
        <div className="row">
          {/* Item */}
          <div className="col-lg-3 col-md-6">
            <div className="dashboard-stat color-1">
              <div className="dashboard-stat-content">
                <h4 className="counter">
                  {numberWithCommas(user?.numberOfActiveJobListings)}
                </h4>{" "}
                <span>Active Job Listings</span>
              </div>
              <div className="dashboard-stat-icon">
                <i className="ln ln-icon-File-Link" />
              </div>
            </div>
          </div>
          {/* Item */}
          <div className="col-lg-3 col-md-6">
            <div className="dashboard-stat color-2">
              <div className="dashboard-stat-content">
                <h4 className="counter">{numberWithCommas(user?.extra)}</h4>{" "}
                <span>
                  {user?.isSeeker && "Total Resumes"}
                  {user?.isEmployer && "My Listings"}
                </span>
              </div>
              <div className="dashboard-stat-icon">
                <i className="ln ln-icon-Bar-Chart" />
              </div>
            </div>
          </div>
          {/* Item */}
          <div className="col-lg-3 col-md-6">
            <div className="dashboard-stat color-3">
              <div className="dashboard-stat-content">
                <h4 className="counter">
                  {numberWithCommas(user?.numberOfApplications)}
                </h4>{" "}
                <span>Total Applications</span>
              </div>
              <div className="dashboard-stat-icon">
                <i className="ln ln-icon-Business-ManWoman" />
              </div>
            </div>
          </div>
          {/* Item */}
          <div className="col-lg-3 col-md-6">
            <div className="dashboard-stat color-4">
              <div className="dashboard-stat-content">
                <h4 className="counter">
                  {numberWithCommas(user?.numberOfJobsBookmarked)}
                </h4>{" "}
                <span>Jobs Saved</span>
              </div>
              <div className="dashboard-stat-icon">
                <i className="ln ln-icon-Add-UserStar " />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Recent Activity */}
        <div className="col-lg-6 col-md-12">
          <div className="dashboard-list-box margin-top-20">
            <h4>Recent Activities</h4>
            <Activities />
          </div>
        </div>
        {/* Recent Activity */}
        <div className="col-lg-6 col-md-12">
          <div className="dashboard-list-box with-icons margin-top-20">
            <h4>Your Packages</h4>
            {user?.subscriptions && user?.subscriptions?.length > 0 ? (
              user?.subscriptions?.map((subscription, index) => (
                <ul key={index} className="dashboard-packages">
                  <li>
                    <i className="list-box-icon fa fa-shopping-cart" />
                    <strong>
                      {subscription?.plan?.title} (
                      {subscription?.plan?.renewalType})
                    </strong>
                    <span>{subscription?.plan?.title}</span>
                  </li>
                </ul>
              ))
            ) : (
              <ul className="dashboard-packages">
                <li>
                  <i className="list-box-icon fa fa-exclamation-triangle" />
                  <strong>Oops! 😞 </strong>
                  <span>Sorry, you have no active packages!</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
