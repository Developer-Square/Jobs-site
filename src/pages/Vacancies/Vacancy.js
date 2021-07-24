import React, {useContext, useEffect} from "react";
import {useLazyQuery} from 'react-apollo'
import VacancyFilter from "./VacancyFilter";
import { TypedVacanciesQuery } from './queries'
import Loader from "components/Loader/Loader";
import { NoResult } from "components/VacancyLoader/VacancyLoader.style";
import { VacancyContext } from 'contexts/vacancies/vacancies.context'
import { VACANCIES_QUERY } from './queries'
 

const Vacancy = () => {
  const [sortTypes, setSortTypes] = React.useState([]);
  const [rate, setRate] = React.useState([]);
  const { vacancyState, vacancyDispatch } = useContext(VacancyContext);

  const onCompleted = () => {
    console.log('Completed request successfully');
  }

  const [loadVacancies, { called, loading, data }] = useLazyQuery(
    VACANCIES_QUERY,
    { variables: { first: 10, filter: {
      search: sortTypes[0]
    } },
    onCompleted: onCompleted,
    fetchPolicy: 'cache-and-network' },
  )

  console.log(vacancyState, "vacancyState");

  const jobTypeSort = () => {
    // Fetch the requested sort data i.e. Full Time jobs
    loadVacancies();

    let sortedJobs = [];
    // If the user selects the any option then return all the
    // vacant jobs.
    if (sortTypes.includes('any')) {
      sortedJobs = vacancyState.jobsData;
    } else { 
      vacancyState.jobsData.map(vacancy => {
        if (sortTypes.includes(vacancy.jobType)) {
          sortedJobs.push(vacancy)
        }
        return;
      })
    }
    console.log("sortTypes", sortTypes);
    console.log("sortedJobs", sortedJobs);

    if (sortedJobs) {
      vacancyDispatch({
        type: "SORT_JOBS",
        payload: sortedJobs
      })
    }
  }

  const ratePerHour = () => {
    if (rate.length > 0) {
      let upperLimit = rate[0].upperLimit;
      let lowerLimit = rate[0].lowerLimit;
      // Map over all the rates to find the lowest limit and highest upper limit.
      rate.map(rateObj => {
        if (rateObj.lowerLimit < lowerLimit) {
          lowerLimit = rateObj.lowerLimit;
        }
        
        if (rateObj.upperLimit > upperLimit) {
          upperLimit = rateObj.upperLimit;
        }
        return;
      })
    

      let sortedJobs = [];
      // If the user selects the any option then return all the
      // vacant jobs.
      if (rate.includes('any')) {
        sortedJobs = vacancyState.jobsData;
      } else { 
        vacancyState.jobsData.map(vacancy => {
          if (vacancy.payRate === 'HOUR') {
            // Add the jobs that are offer 200+ hourly payments.
            if (upperLimit === 201 && vacancy.salary > upperLimit) {
              sortedJobs.push(vacancy);
            }
            if (lowerLimit < vacancy.salary && vacancy.salary < upperLimit) {
              sortedJobs.push(vacancy);
            }
          }
          return;
        })
      }

      if (sortedJobs) {
        vacancyDispatch({
          type: "SORT_JOBS",
          payload: sortedJobs
        })
      }
    }
  }

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
          let jobTypes = vacancyData?.data?.__type?.enumValues

          const findJobTypeDescription = (data) => {
            let job = jobTypes.find(({name}) => name === data.jobType);
            return job.description
          }

          const {edges} = vacancyData.data.vacancies;
          if (edges.length > 0) {
            jobs = edges.map((edge) => edge.node);
            // Update the context api once the data is fetched successfully.
            if (vacancyState.jobsData.length === 0) {
              vacancyDispatch({
                type: "ADD_DATA",
                payload: jobs
              });
            }
          }
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
                    {vacancyState.sortedJobs.length > 0 ? vacancyState.sortedJobs.map((job, index) => (
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
                            <span className="listing-type">{findJobTypeDescription(job)}</span>
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
              <VacancyFilter sortTypes={sortTypes} setSortTypes={setSortTypes} jobTypeSort={jobTypeSort} rate={rate} setRate={setRate} ratePerHour={ratePerHour} loading={loading}/>
            </div>
          </div>
        )
      }}
    </TypedVacanciesQuery>
  );
};

export default Vacancy;
