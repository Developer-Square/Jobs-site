import React from "react";
import { Wrapper } from "./LandingPage.styles";
import UserContext from "contexts/user/user.provider";

const SplitScreen = () => {
  const { setUserType } = React.useContext(UserContext);

  return (
    <Wrapper>
      <div class="side left">
        <div class="image left-image"></div>
        <div class="caption">
          <h1>I'm a candidate</h1>
          <h5>Looking for a job</h5>
          <a
            onClick={() => {
              localStorage.setItem("thedb_user", "Seeker");
              setUserType("Seeker");
            }}
            className="button btn-left"
            href
          >
            Get Started
          </a>
        </div>
      </div>

      <div class="side right">
        <div class="image right-image"></div>
        <div class="caption">
          <h1>I'm an employer</h1>
          <h5>Managing a workplace</h5>
          <a
            onClick={() => {
              localStorage.setItem("thedb_user", "Employer");
              setUserType("Employer");
            }}
            className="button btn-right"
            href
          >
            Post a Job
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default SplitScreen;
