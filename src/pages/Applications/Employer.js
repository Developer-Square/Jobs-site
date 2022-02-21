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

  const [loadFilterValues, { loading }] = useLazyQuery(
    EMPLOYER_VACANCIES_QUERY,
    {
      fetchPolicy: "network",
      onCompleted: (data) => {
        setVacancies(data.employerVacancies.edges.map((edge) => edge.node));
      },
    },
  );

  const callLoadFilters = (
    beforeValue = "",
    afterValue = "",
    firstLimit = 0,
    lastLimit = 0,
  ) => {
    // const cleanedFilterObj = clean(filterObj);
    const variables = {
      first: firstLimit,
      last: lastLimit,
      // filter: cleanedFilterObj,
      after: afterValue,
      before: beforeValue,
      sortBy: {
        direction: "ASC",
        field: "TITLE",
      },
    };
    // const cleanedVariables = clean(variables);
    loadFilterValues({ variables: variables });
  };

  React.useEffect(() => {
    callLoadFilters(null, null, 40, null);
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

  return (
    <div class="border rounded-t-lg bg-gray-100">
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
              return (
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
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerApplications;
