import React from "react";
import Banner from "containers/Banner/Banner";
import CategoriesSection from "./CategoriesSection";
import Vacancies from "./VacanciesSection";
// import CounterSection from "./CounterSection";
import InfoSection from "./InfoSection";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "contexts/auth/auth.context";
import UserContext from "contexts/user/user.provider";
import seekerImg from "image/9.jpg";
import employerImg from "image/3.jpg";

function LandingPage({ deviceType }) {
  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);
  const { userType } = React.useContext(UserContext);
  const history = useHistory();

  const handleRedirect = () => {
    if (isAuthenticated) {
      history.push(`/dashboard`);
    } else {
      history.push(`/auth/`);
    }
  };
  return (
    <React.Fragment>
      {userType === "Employer" && (
        <div>
          <Banner
            bannerHeading={"Start Posting Jobs Now"}
            bannerSubHeading={"loreum ipsum"}
            bannerImage={employerImg}
          />
          <Vacancies />
          <InfoSection />
          <div className="infobox margin-bottom-0">
            <div className="container-x">
              <div className="sixteen columns">
                Start Posting Jobs Now{" "}
                <Link to={{ pathname: "" }} onClick={handleRedirect}>
                  {" "}
                  Get Posting{" "}
                </Link>
              </div>
            </div>
          </div>
          {/* <Loader /> */}

          {/* <CounterSection /> */}
          <CategoriesSection />
        </div>
      )}
      {userType === "Seeker" && (
        <div>
          <Banner
            bannerHeading={"Great Careers Start Here"}
            bannerSubHeading={"We've over 15,000 internship offers for you!"}
            bannerImage={seekerImg}
          />
          <Vacancies />
          <InfoSection />
          <div className="infobox margin-bottom-0">
            <div className="container-x">
              <div className="sixteen columns">
                Start Building Your Own Job Board Now{" "}
                <Link to={{ pathname: "" }} onClick={handleRedirect}>
                  {" "}
                  Get Started{" "}
                </Link>
              </div>
            </div>
          </div>
          {/* <Loader /> */}

          {/* <CounterSection /> */}
          <CategoriesSection />
        </div>
      )}
    </React.Fragment>
  );
}
export default LandingPage;
