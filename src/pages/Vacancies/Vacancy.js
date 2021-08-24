import React, { useContext } from "react";
import { useLazyQuery } from "react-apollo";
import { Link, useHistory } from "react-router-dom";
import VacancyFilter from "./VacancyFilter";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import { VacancyContext } from "contexts/vacancies/vacancies.context";
import { AuthContext } from "contexts/auth/auth.context";
import { VACANCIES_QUERY } from "graphql/queries";
import PaginationItem from "./PaginationItem";
import LogoImage from "image/thedb.png";
import {
  getDBIdFromGraphqlId,
  checkDate,
  checkJobType,
  findJobTypeDescription,
  onCompleted,
} from "utils";

const Vacancy = () => {
  const [rate, setRate] = React.useState([]);
  const [getJobs, setGetJobs] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState([]);
  const [sortByValue, setSortByValue] = React.useState({
    direction: "",
    field: "",
  });
  const { vacancyState, vacancyDispatch } = useContext(VacancyContext);
  const [filterObj, setFilterObj] = React.useState({
    search: "",
    jobTypes: [],
  });
  const {
    authState: { isAuthenticated, profile },
  } = useContext(AuthContext);
  const history = useHistory();
  const redirectToVacancyPage = (job) => {
    history.push(`vacancies/${getDBIdFromGraphqlId(job.id, "Vacancy")}`);
  };

  const ratePerHour = () => {
    let sortedJobs = [];

    if (rate.length > 0) {
      vacancyDispatch({
        type: "PAYRATE_SORTING",
      });
      let upperLimit = rate[0].upperLimit;
      let lowerLimit = rate[0].lowerLimit;
      // Map over all the rates to find the lowest limit and highest upper limit.
      rate.map((rateObj) => {
        if (rateObj.lowerLimit < lowerLimit) {
          lowerLimit = rateObj.lowerLimit;
        }

        if (rateObj.upperLimit > upperLimit) {
          upperLimit = rateObj.upperLimit;
        }
        return null;
      });

      vacancyState.sortedJobs.map((vacancy) => {
        if (vacancy.payRate === "HOUR") {
          // Add the jobs that are offer 10001+ hourly payments.
          if (upperLimit === 10001 && vacancy?.salary > upperLimit) {
            sortedJobs.push(vacancy);
          }
          if (lowerLimit < vacancy?.salary && vacancy?.salary < upperLimit) {
            sortedJobs.push(vacancy);
          }
        }
        return null;
      });
      vacancyDispatch({
        type: "SORT_JOBS",
        payload: sortedJobs,
      });
    }
  };

  // For the sortByInput.
  const [loadFilterValues, { loading, data }] = useLazyQuery(VACANCIES_QUERY, {
    onCompleted: () =>
      onCompleted(
        loading,
        data,
        "refetch",
        rate,
        ratePerHour,
        vacancyState,
        vacancyDispatch,
        getJobs,
      ),
    fetchPolicy: "cache-and-network",
  });

  const clean = (obj) => {
    for (let propName in obj) {
      if (
        obj[propName] === "" ||
        obj[propName].length === 0 ||
        obj[propName] === 0
      ) {
        delete obj[propName];
      }

      if (obj[propName] && obj[propName].constructor === Object) {
        // Remove a property from the variables object if it has no keys or values are undefined.
        if (
          Object.keys(obj[propName]).length === 0 ||
          Object.values(obj[propName])[0] === undefined
        ) {
          delete obj[propName];
        }
      }
    }
    return obj;
  };

  // Make the api call
  const callLoadFilters = (
    beforeValue = "",
    afterValue = "",
    firstLimit = 0,
    lastLimit = 0,
  ) => {
    const cleanedFilterObj = clean(filterObj);
    const variables = {
      first: firstLimit,
      last: lastLimit,
      filter: cleanedFilterObj,
      after: afterValue,
      before: beforeValue,
      sortBy: {
        direction: sortByValue.direction,
        field: sortByValue.field,
      },
    };
    console.log("variables", variables);
    const cleanedVariables = clean(variables);
    loadFilterValues({ variables: cleanedVariables });
  };

  const buttonRedirect = () => {
    if (isAuthenticated) {
      if (profile.isEmployer) {
        history.push(`/dashboard/vacancies/add-job`);
      }
      if (profile.isSeeker) {
        history.push(`/dashboard`);
      }
    } else {
      history.push(`/auth/login`);
    }
  };

  return (
    <div>
      <div id="titlebar">
        <div className="container">
          <div className="ten columns">
            {loading ? (
              <span>Hold on as we get the data ...</span>
            ) : (
              <>
                <span>We found {vacancyState?.totalCount} matching:</span>
                <h2>
                  {Object.values(clean(filterObj)).length === 0
                    ? "All Vacancies"
                    : undefined}
                  {clean(filterObj)?.jobTypes
                    ? `${clean(filterObj)?.jobTypes.toString()}`
                    : undefined}
                  {clean(filterObj)?.search
                    ? `  || ${clean(filterObj)?.search}`
                    : undefined}
                </h2>
              </>
            )}
          </div>

          <div className="six columns">
            {isAuthenticated ? (
              <Button
                className="popup-with-zoom-anim button mt-8 ml-auto"
                onClick={buttonRedirect}
                title={
                  <p style={{ color: "#FFFFFF" }}>
                    {profile?.isSeeker && "View Dashboard stats"}
                    {profile?.isEmployer && "Post a Job, It’s Free!"}
                  </p>
                }
              />
            ) : undefined}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Recent Jobs */}
        <div className="eleven columns">
          <div className="padding-right">
            <div className="listings-container">
              {/* Listings */}
              {vacancyState?.sortedJobs?.length > 0 ? (
                vacancyState?.sortedJobs.map((job, index) => (
                  <Link
                    to={{
                      pathname: "",
                    }}
                    onClick={() => redirectToVacancyPage(job)}
                    key={index}
                    className={`listing ${checkJobType(
                      findJobTypeDescription(job, vacancyState.jobTypes),
                    )}`}
                  >
                    <div className="listing-logo">
                      <img
                        src={job?.postedBy?.logo?.url || LogoImage}
                        alt={job?.postedBy?.logo?.alt || "TheDB_company_logo"}
                      />
                    </div>
                    <div className="listing-title">
                      <h4>
                        {job.title}
                        <span className="listing-type">
                          {findJobTypeDescription(job, vacancyState.jobTypes)}
                        </span>
                      </h4>
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
                          {job?.amount?.currency} {job?.amount?.amount}
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
                  </Link>
                ))
              ) : (
                <Loader />
              )}
            </div>
            <div className="clearfix" />
            <PaginationItem
              loading={loading}
              data={data}
              loadFilterValues={loadFilterValues}
              sortByValue={sortByValue}
              callLoadFilters={callLoadFilters}
            />
          </div>
        </div>
        <VacancyFilter
          rate={rate}
          setRate={setRate}
          ratePerHour={ratePerHour}
          loading={loading}
          getJobs={getJobs}
          setGetJobs={setGetJobs}
          loadFilterValues={loadFilterValues}
          sortByValue={sortByValue}
          setSortByValue={setSortByValue}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          callLoadFilters={callLoadFilters}
          filterObj={filterObj}
          setFilterObj={setFilterObj}
          clean={clean}
        />
      </div>
    </div>
  );
};

export default Vacancy;
