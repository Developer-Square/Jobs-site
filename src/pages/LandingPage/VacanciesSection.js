import React from "react";

const Vacancies = () => {
  return (
    <div className="container">
      {/* Recent Jobs */}
      <div className="eleven columns">
        <div className="padding-right">
          <h3 className="margin-bottom-25">Recent Jobs</h3>
          <div className="listings-container">
            {/* Listing */}
            <a href="job-page-alt.html" className="listing full-time">
              <div className="listing-logo">
                <img src="images/job-list-logo-01.png" alt="vacancy-img" />
              </div>
              <div className="listing-title">
                <h4>
                  Marketing Coordinator - SEO / SEM Experience{" "}
                  <span className="listing-type">Full-Time</span>
                </h4>
                <ul className="listing-icons">
                  <li>
                    <i className="ln ln-icon-Management" /> King
                  </li>
                  <li>
                    <i className="ln ln-icon-Map2" /> 7th Avenue, New York, NY,
                    United States
                  </li>
                  <li>
                    <i className="ln ln-icon-Money-2" /> $5000 - $7000
                  </li>
                  <li>
                    <div className="listing-date new">new</div>
                  </li>
                </ul>
              </div>
            </a>
            {/* Listing */}
            <a href="job-page.html" className="listing part-time">
              <div className="listing-logo">
                <img src="images/job-list-logo-02.png" alt="vacancy-img" />
              </div>
              <div className="listing-title">
                <h4>
                  Core PHP Developer for Site Maintenance{" "}
                  <span className="listing-type">Part-Time</span>
                </h4>
                <ul className="listing-icons">
                  <li>
                    <i className="ln ln-icon-Management" /> Cubico
                  </li>
                  <li>
                    <i className="ln ln-icon-Map2" /> Sydney
                  </li>
                  <li>
                    <i className="ln ln-icon-Money-2" /> $125 / hour
                  </li>
                  <li>
                    <div className="listing-date">3d ago</div>
                  </li>
                </ul>
              </div>
            </a>
            {/* Listing */}
            <a href="job-page-alt.html" className="listing full-time">
              <div className="listing-logo">
                <img src="images/job-list-logo-01.png" alt="vacancy-img" />
              </div>
              <div className="listing-title">
                <h4>
                  Restaurant Team Member - Crew{" "}
                  <span className="listing-type">Full-Time</span>
                </h4>
                <ul className="listing-icons">
                  <li>
                    <i className="ln ln-icon-Management" /> King
                  </li>
                  <li>
                    <i className="ln ln-icon-Map2" /> Sydney
                  </li>
                  <li>
                    <div className="listing-date">3d ago</div>
                  </li>
                </ul>
              </div>
            </a>
            {/* Listing */}
            <a href="job-page.html" className="listing internship">
              <div className="listing-logo">
                <img src="images/job-list-logo-04.png" alt="vacancy-img" />
              </div>
              <div className="listing-title">
                <h4>
                  Power Systems User Experience Designer{" "}
                  <span className="listing-type">Internship</span>
                </h4>
                <ul className="listing-icons">
                  <li>
                    <i className="ln ln-icon-Management" /> Hexagon
                  </li>
                  <li>
                    <i className="ln ln-icon-Map2" /> London
                  </li>
                  <li>
                    <i className="ln ln-icon-Money-2" /> $55 / hour
                  </li>
                  <li>
                    <div className="listing-date">4d ago</div>
                  </li>
                </ul>
              </div>
            </a>
            {/* Listing */}
            <a href="job-page.html" className="listing freelance">
              <div className="listing-logo">
                <img src="images/job-list-logo-05.png" alt="vacancy-img" />
              </div>
              <div className="listing-title">
                <h4>
                  iPhone / Android Music App Development{" "}
                  <span className="listing-type">Freelance</span>
                </h4>
                <ul className="listing-icons">
                  <li>
                    <i className="ln ln-icon-Management" /> Hexagon
                  </li>
                  <li>
                    <i className="ln ln-icon-Map2" /> London
                  </li>
                  <li>
                    <i className="ln ln-icon-Money-2" /> $85 / hour
                  </li>
                  <li>
                    <div className="listing-date">4d ago</div>
                  </li>
                </ul>
              </div>
            </a>
          </div>
          <a href="browse-jobs.html" className="button centered">
            <i className="fa fa-plus-circle" /> Show More Jobs
          </a>
          <div className="margin-bottom-55" />
        </div>
      </div>
      {/* Job Spotlight */}
      <div className="five columns">
        <h3 className="margin-bottom-5">Job Spotlight</h3>
        {/* Navigation */}
        <div className="showbiz-navigation">
          <div id="showbiz_left_1" className="sb-navigation-left">
            <i className="fa fa-angle-left" />
          </div>
          <div id="showbiz_right_1" className="sb-navigation-right">
            <i className="fa fa-angle-right" />
          </div>
        </div>
        <div className="clearfix" />
        {/* Showbiz Container */}
        <div id="job-spotlight" className="showbiz-container">
          <div
            className="showbiz"
            data-left="#showbiz_left_1"
            data-right="#showbiz_right_1"
            data-play="#showbiz_play_1"
          >
            <div className="overflowholder">
              <ul>
                <li>
                  <div className="job-spotlight">
                    <a href="/">
                      <h4>
                        Social Media: Advertising Coordinator{" "}
                        <span className="part-time">Part-Time</span>
                      </h4>
                    </a>
                    <span>
                      <i className="fa fa-briefcase" /> Mates
                    </span>
                    <span>
                      <i className="fa fa-map-marker" /> New York
                    </span>
                    <span>
                      <i className="fa fa-money" /> $20 / hour
                    </span>
                    <p>
                      As advertising &amp; content coordinator, you will support
                      our social media team in producing high quality social
                      content for a range of media channels.
                    </p>
                    <a href="job-page.html" className="button">
                      Apply For This Job
                    </a>
                  </div>
                </li>
                <li>
                  <div className="job-spotlight">
                    <a href="/">
                      <h4>
                        Prestashop / WooCommerce Product Listing{" "}
                        <span className="freelance">Freelance</span>
                      </h4>
                    </a>
                    <span>
                      <i className="fa fa-briefcase" /> King
                    </span>
                    <span>
                      <i className="fa fa-map-marker" /> London
                    </span>
                    <span>
                      <i className="fa fa-money" /> $25 / hour
                    </span>
                    <p>
                      Etiam suscipit tellus ante, sit amet hendrerit magna
                      varius in. Pellentesque lorem quis enim venenatis
                      pellentesque.
                    </p>
                    <a href="job-page.html" className="button">
                      Apply For This Job
                    </a>
                  </div>
                </li>
                <li>
                  <div className="job-spotlight">
                    <a href="/">
                      <h4>
                        Logo Design <span className="freelance">Freelance</span>
                      </h4>
                    </a>
                    <span>
                      <i className="fa fa-briefcase" /> Hexagon
                    </span>
                    <span>
                      <i className="fa fa-map-marker" /> Sydney
                    </span>
                    <span>
                      <i className="fa fa-money" /> $10 / hour
                    </span>
                    <p>
                      Proin ligula neque, pretium et ipsum eget, mattis commodo
                      dolor. Etiam tincidunt libero quis commodo.
                    </p>
                    <a href="job-page.html" className="button">
                      Apply For This Job
                    </a>
                  </div>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacancies;
