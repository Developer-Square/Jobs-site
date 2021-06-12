import React from "react";
import VacancyFilter from "./VacancyFilter";

const Vacancies = () => {
  return (
    <div>
      {/* Titlebar
  ================================================== */}
      <div id="titlebar">
        <div className="container">
          <div className="ten columns">
            <span>We found 1,412 jobs matching:</span>
            <h2>Web, Software &amp; IT</h2>
          </div>
          <div className="six columns">
            <a href="dashboard-add-job.html" className="button">
              Post a Job, It’s Free!
            </a>
          </div>
        </div>
      </div>
      {/* Content
  ================================================== */}
      <div className="container">
        {/* Recent Jobs */}
        <div className="eleven columns">
          <div className="padding-right">
            <div className="listings-container">
              {/* Listing */}
              <a href="job-page-alt.html" className="listing full-time">
                <div className="listing-logo">
                  <img
                    src="images/job-list-logo-01.png"
                    alt="TheDB_company_logo"
                  />
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
                      <i className="ln ln-icon-Map2" /> Sydney
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
                  <img
                    src="images/job-list-logo-02.png"
                    alt="TheDB_company_logo"
                  />
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
                  <img
                    src="images/job-list-logo-01.png"
                    alt="TheDB_company_logo"
                  />
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
                  <img
                    src="images/job-list-logo-04.png"
                    alt="TheDB_company_logo"
                  />
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
                  <img
                    src="images/job-list-logo-05.png"
                    alt="TheDB_company_logo"
                  />
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
              {/* Listing */}
              <a href="job-page.html" className="listing part-time featured">
                <div className="listing-logo">
                  <img
                    src="images/job-list-logo-02.png"
                    alt="TheDB_company_logo"
                  />
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
              <a href="job-page.html" className="listing full-time">
                <div className="listing-logo">
                  <img
                    src="images/job-list-logo-01.png"
                    alt="TheDB_company_logo"
                  />
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
              <a href="job-page.html" className="listing full-time">
                <div className="listing-logo">
                  <img
                    src="images/job-list-logo-04.png"
                    alt="TheDB_company_logo"
                  />
                </div>
                <div className="listing-title">
                  <h4>
                    Power Systems User Experience Designer{" "}
                    <span className="listing-type">Full-Time</span>
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
            </div>
            <div className="clearfix" />
            <div className="pagination-container">
              <nav className="pagination">
                <ul>
                  <li>
                    <a href className="current-page">
                      1
                    </a>
                  </li>
                  <li>
                    <a href>2</a>
                  </li>
                  <li>
                    <a href>3</a>
                  </li>
                  <li className="blank">...</li>
                  <li>
                    <a href>22</a>
                  </li>
                </ul>
              </nav>
              <nav className="pagination-next-prev">
                <ul>
                  <li>
                    <a href className="prev">
                      Previous
                    </a>
                  </li>
                  <li>
                    <a href className="next">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <VacancyFilter />
      </div>
    </div>
  );
};

export default Vacancies;
