import PasswordChange from "containers/Authentication/PasswordChange";
import { AuthContext } from "contexts/auth/auth.context";
import React from "react";
import BaseProfile from "./BaseProfile";
import EmployerProfile from "./EmployerProfile";
import InstitutionProfile from "./InstitutionProfile";
import SeekerProfile from "./SeekerProfile";

function Profile() {
  const {
    authState: { profile },
  } = React.useContext(AuthContext);
  return (
    <>
      <div className="row">
        {/* Profile */}
        <div className="col-lg-6 col-md-12">
          <div className="dashboard-list-box margin-top-0">
            <h4 className="gray">Account Details</h4>
            <div className="dashboard-list-box-static">
              <BaseProfile />
            </div>
          </div>
        </div>
        {/* Change Password */}
        <div className="col-lg-6 col-md-12">
          <div className="dashboard-list-box margin-top-0">
            <h4 className="gray">
              <strong style={{ color: "red" }}>DANGER ZONE!</strong> - Change
              Password
            </h4>
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
      {/* Extended Profile*/}

      {profile.isInstitution && <InstitutionProfile />}
      {profile.isSeeker && <SeekerProfile />}
      {profile.isEmployer && <EmployerProfile />}
    </>
  );
}
export default Profile;
