import React from "react";
import { useHistory } from "react-router";
import Activities from "./Activities";
import { numberWithCommas, formatCurrency } from "utils";

import UserContext from "contexts/user/user.provider";

const Dashboard = () => {
  const { user, setRefetchUser } = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    setRefetchUser((prev) => !prev);
  }, [setRefetchUser]);

  return (
    <div className="product_tour__step_1">
      {/* Content */}
      <div className="product_tour__sub_step_1">
        <div className="row">
          {/* Item */}
          <div
            onClick={() => history.push(`/vacancies`)}
            className="col-lg-3 col-md-6"
          >
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
          <div
            onClick={() =>
              history.push(
                user?.isSeeker
                  ? `/dashboard/resume`
                  : user?.isEmployer
                  ? `/dashboard/vacancies/manage-jobs`
                  : ``,
              )
            }
            className="col-lg-3 col-md-6"
          >
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
          <div
            onClick={() => history.push(`/dashboard/applications`)}
            className="col-lg-3 col-md-6"
          >
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
          <div
            onClick={() => history.push(`/dashboard/bookmarks`)}
            className="col-lg-3 col-md-6"
          >
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
                    <i className="list-box-icon fa fa-money" />
                    <strong>
                      {subscription?.plan?.title} (
                      {subscription?.plan?.periodType})
                    </strong>
                    <span>
                      {formatCurrency(subscription?.plan?.periodAmountMoney)}
                    </span>
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
