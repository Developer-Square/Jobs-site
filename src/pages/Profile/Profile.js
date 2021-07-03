import PasswordChange from "containers/Authentication/PasswordChange";
import React from "react";
import BaseProfile from "./BaseProfile";

function Profile() {
  return (
    <div className="row">
      {/* Profile */}
      <div className="col-lg-6 col-md-12">
        <div className="dashboard-list-box margin-top-0">
          <h4 className="gray">Profile Details</h4>
          <div className="dashboard-list-box-static">
            <BaseProfile />
          </div>
        </div>
      </div>
      {/* Change Password */}
      <div className="col-lg-6 col-md-12">
        <div className="dashboard-list-box margin-top-0">
          <h4 className="gray">Change Password</h4>
          <div className="dashboard-list-box-static">
            {/* Change Password */}
            <div className="my-account">
              <div className="my-profile">
                <PasswordChange />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
