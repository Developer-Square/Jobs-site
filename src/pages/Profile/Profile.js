import PasswordChange from "containers/Authentication/PasswordChange";
import { AuthContext } from "contexts/auth/auth.context";
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
import styled from 'styled-components';

const SeekerProfileForm = lazy(() => import("pages/Profile/SeekerProfileForm"));
const EmployerProfileForm = lazy(() => import("pages/Profile/EmployerProfileForm"));

function Profile() {
  const [edit, setEdit] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});
  const { data, loading } = useQuery(GET_USER_DETAILS);
  const {
    authState: { profile },
  } = React.useContext(AuthContext);

  React.useEffect(() => {
    const values = localStorage.getItem('thedb_auth_profile');
    const parsedObj = JSON.parse(values);
    setUserDetails(curr => curr = parsedObj);
  }, [])

  if (loading) {
    return <Loader />;
  }

  console.log("details", profile);


  return (
    <>
    <div className={!edit ? "col-lg-10 col-md-12" : "col-md-12"}>
    <RightBtn>
        <Button title={!edit ? "Edit" : 'View Profile'} onClick={() => setEdit(curr => !curr)}/>
    </RightBtn>
    </div>
    {!edit ? (
<<<<<<< HEAD
      <>
        {Object.keys(profile).length ? 
          profile.isEmployer ? 
          <Suspense fallBack={<Loader />}>
            <EmployerProfileForm details={profile} />
          </Suspense>  
          : 
          <Suspense fallBack={<Loader />}>
            <SeekerProfileForm details={profile} />
          </Suspense>
        : <Loader />}
      </>
=======
      <Suspense fallBack={<Loader />}>
        {Object.keys(userDetails).length 
          ?
            !userDetails.isEmployer ? 
              <SeekerProfileForm /> 
            : 
              <EmployerProfileForm />
          :
          <Loader />
        }
        
      </Suspense>
>>>>>>> 8535208... feat: Added employer profile and removed unused code
    ):(
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
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
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
      {profile.isInstitution && <InstitutionProfile />}
      {profile.isSeeker && <SeekerProfile />}
      {profile.isEmployer && <EmployerProfile />}
      </>
      )}
    </>
  );
}

const RightBtn = styled.div`
  float: right;
  margin-bottom: 30px;
`

export default Profile;
