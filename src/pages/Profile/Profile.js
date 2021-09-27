import PasswordChange from "containers/Authentication/PasswordChange";
import React, { lazy, Suspense } from "react";
import BaseProfile from "./BaseProfile";
import EmployerProfile from "./EmployerProfile";
import InstitutionProfile from "./InstitutionProfile";
import SeekerProfile from "./SeekerProfile";
import CreateAddress from "containers/Address/AddressCreate";
import AddressPreview from "containers/Address/AddressSummary";
import { useQuery } from "react-apollo";
import { GET_USER_DETAILS } from "graphql/queries";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import styled from "styled-components";
import UserContext from "contexts/user/user.provider";

const SeekerProfileForm = lazy(() => import("pages/Profile/SeekerProfileForm"));
const EmployerProfileForm = lazy(() =>
  import("pages/Profile/EmployerProfileForm"),
);

function Profile() {
  const [edit, setEdit] = React.useState(false);
  const { user } = React.useContext(UserContext);

  console.log(user);

  const { data, loading } = useQuery(GET_USER_DETAILS);
  if (loading) {
    return <Loader />;
  }
  const progressColor = (x) => {
    if (x > 50) {
      return "bg-green";
    }
    if (x >= 25 && x <= 50) {
      return "bg-yellow";
    }
    if (x < 25 && x > 10) {
      return "bg-gray";
    }
    if (x <= 10) {
      return "bg-red";
    }

    return "bg-red";
  };

  return (
    <>
      <div className="flex flex-wrap my-5 pl-5 pr-5">
        <RightBtn className="ml-auto">
          <Button
            title={!edit ? "Edit" : "View Profile"}
            onClick={() => setEdit((curr) => !curr)}
          />
        </RightBtn>
      </div>
      <div className="flex flex-wrap justify-center">
        <h5 className="text-gray-900 font-bold text-xl leading-8 my-1 mr-6">
          Account Completion{" "}
        </h5>
        <div className="w-3/4">
          <div className="shadow rounded border-2 border-gray-400 flex my-1 relative">
            {/* <div className="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-24 mt-2 z-10"></div> */}
            <div
              className={`cursor-default ${progressColor(
                user?.progress,
              )}-400 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white`}
              style={{
                width: `${user?.progress}%`,
              }}
            >
              <div className="absolute left-0 mx-8 text-gray-700">
                {user?.progress}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={!edit ? "col-lg-12 col-md-12" : "col-md-12"}></div>
      {!edit ? (
        user && (
          <Suspense fallBack={<Loader />}>
            {user?.isEmployer && <EmployerProfileForm details={user} />}
            {user?.isSeeker && <SeekerProfileForm details={user} />}
          </Suspense>
        )
      ) : (
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
                  <strong style={{ color: "red" }}>DANGER ZONE!</strong> -
                  Change Password
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
              <div
                className="dashboard-list-box-static container px-12 xl:px-0"
                style={{ width: "100%" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 auto-rows-max ">
                  {data?.me && (
                    <>
                      <CreateAddress />

                      {data?.me?.addresses.map((x) => (
                        <AddressPreview key={x.id} address={x} />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {user?.isInstitution && <InstitutionProfile />}
          {user?.isSeeker && <SeekerProfile />}
          {user?.isEmployer && <EmployerProfile />}
        </>
      )}
    </>
  );
}

const RightBtn = styled.div`
  float: right;
`;

export default Profile;
