import React from "react";
import Banner from "containers/Banner/Banner";
import CategoriesSection from "./CategoriesSection";
import Vacancies from "./VacanciesSection";
// import CounterSection from "./CounterSection";
import InfoSection from "./InfoSection";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "contexts/auth/auth.context";
// import Loader from "components/Loader/Loader";

function LandingPage({ deviceType }) {
  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);
  const history = useHistory();

  const handleRedirect = () => {
    if (isAuthenticated) {
      history.push(`/dashboard`);
    } else {
      history.push(`/auth/`);
    }
  };
  return (
    <div>
      <Banner />
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
  );
}
export default LandingPage;
