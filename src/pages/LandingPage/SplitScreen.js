import React from "react";
import { Wrapper, SkewedPage } from "./LandingPage.styles";
import UserContext from "contexts/user/user.provider";
import seekerImg from "image/5.jpg";
import employerImg from "image/3.jpg";
import "./style.scss";

const SplitScreen = ({ deviceType }) => {
  const { setUserType } = React.useContext(UserContext);
  // const { deviceType } = React.useContext(UserContext);

  React.useEffect(() => {}, [deviceType]);

  console.log(deviceType);

  return deviceType.desktop ? (
    <SkewedPage>
      <div className="skw-page skw-page-1 active">
        <div className="skw-page__half skw-page__half--left">
          <div className="skw-page__skewed">
            <div
              className="skw-page__content"
              style={{
                backgroundImage: `linear-gradient( to right, rgb(0 0 0 / 0.5), rgb(0 0 0 / 0.5) ), url(${seekerImg})`,
                backgroundSize: "cover",
                backgroundPosition: "left",
                backgroundRepeat: "no-repeat",
                // position: "absolute"
              }}
            >
              <div class="caption">
                <h1>I'm a candidate</h1>
                <h5>Looking for an internship</h5>
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
          </div>
        </div>
        <div className="skw-page__half skw-page__half--right">
          <div className="skw-page__skewed">
            <div
              className="skw-page__content"
              style={{
                backgroundImage: `linear-gradient( to right, rgb(4 30 88 / 0.63), rgb(4 30 88 / 0.63) ), url(${employerImg})`,
                backgroundSize: "cover",
                backgroundPosition: "right",
                backgroundRepeat: "no-repeat",
              }}
            >
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
                  Post Internships
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkewedPage>
  ) : (
    <Wrapper>
      <div class="side left">
        <div class="image left-image"></div>
        <div class="caption">
          <h1>I'm a candidate</h1>
          <h5>Looking for an internship</h5>
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
            Post Internships
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default SplitScreen;
