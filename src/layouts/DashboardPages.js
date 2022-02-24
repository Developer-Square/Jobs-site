import React from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardProfile from "./DashboardProfile";
import UserContext from "contexts/user/user.provider";

const DashboardPages = (props) => {
  const { user } = React.useContext(UserContext);

  const checkUserProfileCompletion = () => {
    if (user?.isSeeker) {
      if (user.seeker?.profileCompletion) {
        const { settings, education, skills, experience } =
          user.seeker.profileCompletion;
        return settings && education && skills && experience;
      }
      return false;
    }
    if (user?.isEmployer) {
      if (user.employer?.profileCompletion) {
        const { settings } = user.employer.profileCompletion;
        return settings;
      }
      return false;
    }
    return false;
  };

  return checkUserProfileCompletion() ? (
    <DashboardLayout {...props} />
  ) : (
    <DashboardProfile {...props} />
  );
};

export default DashboardPages;
