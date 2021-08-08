import React, { useEffect, useContext } from "react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import {useLazyQuery} from 'react-apollo'
import { PaymentModal } from 'modals/PaymentModal'
import { landingVacancyLimit } from 'constants/constants'
import { VACANCIES_QUERY } from './queries'
import { VacancyContext } from 'contexts/vacancies/vacancies.context'
import { getDBIdFromGraphqlId, checkDate, checkJobType, findJobTypeDescription, onCompleted } from 'utils';
import LogoImage from "image/thedb.png";
import Loader from "components/Loader/Loader";


const Vacancies = () => {
  const history = useHistory();
  const [verified, setVerified] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const { vacancyState, vacancyDispatch } = useContext(VacancyContext);

  const [loadFilterValues, { loading, data}] = useLazyQuery(
    VACANCIES_QUERY,
    {
    onCompleted: () => onCompleted(loading, data, 'refetch', '', ()=>{}, vacancyState, vacancyDispatch),
    fetchPolicy: 'cache-and-network'
    },
  )

  useEffect(() => {
    checkVerified()
    // Only fetch if context API is empty.
    if (vacancyState.jobsData.length === 0) { 
      loadFilterValues(
        {variables: { 
          first: landingVacancyLimit,
        }
        }
      );
    }
    // eslint-disable-next-line
  }, [vacancyState.jobTypes.length])

  const checkVerified = () => {
    let profileDetails = localStorage.getItem('thedb_auth_profile');
    profileDetails = JSON.parse(profileDetails)
    
    if(profileDetails) { 
      if (profileDetails.verified) {
        setVerified(curr => curr = true);
      } else {
        setVerified(curr => curr = false);
      }
    }
  }

  const handleClick = (route) => {
    if (!verified) {
      history.push(`vacancies/${getDBIdFromGraphqlId(route, 'Vacancy')}`);
    } else {
      handleModalShow()
    }
  }

  const handleModalShow = () => {
    setShow(!show);
  }

  return (
    <div className="container">
      {/* Re-using the payment modal to remind the seeker/employer to pay for the denied services */}
      <PaymentModal open={show} onClose={handleModalShow} moreInfo={true} />
      {/* Recent Jobs */}
      <div className="eleven columns">
        <div className="padding-right">
          <h3 className="margin-bottom-25">Recent Jobs</h3>
          <div className="listings-container">
            {vacancyState.sortedJobs.length ? vacancyState.sortedJobs.map((job, index) => (
              // Listing
            <JobContainer className={`listing ${checkJobType(findJobTypeDescription(job, vacancyState.jobTypes))}`} key={index} onClick={() => handleClick(job.id)}>
            <div className="listing-logo">
              <img src={job.postedBy.logo?.url || LogoImage} alt={job.postedBy.logo?.alt || "TheDB_company_logo"} />
            </div>
            <div className="listing-title">
              <h4>
                {job.title}
                <span className="listing-type">{findJobTypeDescription(job, vacancyState.jobTypes)}</span>
              </h4>
              <ul className="listing-icons">
                <li>
                  <i className="ln ln-icon-Management" /> {job.postedBy.name}
                </li>
                <li>
                  <i className="ln ln-icon-Map2" /> {job.location}
                </li>
                <li>
                  <i className="ln ln-icon-Money-2" /> {job.amount.currency} {job.amount.amount}
                </li>
                <li>
                <div className={`listing-date ${checkDate(job.createdAt)}`}>{checkDate(job.createdAt)}</div>
                </li>
              </ul>
            </div>
          </JobContainer>
            )) : <Loader />}
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

const JobContainer = styled.div`
  cursor: pointer;
`

export default Vacancies;
