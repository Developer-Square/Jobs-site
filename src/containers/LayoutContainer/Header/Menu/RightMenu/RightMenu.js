import React from "react";
import { AuthContext } from "contexts/auth/auth.context";
import { Link } from "react-router-dom";

export const RightMenu = ({
  isHomePage,
  isSticky,
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
}) => {
  const { authDispatch } = React.useContext(AuthContext);

  return (
    <ul
      className="float-right"
      style={{ display: "flex", marginLeft: "auto", margin: "0", width: "30%" }}
    >
      {isAuthenticated ? (
        <>
          <li>
            <Link to={""}>Dashboard</Link>
            <ul>
              <li>
                <Link to={`/dashboard`}>Dashboard</Link>
              </li>
              <li>
                <Link to={`/dashboard/messages`}>Messages</Link>
              </li>
              <li>
                <Link to={`/dashboard/manage/resume`}>Manage Resumes</Link>
              </li>
              <li>
                <Link to={`/dashboard/resume`}>Add Resume</Link>
              </li>
              <li>
                <Link to={`/dashboard/alert`}>Job Alerts</Link>
              </li>
              <li>
                <Link to={`/dashboard/manage/jobs`}>Manage Jobs</Link>
              </li>
              <li>
                <Link to={`/dashboard/applications`}>Manage Applications</Link>
              </li>
              <li>
                <Link to={`/dashboard/vacancy`}>Add Job</Link>
              </li>
              <li>
                <Link to={`/dashboard/profile`}>My Profile</Link>
              </li>
              <li>
                <Link to={`/`}>Logout</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={""} onClick={() => console.log("to log out")}>
              <i className="fa fa-lock"></i> Log Out
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              onClick={() => {
                authDispatch({
                  type: "SIGNUP",
                });
              }}
              to={`/auth`}
            >
              <i className="fa fa-user" /> Sign Up
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                authDispatch({
                  type: "SIGNIN",
                });
              }}
              to={`/auth`}
            >
              <i className="fa fa-lock" /> Log In
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};
