import React from "react";

const CounterSection = () => {
  return (
    <div>
      {/* Counters */}
      <div id="counters">
        <div className="container-x">
          <div className="four columns">
            <div className="counter-box">
              <span className="counter">15</span>
              <i>k</i>
              <p>Job Offers</p>
            </div>
          </div>
          <div className="four columns">
            <div className="counter-box">
              <span className="counter">4982</span>
              <p>Members</p>
            </div>
          </div>
          <div className="four columns">
            <div className="counter-box">
              <span className="counter">768</span>
              <p>Resumes Posted</p>
            </div>
          </div>
          <div className="four columns">
            <div className="counter-box">
              <span className="counter">90</span>
              <i>%</i>
              <p>Clients Who Rehire</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
