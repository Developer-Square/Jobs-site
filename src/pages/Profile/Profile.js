import PasswordChange from "containers/Authentication/PasswordChange";
import { AuthContext } from "contexts/auth/auth.context";
import React from "react";
import BaseProfile from "./BaseProfile";
import EmployerProfile from "./EmployerProfile";
import InstitutionProfile from "./InstitutionProfile";
import SeekerProfile from "./SeekerProfile";
import CreateAddress from "containers/Address/AddressCreate";
import AddressPreview from "containers/Address/AddressSummary";
import { useQuery } from "react-apollo";
import { GET_USER_DETAILS } from "graphql/queries";
import Loader from "components/Loader/Loader";

function Profile() {
  const { data, loading } = useQuery(GET_USER_DETAILS);
  const {
    authState: { profile },
  } = React.useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }
  let allAddresses = [];
  if (data?.me) {
    allAddresses.push(data?.me?.defaultAddress);
    allAddresses.concat(data?.me?.addresses);
  }

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
      <div className="dashboard-list-box margin-top-30">
        <h4>Addresses</h4>
        <div className="dashboard-list-box-content">
          <div className="container mt-12 px-12 xl:px-0">
            <div
              className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8"
              style={{
                margin: "20px",
              }}
            >
              {data?.me && (
                <>
                  <CreateAddress />

                  {allAddresses.map((x) => (
                    <AddressPreview key={x.id} address={x} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {profile.isInstitution && <InstitutionProfile />}
      {profile.isSeeker && <SeekerProfile />}
      {profile.isEmployer && <EmployerProfile />}
    </>
  );
}
export default Profile;
