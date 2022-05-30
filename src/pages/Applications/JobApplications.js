import React from "react";
import { useHistory } from "react-router-dom";
import { findIndex } from "lodash";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Loader from "components/Loader/Loader";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import NoResultFound from "components/NoResult/NoResult";
import { GET_JOB_APPLICATIONS } from "graphql/queries";
import { useQuery } from "react-apollo";
import { UPDATE_APPLICATION } from "graphql/mutations";
import { MetaWrapper } from "components/Meta";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { cleanSelectData, showNotification } from "helpers";
import moment from "moment";
import { useRouteMatch } from "react-router";
import { getGraphqlIdFromDBId, getDBIdFromGraphqlId } from "utils";
import { getStatus } from "utils/vacancy";
import UserImage from "image/user.jpg";
// import ModalContext from "contexts/modal/modal.provider";
import { VACANCY_DETAIL_QUERY } from "graphql/queries";
import Slide from "containers/Slide/Slide";
import { useDeviceType } from "helpers/useDeviceType";
import { useSidebar } from "contexts/sidebar/use-sidebar";
import ConstantsContext from "contexts/constants/constants.provider";
// import CoursesSearch from "components/CoursesSearch/CoursesSearch";
import { stringify as stringifyQs } from "query-string";

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedApplicationsQuery = TypedQuery(GET_JOB_APPLICATIONS);

const animatedComponents = makeAnimated();

const progressColor = (y) => {
  const x = ((y * 100) / 6).toFixed(0);

  if (x > 50) {
    return "green";
  }
  if (x >= 25 && x <= 50) {
    return "yellow";
  }
  if (x < 25 && x > 10) {
    return "gray";
  }
  if (x <= 10) {
    return "red";
  }

  return "red";
};

