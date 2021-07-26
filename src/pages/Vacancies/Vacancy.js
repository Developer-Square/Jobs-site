import React, {useContext} from "react";
import {useLazyQuery} from 'react-apollo'
import VacancyFilter from "./VacancyFilter";
import Loader from "components/Loader/Loader";
import { VacancyContext } from 'contexts/vacancies/vacancies.context'
import { VACANCIES_QUERY } from './queries'
import PaginationItem from "./PaginationItem";
 

const Vacancy = () => {
  const [rate, setRate] = React.useState([]);
  const [jobTypes, setJobTypes] = React.useState([]);
  const [getJobs, setGetJobs] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState([]);
  const [sortByValue, setSortByValue] = React.useState({direction: '', field: ''});
  const { vacancyState, vacancyDispatch } = useContext(VacancyContext);

  const ratePerHour = () => {
    let sortedJobs = [];
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
        return null;
      })
      
      vacancyState.sortedJobs.map(vacancy => {
        if (vacancy.payRate === 'HOUR') {
          // Add the jobs that are offer 200+ hourly payments.
          if (upperLimit === 201 && vacancy.salary > upperLimit) {
            sortedJobs.push(vacancy);
          }
          if (lowerLimit < vacancy.salary && vacancy.salary < upperLimit) {
            sortedJobs.push(vacancy);
          }
        }
        return null;
      })

      if (sortedJobs) {
        vacancyDispatch({
          type: "SORT_JOBS",
          payload: sortedJobs
        })
      }
    }
  }

  const cleanVacanciesData = (edges, update) => {
    let jobs;

    if (edges.length > 0) { 
      jobs = edges.map((edge) => edge.node);
      // Update the context api once the data is fetched successfully.
      if (vacancyState.jobsData.length === 0) {
        vacancyDispatch({
          type: "ADD_DATA",
          payload: jobs
        });
      } else if (update) {
        // Reverse the vacancies array inorder to display the latests results
        // and present it as it is when we want the oldest results.
        if (getJobs === '-updated_at') {
          jobs = jobs.reverse();
          vacancyDispatch({
            type: "SORT_JOBS",
            payload: jobs
          });
        } else {
          vacancyDispatch({
            type: "SORT_JOBS",
            payload: jobs
          });
        }
      }
      // Sort the object according the rate per hour sorting 
      // if there's any option selected.
      if (rate.length) {
        ratePerHour()
      }
    } else {
      // Dispatch an empty array when there are no results
      vacancyDispatch({
        type: "SORT_JOBS",
        payload: edges
      })
    }
  }

  const onCompleted = (loading, data) => {
    if (!loading) {
      cleanVacanciesData(data.vacancies.edges, true);
      setJobTypes(data?.__type?.enumValues)
    }
  }

  // For the sortByInput.
  const [loadFilterValues, { loading, data}] = useLazyQuery(
    VACANCIES_QUERY,
    {
    onCompleted: () => onCompleted(loading, data),
    fetchPolicy: 'cache-and-network'
   },
  )

  console.log(vacancyState, "vacancyState");



  /**
 * @param  {} data
 * @param  {} jobTypes
 * Maps out the specific jobType description with the right job.
 */
  const findJobTypeDescription = (data, jobTypes) => {
    let job = jobTypes.find(({name}) => name === data.jobType);
    return job ? job.description : null;
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
                      <span className="listing-type">{findJobTypeDescription(job, jobTypes)}</span>
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
            <PaginationItem loading={loading} data={data} loadFilterValues={loadFilterValues} sortByValue={sortByValue}/>
          </div>
        </div>
        <VacancyFilter rate={rate} setRate={setRate} ratePerHour={ratePerHour} loading={loading} getJobs={getJobs} setGetJobs={setGetJobs} loadFilterValues={loadFilterValues} sortByValue={sortByValue} setSortByValue={setSortByValue} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
    </div>
  );
};

export default Vacancy;
