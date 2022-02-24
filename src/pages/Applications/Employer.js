import React from "react";
import { useLazyQuery } from "react-apollo";
import { GET_APPLICATIONS } from "graphql/queries";
import { UPDATE_APPLICATION } from "graphql/mutations";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { EMPLOYER_VACANCIES_QUERY } from "graphql/queries";
import { getClosingDate, getDBIdFromGraphqlId } from "utils";
import { vacancyType } from "utils/vacancy";

import { useHistory } from "react-router-dom";

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedApplicationsQuery = TypedQuery(GET_APPLICATIONS);

const Loading = () => {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <div className="bg-white px-2 py-2 flex my-2 rounded-lg shadow">
        <div className="p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-100 h-10 w-10" />
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-gray-100 rounded" />
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-100 rounded col-span-2" />
                  <div className="h-2 bg-gray-100 rounded col-span-1" />
                </div>
                <div className="h-2 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const EmployerApplications = ({ deviceType }) => {
  const history = useHistory();
  const [vacancies, setVacancies] = React.useState();
  // eslint-disable-next-line no-unused-vars
  const [pageCount, setPageCount] = React.useState(9);

  const [loadFilterValues, { data: vacanciesData, loading, fetchMore }] =
    useLazyQuery(EMPLOYER_VACANCIES_QUERY, {
      fetchPolicy: "network",
      onCompleted: (data) => {
        setVacancies(data.employerVacancies.edges.map((edge) => edge.node));
      },
    });

  const callLoadFilters = (
    beforeValue = "",
    afterValue = "",
    firstLimit = 0,
    lastLimit = 0,
  ) => {
    // const cleanedFilterObj = clean(filterObj);
    const after = afterValue;
    const before = beforeValue;
    const variables = {
      first: firstLimit,
      last: lastLimit,
      // filter: cleanedFilterObj,
      after,
      before,
      // sortBy: {
      //   direction: "ASC",
      //   field: "TITLE",
      // },
    };
    // const cleanedVariables = clean(variables);
    loadFilterValues({ variables: variables });
  };

  React.useEffect(() => {
    callLoadFilters(null, null, pageCount, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const redirectToApplicationsPage = (job) => {
    history.push({
      pathname: `/dashboard/applications/${getDBIdFromGraphqlId(
        job.id,
        job?.__typename,
      )}`,
      state: { job: job },
    });
  };

  const handleLoadMore = () =>
    fetchMore({
      query: EMPLOYER_VACANCIES_QUERY,
      variables: {
        first: pageCount,
        after: vacanciesData.employerVacancies.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        console.log("dddd", previousResult, fetchMoreResult);
        const vacancies = {
          ...previousResult.employerVacancies,
          edges: [
            ...previousResult.employerVacancies.edges,
            ...fetchMoreResult.employerVacancies.edges,
          ],
          pageInfo: fetchMoreResult.employerVacancies.pageInfo,
        };

        if (!fetchMoreResult) {
          return previousResult;
        }
        // setVacancies(
        //   vacancies?.employerVacancies.edges.map((edge) => edge.node),
        // );

        return vacancies;
      },
    });
  //   (prev, next) => ({
  //     ...prev,
  //     products: {
  //       ...prev.employerVacancies,
  //       edges: [
  //         ...prev.employerVacancies.edges,
  //         ...next.employerVacancies.edges,
  //       ],
  //       pageInfo: next.employerVacancies.pageInfo,
  //     },
  //   }),
  //   {
  //     after: vacanciesData.employerVacancies.pageInfo.endCursor,
  //   },
  // );

  return (
    <div class="border rounded-t-lg bg-gray-100">
      <div className="bg-white md:flex md:items-center md:justify-between shadow rounded-t-lg p-2">
        {/* search container  */}

        <div>
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Job Applications
            </h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            {/* <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div> */}
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
        </div>

        <div className="flex sm:justify-center space-x-6">
          <a href className="text-gray-500 hover:text-gray-900">
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
      <div class="container my-6 mx-auto md:px-6">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
          {loading ? (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          ) : (
            vacancies?.map((job, i) => {
              return job ? (
                <div
                  className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                  key={i}
                >
                  <div className="bg-white px-2 py-2 flex my-2 rounded-lg shadow">
                    <div className="flex-1">
                      <div className="flex">
                        <div className="w-24 pr-5">
                          {vacancyType(job)?.vacancyImage}
                        </div>
                        <div className="flex-1">
                          <div
                            className="flex flex-column w-full flex-none text-xs text-blue-700 font-medium "
                            style={{
                              color: vacancyType(job)?.vacancyColor,
                            }}
                          >
                            {vacancyType(job)?.vacancyType}{" "}
                          </div>
                          <h2 className="flex-auto text-lg font-medium">
                            {job?.title}
                          </h2>
                          <small>({getClosingDate(job?.closingDate)})</small>
                          <div className="flex py-1 text-sm text-gray-500">
                            <div className="flex-1 inline-flex items-center">
                              <span className="m-2 hover:text-green-500 rounded-lg">
                                <i className="fa fa-map-marker" />
                              </span>
                              <p className>{job?.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex p-2 pb-2 border-t border-gray-200 " />
                      <div className="flex space-x-3 text-sm font-medium ml-auto">
                        <div className="flex-auto flex space-x-3">
                          <button
                            onClick={() => {
                              redirectToApplicationsPage(job);
                            }}
                            className="mb-2 md:mb-0 bg-white px-4 py-2 shadow-sm tracking-wider border text-gray-600 rounded-full hover:bg-gray-100 inline-flex items-center space-x-2 "
                          >
                            <span className="text-green-400 hover:text-green-500 rounded-lg">
                              <i className="fa fa-user" />
                            </span>
                            <span>
                              {job?.numberOfApplications} Applications{" "}
                              <i className="fa fa-arrow-right" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <section className="text-black">
                  <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <div className="text-center lg:w-2/3 w-full">
                      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium	 text-black font-mono">
                        You do not have any jobs posted at this time.
                      </h1>
                      <p className="leading-relaxed mb-8 font-normal">
                        To start posting and get candidates fast, use the
                        TheDatabase job posting services to get up and running
                        fast.
                      </p>
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            history.push(`/dashboard/vacancies/add-job`)
                          }
                          className="border-2 border-black  text-black block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-gray-900 hover:text-pink-500 transition ease-in-out duration-700"
                        >
                          Start Posting
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })
          )}
        </div>
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          <span className="text-xs xs:text-sm text-gray-900">
            Showing {vacanciesData?.employerVacancies?.edges?.length} of{" "}
            {vacanciesData?.employerVacancies?.totalCount} Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={handleLoadMore}
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerApplications;