const ApplicationCard = (props) => {
  const history = useHistory();
  const match = useRouteMatch();
  // const { emitter, events } = React.useContext(ModalContext);
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
  // const handleEdit = (d) => emitter.emit(events.UPDATE_APPLICATION_MODAL, d);
  const handleEdit = (d) => {
    history.push(
      `/dashboard/applications/${match.params.jobID}/${getDBIdFromGraphqlId(
        props.application.id,
        props.application?.__typename,
      )}`,
    );
  };

  return (
    <div className="w-full mx-auto z-10">
      <div className="flex flex-col">
        <div className="bg-white flex items-center p-4 m-4 mb-0 rounded-xl shadow border">
          <div className="flex items-center space-x-4">
            {props?.application?.applicant?.avatar?.url ? (
              <img
                src={props?.application?.applicant?.avatar?.url || UserImage}
                alt="p"
                className="w-32 h-32 object-cover rounded-2xl"
              />
            ) : (
              <div className="w-32 object-cover rounded-2xl">
                {getStatus(props?.application?.status)?.statusImage}
              </div>
            )}
          </div>
          <div className="flex-grow p-3">
            <div className="font-semibold text-gray-700">
              {props?.application?.applicant?.fullName}
            </div>
            <div className="text-sm text-gray-500">
              <span className="mr-3 text-lg font-bold leading-none text-gray-500">
                {props?.application?.applicant?.seeker?.title}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              <div className="flex-1 inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                </svg>
                <p>
                  Applied : {moment(props?.application?.createdAt)?.fromNow()}
                </p>
                {props?.application?.applicant?.seeker.location && (
                  <>
                    <i className="fa fa-map-marker ml-2" />
                    <p>{props?.application?.applicant?.seeker.location}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          {props?.showProgress && (
            <div className="p-2">
              <div
                className={`flex justify-center items-center content-center bg-${progressColor(
                  props?.application?.rank,
                )}-500 shadow-md hover:shadow-lg h-20 w-20 rounded-full fill-current text-white`}
              >
                {`${((props?.application?.rank * 100) / 6).toFixed(0)}% match`}
              </div>
            </div>
          )}
          <div className="p-2">
            <button
              onClick={() => handleEdit(props?.application)}
              className="flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
            >
              View Application
            </button>
          </div>
          <div className="p-2">
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
        </div>
      </div>
    </div>
  );
};

const JobApplications = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const { isOpen, toggleSidebar } = useSidebar();
  const userAgent = navigator.userAgent;
  const {
    seekerGender,
    seekerStatus,
    seekerNationality,
    institutions,
    skills,
  } = React.useContext(ConstantsContext);
  const { mobile, tablet, desktop } = useDeviceType(userAgent);
  const [jobArray, setJobArray] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState("Applied");
  const [showProgress, setShowProgress] = React.useState(false);

  const [genderFilter, setGenderFilter] = React.useState(null);
  const [statusFilter, setStatusFilter] = React.useState(null);
  const [nationalityFilter, setNationalityFilter] = React.useState(null);
  const [skillsFilter, setSkillsFilter] = React.useState(null);
  const [institutionsFilter, setInstitutionsFilter] = React.useState(null);
  const [searchString, setSearchString] = React.useState("");

  const { data, loading: vacancyLoading } = useQuery(VACANCY_DETAIL_QUERY, {
    variables: {
      id: match.params.jobID
        ? getGraphqlIdFromDBId(match.params.jobID, "Vacancy")
        : "",
    },
  });

  React.useEffect(() => {
    setJobArray([
      ...jobArray,
      getGraphqlIdFromDBId(match.params.jobID, "Vacancy"),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const gender = genderFilter && genderFilter.map((a) => a.label);
    const skills = skillsFilter && skillsFilter.map((a) => a.label);
    const institutions =
      institutionsFilter && institutionsFilter.map((a) => a.label);
    const status = statusFilter && statusFilter.map((a) => a.label);
    const nationality =
      nationalityFilter && nationalityFilter.map((a) => a.label);

    const shortlistObj = { gender, skills, institutions, status, nationality };

    const qs = stringifyQs(shortlistObj);
    setSearchString(qs);
    console.log("red", qs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    genderFilter,
    skillsFilter,
    institutionsFilter,
    statusFilter,
    nationalityFilter,
  ]);

  console.log(genderFilter, statusFilter, skillsFilter);

  const selectedFilters = () => {
    let selectedListFilter = [];
    if (genderFilter) {
      selectedListFilter.push(
        ...genderFilter.map((sf) => sf.label + ":bg-gray-400"),
      );
    }
    if (statusFilter) {
      selectedListFilter.push(
        ...statusFilter.map((sf) => sf.label + ":bg-blue-800"),
      );
    }
    if (nationalityFilter) {
      selectedListFilter.push(
        ...nationalityFilter.map((sf) => sf.label + ":bg-yellow-500"),
      );
    }
    if (skillsFilter) {
      selectedListFilter.push(
        ...skillsFilter.map((sf) => sf.label + ":bg-gray-800"),
      );
    }
    if (institutionsFilter) {
      selectedListFilter.push(
        ...institutionsFilter.map((sf) => sf.label + ":bg-green-400"),
      );
    }
    return selectedListFilter;
  };

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
  if (vacancyLoading) {
    return <Loader />;
  }
  if (!data) {
    return <NoResultFound />;
  }
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
            if (!applicationsList.data && applicationsList.loading) {
              return <Loader />;
            }
            console.log(applicationsList);
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
            const handleApplyFilters = () => {
              applicationsList.refetch({
                first: 30,
                filter: {
                  jobs: jobArray,
                  shortlist: searchString,
                },
              });
              toggleSidebar();
              setShowProgress(true);
            };
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
                                {data?.vacancy?.title}{" "}
                                <span className="text-xs block text-gray-800">
                                  <small>
                                    {data?.vacancy?.numberOfApplications}{" "}
                                    application
                                    {data?.vacancy?.numberOfApplications > 1 &&
                                      "s"}
                                  </small>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            history.push(`/dashboard/applications`);
                          }}
                          className="mb-2 md:mb-0 bg-white px-4 py-2 shadow-lg tracking-wider border text-gray-600 rounded-full hover:bg-gray-100 inline-flex items-center space-x-2 "
                        >
                          <span className="text-green-400 hover:text-green-500 rounded-lg">
                            <i className="fa fa-arrow-left" />
                          </span>
                          <span>Back</span>
                        </button>
                        <nav className="flex flex-col sm:flex-row border">
                          {statusData?.map((status, k) => {
                            const getCount = () => {
                              if (status?.label === "Applied") {
                                return data?.vacancy?.numberOfApplications;
                              }
                              if (status?.label === "Shortlisted") {
                                return data?.vacancy?.shortlistedCount;
                              }
                              if (status?.label === "Hired") {
                                return data?.vacancy?.acceptedCount;
                              }
                              if (status?.label === "Interviewing") {
                                return data?.vacancy?.interviewingCount;
                              }
                              if (status?.label === "Declined") {
                                return data?.vacancy?.rejectedCount;
                              }
                            };
                            return (
                              <button
                                key={k}
                                onClick={() => setActiveTab(status?.label)}
                                className={`relative ${
                                  activeTab !== status?.label && "bg-gray-200"
                                } text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none overflow-visible ${
                                  activeTab === status?.label &&
                                  "bg-white text-blue-500 border-b-2 font-medium border-blue-500"
                                }`}
                              >
                                {status?.label}({getCount()})
                              </button>
                            );
                          })}
                        </nav>
                        <div className="bg-white md:flex md:items-center md:justify-between shadow rounded-t-lg p-2">
                          {/* search container  */}

                          <div className="container mx-auto px-2 flex items-center">
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
                          </div>

                          <div className="flex sm:justify-center space-x-6">
                            <a
                              href
                              className="flex text-gray-500 hover:text-gray-900"
                              onClick={() => toggleSidebar()}
                            >
                              Shortlist Here
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
                          <Slide deviceType={{ mobile, tablet, desktop }}>
                            {isOpen && (
                              <>
                                <div className="px-4 sm:px-6">
                                  <h2
                                    className="text-lg font-medium text-gray-900"
                                    id="slide-over-title"
                                  >
                                    <button
                                      onClick={handleApplyFilters}
                                      className="px-4 py-2 rounded-md text-sm font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-blue-500 border-blue-800 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
                                    >
                                      Apply Filters
                                    </button>
                                  </h2>
                                </div>
                                <div className="grid grid-cols-1">
                                  <p className="p-2">
                                    Filter by multiple skills{" "}
                                  </p>
                                  <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={skillsFilter}
                                    isMulti
                                    options={skills}
                                    onChange={(val) => setSkillsFilter(val)}
                                  />
                                  <p className="p-2">Filter by institution: </p>
                                  <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    options={institutions}
                                    defaultValue={institutionsFilter}
                                    isMulti
                                    onChange={(val) =>
                                      setInstitutionsFilter(val)
                                    }
                                  />
                                  <p className="p-2">
                                    Filter by Specific Gender:{" "}
                                  </p>
                                  <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    options={seekerGender}
                                    defaultValue={genderFilter}
                                    isMulti
                                    onChange={(val) => setGenderFilter(val)}
                                  />
                                  <p className="p-2">Filter by Nationality: </p>
                                  <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    options={seekerNationality}
                                    defaultValue={nationalityFilter}
                                    isMulti
                                    onChange={(val) =>
                                      setNationalityFilter(val)
                                    }
                                  />
                                  <p className="p-2">
                                    Filter by Seeker Status:{" "}
                                  </p>
                                  <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    options={seekerStatus}
                                    defaultValue={statusFilter}
                                    isMulti
                                    onChange={(val) => setStatusFilter(val)}
                                  />
                                </div>
                                <div className="px-4 sm:px-6">
                                  <h2
                                    className="text-lg font-medium text-gray-900"
                                    id="slide-over-title"
                                  >
                                    Selected Filters
                                  </h2>
                                </div>
                                <div className="flex flex-wrap">
                                  {selectedFilters().map((sf, k) => {
                                    return (
                                      <span
                                        key={k}
                                        className={`m-1 px-3 py-1 rounded-full text-xs font-medium text-white ${
                                          sf.split(":")[1]
                                        } `}
                                      >
                                        {sf.split(":")[0]}
                                      </span>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </Slide>
                        </div>

                        <div className="lg:col-span-4 col-span-5 bg-gray-100 space-y-8">
                          {applications?.length > 0 ? (
                            <>
                              {applications
                                .filter((app) => {
                                  if (activeTab === "Applied") return true;
                                  return (
                                    getStatus(app.status).name === activeTab
                                  );
                                })
                                .map((application, i) => {
                                  return (
                                    <ApplicationCard
                                      application={application}
                                      job={data?.vacancy}
                                      statusData={statusData}
                                      patchApplication={patchApplication}
                                      key={i}
                                      showProgress={showProgress}
                                    />
                                  );
                                })}
                              {applicationsList.data &&
                              applicationsList.loading ? (
                                <Loader />
                              ) : null}
                            </>
                          ) : (
                            <section className="text-black">
                              <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                                <div className="text-center lg:w-2/3 w-full">
                                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium	 text-black font-mono">
                                    You do not have any applications for{" "}
                                    {data?.vacancy?.title} at this time.
                                  </h1>
                                  <p className="leading-relaxed mb-8 font-normal">
                                    To fast track your listing, consider
                                    Contacting TheDatabase team to help promote
                                    your job and get the best candidates.
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
                        {/* </div> */}
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
