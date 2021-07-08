import React from "react";
import Banner from "containers/Banner/Banner";
import CategoriesSection from "./CategoriesSection";
import Vacancies from "./VacanciesSection";
// import CounterSection from "./CounterSection";
import InfoSection from "./InfoSection";
// import Loader from "components/Loader/Loader";

function LandingPage({ deviceType }) {
  return (
    <div>
      <Banner />
      <InfoSection />
      <div className="infobox margin-bottom-0">
        <div className="container">
          <div className="sixteen columns">
            Start Building Your Own Job Board Now{" "}
            <a href="my-account.html">Get Started</a>
          </div>
        </div>
      </div>
      {/* <Loader /> */}

      {/* <CounterSection /> */}
      <CategoriesSection />
      <Vacancies />
    </div>
  );
}
export default LandingPage;
