import { TypedQuery } from "core/queries";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import EmployerProfileForm from "./EmployerProfileForm";
import SeekerProfileForm from "./SeekerProfileForm";
import { getGraphqlIdFromDBId } from "utils";
import { GET_PROFILE_DETAILS } from "graphql/queries";
import Loader from "components/Loader/Loader";
import NoResult from "components/NoResult/NoResult";

const TypedProfileQuery = TypedQuery(GET_PROFILE_DETAILS);

const ProfileView = () => {
  const match = useRouteMatch();
  const variables = {
    id: match.params.profileID
      ? getGraphqlIdFromDBId(match.params.profileID, `UserNode`)
      : "",
  };
  return (
    <TypedProfileQuery variables={variables}>
      {(profileData) => {
        if (profileData.loading) {
          return <Loader />;
        }

        if (profileData.data.user === null) {
          return <NoResult />;
        }
        return (
          <>
            {profileData?.data?.user?.isSeeker && (
              <SeekerProfileForm details={profileData?.data?.user} />
            )}
            {profileData?.data?.user?.isEmployer && (
              <EmployerProfileForm details={profileData?.data?.user} />
            )}
          </>
        );
      }}
    </TypedProfileQuery>
  );
};

export default ProfileView;
