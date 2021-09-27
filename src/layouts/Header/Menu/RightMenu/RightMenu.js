import React from "react";
import { AuthContext } from "contexts/auth/auth.context";
import { Link, useHistory } from "react-router-dom";

export const RightMenu = ({ isAuthenticated }) => {
  const { authDispatch } = React.useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("thedb_auth_profile");
      localStorage.removeItem("thedb_auth_payload");
      localStorage.removeItem("thedb_auth_roles");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };

  return (
    <ul
      className="float-right"
      style={{ display: "flex", marginLeft: "auto", margin: "0", width: "30%" }}
    >
      {isAuthenticated ? (
        <>
          <li>
            <Link
              to={{
                pathname: "",
              }}
            >
              Dashboard
            </Link>
            <ul>
              <li>
                <Link to={`/dashboard`}>Dashboard</Link>
              </li>
              <li>
                <Link to={`/dashboard/resume`}>View Resumes</Link>
              </li>
              <li>
                <Link to={`/dashboard/resume`}>Add Resume</Link>
              </li>
              <li>
                <Link to={`/dashboard/alert`}>Job Alerts</Link>
              </li>
              <li>
                <Link to={`/dashboard/vacancies/manage-jobs`}>Manage Jobs</Link>
              </li>
              <li>
                <Link to={`/dashboard/applications`}>Manage Applications</Link>
              </li>
              <li>
                <Link to={`/dashboard/bookmarks`}>Manage Saved Jobs</Link>
              </li>
              <li>
                <Link to={`/dashboard/vacancies/add-job`}>Add Job</Link>
              </li>
              <li>
                <Link to={`/dashboard/profile`}>My Profile</Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to={{
                pathname: "",
              }}
              onClick={handleLogout}
            >
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
