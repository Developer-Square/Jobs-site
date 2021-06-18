import React from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div>
      {/* Content */}
      <div className="row">
        {/* Item */}
        <div className="col-lg-3 col-md-6">
          <div className="dashboard-stat color-1">
            <div className="dashboard-stat-content">
              <h4 className="counter">3</h4> <span>Active Job Listings</span>
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
              <h4 className="counter">527</h4> <span>Total Job Views</span>
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
              <h4 className="counter">17</h4> <span>Total Applications</span>
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
              <h4 className="counter">36</h4> <span>Times Bookmarked</span>
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
            <ul>
              <li>
                Your listing{" "}
                <strong>
                  <Link to="#">
                    Marketing Coordinator - SEO / SEM Experience{" "}
                  </Link>
                </strong>{" "}
                has been approved!
                <Link to="#" className="close-list-item">
                  <i className="fa fa-close" />
                </Link>
              </li>
              <li>
                Kathy Brown has sent you{" "}
                <strong>
                  <Link to="#">private message</Link>
                </strong>
                !
                <Link to="#" className="close-list-item">
                  <i className="fa fa-close" />
                </Link>
              </li>
              <li>
                Someone bookmarked your{" "}
                <strong>
                  <Link to="#">Restaurant Team Member - Crew</Link>
                </strong>
                !
                <Link to="#" className="close-list-item">
                  <i className="fa fa-close" />
                </Link>
              </li>
              <li>
                You have new application for{" "}
                <strong>
                  <Link to="#">Power Systems User Experience Designer</Link>
                </strong>
                !
                <Link to="#" className="close-list-item">
                  <i className="fa fa-close" />
                </Link>
              </li>
              <li>
                Someone bookmarked your{" "}
                <strong>
                  <Link to="#">Core PHP Developer for Site Maintenance</Link>
                </strong>{" "}
                listing!
                <Link to="#" className="close-list-item">
                  <i className="fa fa-close" />
                </Link>
              </li>
              <li>
                Your job listing{" "}
                <strong>
                  <Link to="#">Core PHP Developer for Site Maintenance</Link>
                </strong>{" "}
                is expiring!
                <Link to="#" className="close-list-item">
                  <i className="fa fa-close" />
                </Link>
              </li>
            </ul>
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
        {/* Copyrights */}
        <div className="col-md-12">
          <div className="copyrights">
            © 2019 WorkScout. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
