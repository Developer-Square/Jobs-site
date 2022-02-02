import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useLazyQuery } from "react-apollo";
import Fade from "react-reveal/Fade";
import { PaymentModal } from "modals/PaymentModal";
import { landingVacancyLimit } from "constants/constants";
import { VACANCIES_QUERY } from "graphql/queries";
import { VacancyContext } from "contexts/vacancies/vacancies.context";
import {
  getDBIdFromGraphqlId,
  checkDate,
  checkJobType,
  findJobTypeDescription,
  formatCurrency,
  truncateText,
  findPayRateDescription,
} from "utils";
import LogoImage from "image/job-list-logo-04.png";
import Loader from "components/Loader/Loader";
import VacancyLoader from "components/Loader/VacancyLoader";
import Button from "components/Button/Button";
import NoResultFound from "components/NoResult/NoResult";
import MobileStepper from "@material-ui/core/MobileStepper";
import { getClosingDate } from "utils";
import UserContext from "contexts/user/user.provider";

const Vacancies = () => {
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
    // if (!verified) {
    //   history.push(`vacancies/${getDBIdFromGraphqlId(route, "Vacancy")}`);
    // } else {
    //   handleModalShow();
    // }
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

  return (
    <div className="container-x">
      {/* Re-using the payment modal to remind the seeker/employer to pay for the denied services */}
      <PaymentModal open={show} onClose={handleModalShow} moreInfo={true} />
      {/* Recent Jobs */}
      <div className="eleven columns">
        <div className="padding-right">
          <h3 className="font-bold text-2xl transition duration-500 my-2">
            Recent Jobs
          </h3>
          <hr className="my-1 rounded border-b-2 border-blue-800 w-8" />
          <div className="listings-container">
            {vacancyState?.sortedJobs?.length ? (
              vacancyState?.sortedJobs.map((job, index) => {
                if (loading && !vacancyState.sortedJobs) {
                  return (
                    <Fade bottom cascade>
                      <VacancyLoader />
                      <VacancyLoader />
                      <VacancyLoader />
                    </Fade>
                  );
                }
                if (loading && !vacancyState.sortedJobs) {
                  return (
                    <Fade>
                      <NoResultFound />
                    </Fade>
                  );
                }
                return (
                  // Listing
                  <Fade key={index} collapse bottom>
                    <JobContainer
                      className={`listing ${checkJobType(
                        findJobTypeDescription(job, jobTypes),
                      )}`}
                      key={index}
                      onClick={() => handleClick(job.id)}
                    >
                      <div className="listing-logo">
                        <img
                          src={job?.postedBy?.logo?.url || LogoImage}
                          alt={job?.postedBy?.logo?.alt || "TheDB_company_logo"}
                        />
                      </div>
                      <div className="listing-title">
                        <h4>
                          {job?.title}
                          {"  "}

                          <span className="listing-type">
                            {findJobTypeDescription(job, jobTypes)}
                          </span>
                        </h4>
                        <strong style={{ fontSize: "10px" }}>
                          {getClosingDate(job?.closingDate)}
                        </strong>
                        <ul className="listing-icons">
                          <li>
                            <i className="ln ln-icon-Management" />{" "}
                            {job?.postedBy?.name}
                          </li>
                          <li>
                            <i className="ln ln-icon-Map2" /> {job?.location}
                          </li>
                          <li>
                            <i className="ln ln-icon-Money-2" />{" "}
                            {formatCurrency(job?.amount)}
                          </li>
                          <li>
                            <div
                              className={`listing-date ${checkDate(
                                job?.createdAt,
                              )}`}
                            >
                              {checkDate(job?.createdAt)}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </JobContainer>
                  </Fade>
                );
              })
            ) : (
              <Fade bottom>
                <NoResultFound />
              </Fade>
            )}
          </div>

          <Button
            className="popup-with-zoom-anim button centered"
            onClick={() => {
              history.push(`/vacancies`);
            }}
            title={
              <div style={{ color: "#FFFFFF" }}>
                <i className="fa fa-plus-circle" /> Show More Jobs
              </div>
            }
          />
          <div className="margin-bottom-55" />
        </div>
      </div>
      {/* Job Spotlight */}
      <div className="five columns">
        <h3 className="font-bold text-2xl transition duration-500 margin-bottom-5">
          Spotlight
        </h3>
        <hr className="my-1 rounded border-b-2 border-blue-800 w-8" />
        {vacancyState?.sortedJobs?.length ? (
          <>
            <div className="showbiz-navigation">
              <MobileStepper
                steps={vacancyState?.sortedJobs?.length}
                position="static"
                activeStep={activeStep}
                nextButton={
                  activeStep === vacancyState?.sortedJobs?.length - 1 ? null : (
                    <div
                      size="small"
                      onClick={handleNext}
                      disabled={
                        activeStep === vacancyState?.sortedJobs?.length - 1
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
                            {vacancyState?.sortedJobs[activeStep].title}{" "}
                            <span
                              className={`${checkJobType(
                                findJobTypeDescription(
                                  vacancyState?.sortedJobs[activeStep],
                                  jobTypes,
                                ),
                              )}`}
                            >
                              {findJobTypeDescription(
                                vacancyState?.sortedJobs[activeStep],
                                jobTypes,
                              )}
                            </span>
                          </h4>
                        </a>
                        <strong style={{ fontSize: "10px" }}>
                          {getClosingDate(
                            vacancyState?.sortedJobs[activeStep]?.closingDate,
                          )}
                        </strong>
                        <span>
                          <i className="fa fa-briefcase" />{" "}
                          {vacancyState?.sortedJobs[activeStep]?.postedBy?.name}
                        </span>
                        <span>
                          <i className="fa fa-map-marker" />{" "}
                          {vacancyState?.sortedJobs[activeStep]?.location}
                        </span>
                        <span>
                          <i className="fa fa-money" />{" "}
                          {formatCurrency(
                            vacancyState?.sortedJobs[activeStep]?.amount,
                          )}{" "}
                          /{" "}
                          {findPayRateDescription(
                            vacancyState?.sortedJobs[activeStep],
                            payRates,
                          )}
                        </span>
                        <p>
                          {truncateText(
                            vacancyState?.sortedJobs[activeStep]
                              ?.descriptionPlaintext,
                            250,
                          )}

                          {}
                        </p>
                        <Link
                          to={{ pathname: "" }}
                          onClick={() =>
                            history.push(
                              `vacancies/${getDBIdFromGraphqlId(
                                vacancyState?.sortedJobs[activeStep]?.id,
                                "Vacancy",
                              )}`,
                            )
                          }
                          className="button"
                        >
                          Apply For This Job
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
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

const JobContainer = styled.div`
  cursor: pointer;
`;

export default Vacancies;
