import React from "react";
import { toast } from "react-toastify";
import VacancyFilter from "./VacancyFilter";
import { TypedVacanciesQuery } from './queries'
import Loader from "components/Loader/Loader";
import { NoResult } from "components/VacancyLoader/VacancyLoader.style";
import { IsNotEmpty } from "helpers";


const Vacancy = () => {
  const [sortString, setSortString] = React.useState('');
  return (
    <TypedVacanciesQuery variables={{first: 10}} errorPolicy="all" loaderFull>
      {(vacancyData) => {
        if (vacancyData.loading) {
          return <Loader />;
        }

        if (vacancyData.data && vacancyData.data.vacancies === null) {
          return <NoResult />;
        }
        
        const handleLoadMore = () =>
          vacancyData.loadMore(
            (prev, next) => ({
              ...prev,
              products: {
                ...prev.vacancies,
                edges: [...prev.vacancies.edges, ...next.vacancies.edges],
                pageInfo: next.vacancies.pageInfo,
              },
            }),
            {
              after: vacancyData.data.vacancies.pageInfo.endCursor,
            },
          );
          let jobs;
          const {edges} = vacancyData.data.vacancies;
          if (edges.length > 0) {
            jobs = edges.map((edge) => edge.node);
          }
        // console.log("data", vacancyData.data.vacancies.edges);
        return (
          <div>
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

            <div className="container">
              {/* Recent Jobs */}
              <div className="eleven columns">
                <div className="padding-right">
                  <div className="listings-container">
                    {/* Listings */}
                    {jobs.length > 0 ? jobs.map((job, index) => (
                      <a href="job-page-alt.html" key={index} className="listing full-time">
                        <div className="listing-logo">
                          <img
                            src="images/job-list-logo-01.png"
                            alt="TheDB_company_logo"
                          />
                        </div>
                        <div className="listing-title">
                          <h4>
                            {job.title}
                            <span className="listing-type">{job.jobType === 'FULL_TIME' ? 'Full-time': job.jobType === 'PART_TIME' ? 'Part-Time' : job.jobType === 'VOLUNTEERING' ? 'Volunteering' : job.jobType === 'INTERNSHIP' ? 'Internship' : 'Gig'}</span>
                          </h4>
                          <ul className="listing-icons">
                            <li>
                              <i className="ln ln-icon-Management" /> King
                            </li>
                            <li>
                              <i className="ln ln-icon-Map2" /> Sydney
                            </li>
                            <li>
                              <i className="ln ln-icon-Money-2" /> ${job.salary}
                            </li>
                            <li>
                              <div className="listing-date new">new</div>
                            </li>
                          </ul>
                        </div>
                      </a>
                    )) : <Loader />}
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
              <VacancyFilter setSortString={setSortString} />
            </div>
          </div>
        )
      }}
    </TypedVacanciesQuery>
  );
};

export default Vacancy;
