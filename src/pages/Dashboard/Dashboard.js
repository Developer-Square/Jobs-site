import UserContext from "contexts/user/user.provider";
import React from "react";
import Activities from "./Activities";

const Dashboard = () => {
  const { user } = React.useContext(UserContext);

  return (
    <div>
      {/* Content */}
      <div className="row">
        {/* Item */}
        <div className="col-lg-3 col-md-6">
          <div className="dashboard-stat color-1">
            <div className="dashboard-stat-content">
              <h4 className="counter">{user?.numberOfActiveJobListings}</h4>{" "}
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
              <h4 className="counter">{user?.extra}</h4>{" "}
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
              <h4 className="counter">{user?.numberOfApplications}</h4>{" "}
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
              <h4 className="counter">{user?.numberOfJobsBookmarked}</h4>{" "}
              <span>Jobs Saved</span>
            </div>
            <div className="dashboard-stat-icon">
              <i className="ln ln-icon-Add-UserStar " />
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
            <ul className="dashboard-packages">
              <li>
                <i className="list-box-icon fa fa-shopping-cart" />
                <strong>Basic</strong>
                <span>You have 2 listings posted</span>
              </li>
              <li>
                <i className="list-box-icon fa fa-shopping-cart" />
                <strong>Extended</strong>
                <span>You have 2 listings posted</span>
              </li>
              <li>
                <i className="list-box-icon fa fa-shopping-cart" />
                <strong>Professional</strong>
                <span>You have 5 listings posted</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
