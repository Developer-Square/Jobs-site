import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useLazyQuery } from "react-apollo";
import Fade from "react-reveal/Fade";
import { PaymentModal } from "modals/PaymentModal";
import { landingVacancyLimit } from "constants/constants";
import { VACANCIES_QUERY } from "graphql/queries";
import { VacancyContext } from "contexts/vacancies/vacancies.context";
import VacancyLoader from "components/Loader/VacancyLoader";
import LogoImage from "image/job-list-logo-04.png";
import {
  getDBIdFromGraphqlId,
  checkJobType,
  findJobTypeDescription,
  formatCurrency,
  truncateText,
  findPayRateDescription,
} from "utils";
import Button from "components/Button/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import { getClosingDate } from "utils";
import UserContext from "contexts/user/user.provider";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";

import { GET_RECENT_SEEKERS } from "graphql/queries";

import { TypedQuery } from "core/queries";

export const TypedSeekersQuery = TypedQuery(GET_RECENT_SEEKERS);

const Users = () => {
  const history = useHistory();
  const [verified, setVerified] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [jobTypes, setJobTypes] = React.useState([]);
  const { payRates, vacancyState, vacancyDispatch } =
    React.useContext(VacancyContext);
  const { user } = React.useContext(UserContext);
  const [activeStep, setActiveStep] = React.useState(0);

  const cleanVacanciesData = (edges) => {
    let jobs;

    if (edges.length > 0) {
      jobs = edges.map((edge) => edge.node);
      if (vacancyState.jobsData.length === 0) {
        vacancyDispatch({
          type: "ADD_DATA",
          payload: jobs,
        });
      }
    }
  };

  const onCompleted = (loading, data) => {
    if (!loading) {
      cleanVacanciesData(data.vacancies.edges);
      setJobTypes(data?.__type?.enumValues);
    }
  };

  const [loadFilterValues, { loading, data }] = useLazyQuery(VACANCIES_QUERY, {
    onCompleted: () => onCompleted(loading, data),
    fetchPolicy: "cache-and-network",
  });
  const checkVerified = () => {
    if (user) {
      if (user.verified) {
        setVerified((curr) => (curr = true));
      } else {
        setVerified((curr) => (curr = false));
      }
    }
  };

  React.useEffect(() => {
    checkVerified();
    // Only fetch if context API is empty.
    if (vacancyState.jobsData.length === 0) {
      loadFilterValues({
        variables: {
          first: landingVacancyLimit,
          sortBy: { direction: "DESC", field: "CREATED_AT" },
        },
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleClick = (route) => {
    history.push(`vacancies/${getDBIdFromGraphqlId(route, "Vacancy")}`);
    console.log(verified);
  };

  const handleModalShow = () => {
    setShow(!show);
  };

  function handleNext() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const seekerVariables = {
    first: landingVacancyLimit,
    sortBy: {
      direction: "DESC",
      field: "CREATED_AT",
    },
  };

  const spotlightVariables = {
    first: landingVacancyLimit,
    sortBy: {
      direction: "DESC",
      field: "CREATED_AT",
    },
  };

  return (
    <div className="container-x">
      {/* Re-using the payment modal to remind the seeker/employer to pay for the denied services */}
      <PaymentModal open={show} onClose={handleModalShow} moreInfo={true} />
      {/* Recent Jobs */}
      <div className="eleven columns">
        <div className="padding-right">
          <h3 className="font-bold text-3xl transition duration-500 margin-bottom-25">
            Recent Seekers
          </h3>
          <hr className="my-1 rounded border-b-2 border-blue-800 w-8" />
          <div className="listings-container">
            <NetworkStatus>
              {(isOnline) => (
                <TypedSeekersQuery variables={seekerVariables}>
                  {(seekersList) => {
                    if (seekersList.loading) {
                      return (
                        <Fade bottom cascade>
                          <VacancyLoader />
                          <VacancyLoader />
                          <VacancyLoader />
                        </Fade>
                      );
                    }
                    if (!isOnline) {
                      return <OfflinePlaceholder />;
                    }
                    return (
                      <div className="listings-container">
                        {seekersList.data.seekers.edges.map(
                          ({ node: seeker }, index) => {
                            return (
                              <Fade key={index} collapse bottom>
                                <JobContainer
                                  className={`listing`}
                                  key={index}
                                  onClick={() => handleClick(seeker.id)}
                                >
                                  <div className="listing-logo">
                                    <img
                                      src={
                                        seeker?.user?.avatar?.url || LogoImage
                                      }
                                      alt={
                                        seeker?.postedBy?.avatar?.alt ||
                                        "TheDB_company_logo"
                                      }
                                    />
                                  </div>
                                  <div className="listing-title">
                                    <h4>
                                      {seeker?.title}
                                      <span className="listing-type">
                                        job, jobTypes
                                        {/* {findJobTypeDescription(job, jobTypes)} */}
                                      </span>
                                    </h4>
                                    <strong style={{ fontSize: "10px" }}>
                                      {getClosingDate(seeker?.createdAt)}
                                    </strong>
                                    <ul className="listing-icons">
                                      <li>
                                        <i className="ln ln-icon-Management" />{" "}
                                        {seeker?.postedBy?.name}
                                      </li>
                                      <li>
                                        <i className="ln ln-icon-Map2" />{" "}
                                        {seeker?.location}
                                      </li>
                                      <li>
                                        <i className="ln ln-icon-Money-2" />{" "}
                                        {formatCurrency(seeker?.amount)}
                                      </li>
                                    </ul>
                                  </div>
                                </JobContainer>
                              </Fade>
                            );
                          },
                        )}
                      </div>
                    );
                  }}
                </TypedSeekersQuery>
              )}
            </NetworkStatus>
          </div>

          <Button
            className="popup-with-zoom-anim button centered"
            onClick={() => {
              history.push(`/vacancies`);
            }}
            title={
              <div style={{ color: "#FFFFFF" }}>
                <i className="fa fa-plus-circle" /> Show More Users
              </div>
            }
          />
          <div className="margin-bottom-55" />
        </div>
      </div>
      {/* Job Spotlight */}
      <div className="five columns">
        <h3 className="font-bold text-3xl transition duration-500 margin-bottom-5">
          Spotlight
        </h3>
        <hr className="my-1 rounded border-b-2 border-blue-800 w-8" />
        <NetworkStatus>
          {(isOnline) => (
            <TypedSeekersQuery variables={spotlightVariables}>
              {(seekersList) => {
                if (seekersList.loading) {
                  return (
                    <Fade bottom cascade>
                      <VacancyLoader />
                      <VacancyLoader />
                      <VacancyLoader />
                    </Fade>
                  );
                }
                if (!isOnline) {
                  return <OfflinePlaceholder />;
                }
                return (
                  <>
                    <div className="showbiz-navigation">
                      <MobileStepper
                        steps={seekersList.data.seekers.edges?.length}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                          activeStep ===
                          seekersList.data.seekers.edges?.length - 1 ? null : (
                            <div
                              size="small"
                              onClick={handleNext}
                              disabled={
                                activeStep ===
                                seekersList.data.seekers.edges?.length - 1
                              }
                              className="sb-navigation-right"
                            >
                              <i className="fa fa-angle-right" />
                            </div>
                          )
                        }
                        backButton={
                          activeStep === 0 ? null : (
                            <div
                              size="small"
                              onClick={handleBack}
                              disabled={activeStep === 0}
                              className="sb-navigation-left"
                            >
                              <i className="fa fa-angle-left" />
                            </div>
                          )
                        }
                      />
                    </div>
                    <div className="clearfix" />
                    {/* Showbiz Container */}
                    <div id="vacancies-spotlight" className="showbiz-container">
                      <div
                        className="showbiz"
                        data-left="#showbiz_left_1"
                        data-right="#showbiz_right_1"
                        data-play="#showbiz_play_1"
                      >
                        <div className="">
                          <ul>
                            <li>
                              <div className="job-spotlight">
                                <a href="/">
                                  <h4>
                                    {
                                      seekersList.data.seekers.edges[activeStep]
                                        .node.title
                                    }
                                    <span
                                      className={`${checkJobType(
                                        findJobTypeDescription(
                                          seekersList.data.seekers.edges[
                                            activeStep
                                          ].node,
                                          jobTypes,
                                        ),
                                      )}`}
                                    >
                                      {findJobTypeDescription(
                                        seekersList.data.seekers.edges[
                                          activeStep
                                        ].node,
                                        jobTypes,
                                      )}
                                    </span>
                                  </h4>
                                </a>
                                <strong style={{ fontSize: "10px" }}>
                                  {getClosingDate(
                                    seekersList.data.seekers.edges[activeStep]
                                      .node?.closingDate,
                                  )}
                                </strong>
                                <span>
                                  <i className="fa fa-briefcase" />{" "}
                                  {
                                    seekersList.data.seekers.edges[activeStep]
                                      .node?.postedBy?.name
                                  }
                                </span>
                                <span>
                                  <i className="fa fa-map-marker" />{" "}
                                  {
                                    seekersList.data.seekers.edges[activeStep]
                                      .node?.location
                                  }
                                </span>
                                <span>
                                  <i className="fa fa-money" />{" "}
                                  {formatCurrency(
                                    seekersList.data.seekers.edges[activeStep]
                                      .node?.amount,
                                  )}{" "}
                                  /{" "}
                                  {findPayRateDescription(
                                    seekersList.data.seekers.edges[activeStep]
                                      .node,
                                    payRates,
                                  )}
                                </span>
                                <p>
                                  {truncateText(
                                    seekersList.data.seekers.edges[activeStep]
                                      .node?.descriptionPlaintext,
                                    250,
                                  )}

                                  {}
                                </p>
                                <Link
                                  to={{ pathname: "" }}
                                  onClick={() =>
                                    history.push(
                                      `vacancies/${getDBIdFromGraphqlId(
                                        seekersList.data.seekers.edges[
                                          activeStep
                                        ].node?.id,
                                        "Vacancy",
                                      )}`,
                                    )
                                  }
                                  className="button"
                                >
                                  View This User
                                </Link>
                              </div>
                            </li>
                          </ul>
                          <div className="clearfix" />
                        </div>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </>
                );
              }}
            </TypedSeekersQuery>
          )}
        </NetworkStatus>
      </div>
    </div>
  );
};

const JobContainer = styled.div`
  cursor: pointer;
`;

export default Users;
