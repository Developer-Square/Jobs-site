import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { findIndex } from "lodash";
import Loader from "components/Loader/Loader";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";

import { GET_JOB_APPLICATIONS } from "graphql/queries";

import { UPDATE_APPLICATION } from "graphql/mutations";
import { MetaWrapper } from "components/Meta";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { cleanSelectData, showNotification } from "helpers";
import moment from "moment";
import { useRouteMatch } from "react-router";
import { getGraphqlIdFromDBId } from "utils";
import { getStatus } from "utils/vacancy";
import UserImage from "image/user.jpg";
import ModalContext from "contexts/modal/modal.provider";

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedApplicationsQuery = TypedQuery(GET_JOB_APPLICATIONS);

const ApplicationCard = (props) => {
  const { emitter, events } = React.useContext(ModalContext);
  const markFavourite = () => {
    props?.patchApplication({
      variables: {
        id: props?.application?.id,
        favourite: !props?.application?.favourite,
        status: props?.statusData?.find(
          ({ value }) => value === props?.application?.status,
        )?.value,
      },
    });
  };
  const handleEdit = (d) => emitter.emit(events.UPDATE_APPLICATION_MODAL, d);

  return (
    <div>
      <div className="w-full mx-auto z-10">
        <div className="flex flex-col">
          <div className="bg-white border border-white shadow-lg  rounded-3xl p-4 m-4">
            <div className="flex-none sm:flex items-center">
              <div className=" relative h-32 w-32 sm:mb-0 mb-3">
                {props?.application?.applicant?.avatar?.url ? (
                  <img
                    src={
                      props?.application?.applicant?.avatar?.url || UserImage
                    }
                    alt="p"
                    className="w-32 h-32 object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-32 h-32 object-cover rounded-2xl">
                    {getStatus(props?.application?.status)?.statusImage}
                  </div>
                )}
              </div>
              <div className="flex-auto sm:ml-5 justify-evenly">
                <div className="flex items-center justify-between sm:mt-2">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                        {props?.application?.applicant?.fullName}
                      </div>

                      <div className="flex-auto text-gray-500 my-1">
                        <span
                          className={`m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer`}
                          style={{
                            backgroundColor: getStatus(
                              props?.application?.status,
                            )?.color,
                            color: "#fff",
                          }}
                        >
                          {getStatus(props?.application?.status)?.fancyName}
                        </span>
                        <span className="mr-3 border-r border-gray-200  max-h-0" />
                        <span className="mr-3 ">
                          {props?.application?.applicant?.seeker?.title}
                        </span>
                      </div>
                      <div className="flex-auto text-gray-500 my-1">
                        {props?.application?.applicant?.seeker?.status ===
                          "OPEN" && (
                          <div
                            className="sidebar-link"
                            style={{
                              padding: "5px",
                              fontSize: "10px",
                            }}
                          >
                            <img
                              alt="open to jobs"
                              style={{ zoom: 0.5 }}
                              src={
                                "https://developers.turing.com/static/media/openToOffers.c87ed54c.svg"
                              }
                            />{" "}
                            Open to offers
                          </div>
                        )}
                        {props?.application?.applicant?.seeker?.status ===
                          "BUSY" && (
                          <div
                            className="sidebar-link"
                            style={{
                              padding: "5px",
                              fontSize: "10px",
                            }}
                          >
                            <img
                              alt="open to jobs"
                              style={{ zoom: 0.5 }}
                              src={
                                "https://developers.turing.com/static/media/not_available_for_work.2848971e.svg"
                              }
                            />{" "}
                            Busy
                          </div>
                        )}
                        {props?.application?.applicant?.seeker?.status ===
                          "LOOKING" && (
                          <div
                            className="sidebar-link"
                            style={{
                              padding: "5px",
                              fontSize: "10px",
                            }}
                          >
                            <img
                              alt="open to jobs"
                              style={{ zoom: 0.5 }}
                              src={
                                "https://developers.turing.com/static/media/available_for_work.74e15aac.svg"
                              }
                            />{" "}
                            Actively Looking
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <a
                    href
                    onClick={() => {
                      markFavourite();
                    }}
                    className="flex flex-row items-center mb-auto justify-end "
                  >
                    {props?.application?.favourite ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-yellow-500"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5 text-yellow-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>
                    )}
                  </a>
                </div>

                <div className="flex flex-row items-center">
                  <div className="flex"></div>
                </div>
                <div className="flex pt-2  text-sm text-gray-500">
                  <div className="flex-1 inline-flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                    </svg>
                    <p className>
                      Applied :{" "}
                      {moment(props?.application?.createdAt)?.fromNow()}
                    </p>
                  </div>
                  <div className="flex-1 inline-flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className>
                      Profile Completion :{" "}
                      {props?.application?.applicant?.progress}%
                    </p>
                  </div>
                  <button
                    onClick={() => handleEdit(props?.application)}
                    className="flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
                  >
                    Shortlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const JobApplications = () => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [jobArray, setJobArray] = React.useState([]);
  const [jobId, setJobId] = React.useState(
    getGraphqlIdFromDBId(match.params.jobID, "Vacancy"),
  );
  console.log(jobId);
  React.useEffect(() => {
    setJobId(getGraphqlIdFromDBId(match.params.jobID, "Vacancy"));
    setJobArray([
      ...jobArray,
      getGraphqlIdFromDBId(match.params.jobID, "Vacancy"),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let statusData;
  let applications;

  const newApps = (data) => {
    let newArr = applications;
    const app = data?.patchApplication?.application;
    const idx = findIndex(newArr, ["id", app.id]);
    newArr[idx] = app;
    applications = newArr;
    // setApplications((oldArr) => newArr);
    return newArr;
  };
  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedApplicationsQuery
          variables={{
            first: 30,
            filter: {
              jobs: jobArray,
            },
          }}
        >
          {(applicationsList) => {
            if (applicationsList.loading) {
              return <Loader />;
            }
            let applicationStatus = [];
            if (applicationsList.data) {
              applicationStatus = cleanSelectData(
                applicationsList.data.__type.enumValues,
              );
              // setCompanies((curr) => applicationsList.data.applications);
              applications = applicationsList.data.jobApplications.edges.map(
                (edge) => edge.node,
              );
              statusData = applicationStatus;
            }
            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
            return (
              <MetaWrapper
                meta={{
                  description: "Applications Page",
                  title: "Applications Page",
                }}
              >
                <TypedUpdateApplicationMutation
                  onCompleted={(data, errors) => {
                    newApps(data);
                    showNotification(
                      data.patchApplication,
                      errors,
                      null,
                      "vacancyErrors",
                      `${
                        data?.patchApplication?.application?.applicant?.fullName
                      } ${
                        data?.patchApplication?.application?.favourite
                          ? "added to"
                          : "removed from"
                      } favourites`,
                    );
                  }}
                >
                  {(patchApplication) => {
                    return (
                      <div>
                        <div className="bg-white md:flex md:items-center md:justify-between shadow rounded-t-lg p-2">
                          <div className="flex items-center flex-shrink-0 text-gray-800">
                            <div className="flex justify-center pr-8">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-14 w-14 text-indigo-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                />
                              </svg>
                              <div className="pl-2">
                                <p className="text-2xl font-bold text-indigo-600">
                                  {location?.state?.job?.title}{" "}
                                  <span className="text-xs block text-gray-800">
                                    <small>
                                      {
                                        location?.state?.job
                                          ?.numberOfApplications
                                      }{" "}
                                      application
                                      {location?.state?.job
                                        ?.numberOfApplications > 1 && "s"}
                                    </small>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* search container  */}

                          {/* <div class="container mx-auto px-2 flex items-center">
                            <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden lg:flex items-center">
                              <input
                                className="border-l border-gray-300 bg-transparent font-semibold text-sm pl-4"
                                type="text"
                                placeholder="I'm searching for ..."
                              />
                              <svg
                                className="ml-auto h-5 px-4 text-gray-500"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="far"
                                data-icon="search"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                                />
                              </svg>
                            </div>
                          </div> */}
                          <button
                            onClick={() => {
                              history.push(`/dashboard/applications`);
                            }}
                            className="mb-2 md:mb-0 bg-white px-4 py-2 shadow-sm tracking-wider border text-gray-600 rounded-full hover:bg-gray-100 inline-flex items-center space-x-2 "
                          >
                            <span className="text-green-400 hover:text-green-500 rounded-lg">
                              <i className="fa fa-arrow-left" />
                            </span>
                            <span>Back to all Jobs</span>
                          </button>
                          <div className="flex sm:justify-center space-x-6">
                            <a
                              href
                              className="text-gray-500 hover:text-gray-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                        <div className=" grid grid-cols-5">
                          <div class="col-span-1 bg-white lg:block hidden">
                            <nav className=" rounded-md flex-col justify-between">
                              <div className=" bg-white">
                                <div className="pl-10">
                                  <ul className="space-y-8 pt-10 pb-10">
                                    {statusData?.map((status, k) => {
                                      const getCount = () => {
                                        if (status?.label === "Applied") {
                                          return location?.state?.job
                                            ?.appliedCount;
                                        }
                                        if (status?.label === "Shortlisted") {
                                          return location?.state?.job
                                            ?.shortlistedCount;
                                        }
                                        if (status?.label === "Accepted") {
                                          return location?.state?.job
                                            ?.acceptedCount;
                                        }
                                        if (status?.label === "Rejected") {
                                          return location?.state?.job
                                            ?.rejectedCount;
                                        }
                                      };
                                      return (
                                        <li
                                          className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer"
                                          key={k}
                                        >
                                          {/* <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                                           </svg>  /> */}

                                          <a href>{status?.label}</a>
                                          <span className="-left-3 -top-3 bg-green-500 flex justify-center items-center rounded-full w-6 h-6 text-gray-50 font-bold">
                                            {getCount()}
                                          </span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </nav>{" "}
                          </div>
                          <div class="lg:col-span-4 col-span-5 bg-indigo-50 space-y-8">
                            {applications?.length > 0 ? (
                              applications.map((application, i) => {
                                return (
                                  <ApplicationCard
                                    application={application}
                                    job={location?.state?.job}
                                    statusData={statusData}
                                    patchApplication={patchApplication}
                                    key={i}
                                  />
                                );
                              })
                            ) : (
                              <section className="text-black">
                                <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                                  <div className="text-center lg:w-2/3 w-full">
                                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium	 text-black font-mono">
                                      You do not have any applications for{" "}
                                      {location?.state?.job?.title} at this
                                      time.
                                    </h1>
                                    <p className="leading-relaxed mb-8 font-normal">
                                      To fast track your listing, consider
                                      Contacting TheDatabase team to help
                                      promote your job and get the best
                                      candidates.
                                    </p>
                                    <div className="flex justify-center">
                                      <button
                                        onClick={() =>
                                          history.push(`/contact-us`)
                                        }
                                        className="border-2 border-black  text-black block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-gray-900 hover:text-pink-500 transition ease-in-out duration-700"
                                      >
                                        <span className="mr-2">
                                          {" "}
                                          <i className="fa fa-phone" />
                                        </span>
                                        Contact Us
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </TypedUpdateApplicationMutation>
              </MetaWrapper>
            );
          }}
        </TypedApplicationsQuery>
      )}
    </NetworkStatus>
  );
};

export default JobApplications;
