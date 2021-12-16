import React from "react";
import { useLazyQuery } from "react-apollo";
import { GET_APPLICATIONS } from "graphql/queries";
import { UPDATE_APPLICATION } from "graphql/mutations";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { VACANCIES_QUERY } from "graphql/queries";
import { getClosingDate, getDBIdFromGraphqlId } from "utils";

import { useHistory } from "react-router-dom";

export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);
export const TypedApplicationsQuery = TypedQuery(GET_APPLICATIONS);

const partTime = (
  <svg
    className="mr-3"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z"
      fill="#D3D3D3"
    ></path>
    <path
      d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z"
      fill="#F35F31"
    ></path>
    <path
      d="M20.6216 20.6219C23.142 18.1015 26.1342 16.1022 29.4273 14.7381C32.7205 13.374 36.25 12.672 39.8145 12.672C43.3789 12.672 46.9085 13.374 50.2016 14.7381C53.4947 16.1022 56.4869 18.1015 59.0074 20.6219C61.5278 23.1424 63.5271 26.1346 64.8912 29.4277C66.2552 32.7208 66.9573 36.2504 66.9573 39.8148C66.9573 43.3793 66.2552 46.9088 64.8912 50.202C63.5271 53.4951 61.5278 56.4873 59.0074 59.0077L49.4109 49.4113C50.6711 48.1511 51.6708 46.6549 52.3528 45.0084C53.0348 43.3618 53.3859 41.5971 53.3859 39.8148C53.3859 38.0326 53.0348 36.2678 52.3528 34.6213C51.6708 32.9747 50.6711 31.4786 49.4109 30.2184C48.1507 28.9582 46.6546 27.9585 45.008 27.2765C43.3615 26.5944 41.5967 26.2434 39.8145 26.2434C38.0322 26.2434 36.2675 26.5944 34.6209 27.2765C32.9743 27.9585 31.4782 28.9582 30.218 30.2184L20.6216 20.6219Z"
      fill="white"
    ></path>
    <path
      d="M59.0073 59.0077C53.917 64.098 47.0131 66.9576 39.8144 66.9576C32.6157 66.9576 25.7118 64.098 20.6215 59.0077C15.5312 53.9174 12.6715 47.0135 12.6715 39.8148C12.6715 32.6161 15.5312 25.7122 20.6215 20.6219L30.2179 30.2183C27.6728 32.7635 26.243 36.2154 26.243 39.8148C26.243 43.4142 27.6728 46.8661 30.2179 49.4112C32.7631 51.9564 36.215 53.3862 39.8144 53.3862C43.4138 53.3862 46.8657 51.9564 49.4108 49.4112L59.0073 59.0077Z"
      fill="#FFCF23"
    ></path>
  </svg>
);

const fullTime = (
  <svg
    className="mr-3"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z"
      fill="#D3D3D3"
    ></path>
    <path
      d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z"
      fill="#3144F3"
    ></path>
    <path
      d="M20.6216 20.6219C23.142 18.1015 26.1342 16.1022 29.4273 14.7381C32.7205 13.374 36.25 12.672 39.8145 12.672C43.3789 12.672 46.9085 13.374 50.2016 14.7381C53.4947 16.1022 56.4869 18.1015 59.0074 20.6219C61.5278 23.1424 63.5271 26.1346 64.8912 29.4277C66.2552 32.7208 66.9573 36.2504 66.9573 39.8148C66.9573 43.3793 66.2552 46.9088 64.8912 50.202C63.5271 53.4951 61.5278 56.4873 59.0074 59.0077L49.4109 49.4113C50.6711 48.1511 51.6708 46.6549 52.3528 45.0084C53.0348 43.3618 53.3859 41.5971 53.3859 39.8148C53.3859 38.0326 53.0348 36.2678 52.3528 34.6213C51.6708 32.9747 50.6711 31.4786 49.4109 30.2184C48.1507 28.9582 46.6546 27.9585 45.008 27.2765C43.3615 26.5944 41.5967 26.2434 39.8145 26.2434C38.0322 26.2434 36.2675 26.5944 34.6209 27.2765C32.9743 27.9585 31.4782 28.9582 30.218 30.2184L20.6216 20.6219Z"
      fill="#8FD7FF"
    ></path>
    <path
      d="M20.6214 59.0077C15.5312 53.9174 12.6715 47.0135 12.6715 39.8148C12.6715 32.6161 15.5312 25.7122 20.6214 20.6219C25.7117 15.5316 32.6156 12.6719 39.8143 12.6719C47.0131 12.6719 53.9169 15.5316 59.0072 20.6219L49.4108 30.2183C46.8656 27.6732 43.4137 26.2434 39.8143 26.2434C36.215 26.2434 32.763 27.6732 30.2179 30.2183C27.6727 32.7635 26.2429 36.2154 26.2429 39.8148C26.2429 43.4141 27.6727 46.8661 30.2179 49.4112L20.6214 59.0077Z"
      fill="white"
    ></path>
  </svg>
);

const volunteering = (
  <svg
    className="mr-3"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z"
      fill="#D3D3D3"
    ></path>
    <path
      d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z"
      fill="#717171"
    ></path>
    <path
      d="M39.8145 12.672C43.3789 12.672 46.9085 13.374 50.2016 14.7381C53.4947 16.1022 56.4869 18.1015 59.0074 20.6219C61.5278 23.1424 63.5272 26.1346 64.8912 29.4277C66.2553 32.7208 66.9573 36.2504 66.9573 39.8148C66.9573 43.3793 66.2553 46.9088 64.8912 50.202C63.5272 53.4951 61.5278 56.4873 59.0074 59.0077C56.4869 61.5282 53.4947 63.5275 50.2016 64.8916C46.9085 66.2556 43.3789 66.9577 39.8145 66.9577L39.8145 53.3863C41.5967 53.3863 43.3615 53.0352 45.008 52.3532C46.6546 51.6712 48.1507 50.6715 49.4109 49.4113C50.6712 48.1511 51.6708 46.655 52.3529 45.0084C53.0349 43.3618 53.3859 41.5971 53.3859 39.8148C53.3859 38.0326 53.0349 36.2678 52.3529 34.6213C51.6708 32.9747 50.6712 31.4786 49.4109 30.2184C48.1507 28.9582 46.6546 27.9585 45.0081 27.2765C43.3615 26.5944 41.5967 26.2434 39.8145 26.2434L39.8145 12.672Z"
      fill="#2E2E2E"
    ></path>
    <path
      d="M12.6715 39.8147C12.6715 32.616 15.5312 25.7121 20.6215 20.6218C25.7117 15.5316 32.6156 12.6719 39.8144 12.6719C47.0131 12.6719 53.917 15.5316 59.0072 20.6218C64.0975 25.7121 66.9572 32.616 66.9572 39.8147L53.3858 39.8147C53.3858 36.2154 51.9559 32.7634 49.4108 30.2183C46.8657 27.6731 43.4137 26.2433 39.8144 26.2433C36.215 26.2433 32.763 27.6732 30.2179 30.2183C27.6728 32.7634 26.2429 36.2154 26.2429 39.8147L12.6715 39.8147Z"
      fill="#FFCF23"
    ></path>
  </svg>
);

const internship = (
  <svg
    className="mr-3"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z"
      fill="#D3D3D3"
    ></path>
    <path
      d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z"
      fill="#EFF331"
    ></path>
    <path
      d="M66.9572 39.8148C66.9572 43.3792 66.2551 46.9088 64.8911 50.2019C63.527 53.495 61.5277 56.4872 59.0073 59.0077C56.4868 61.5281 53.4946 63.5275 50.2015 64.8915C46.9084 66.2556 43.3788 66.9576 39.8144 66.9576C36.2499 66.9576 32.7204 66.2556 29.4272 64.8915C26.1341 63.5275 23.1419 61.5281 20.6215 59.0077C18.101 56.4872 16.1017 53.495 14.7376 50.2019C13.3736 46.9088 12.6715 43.3792 12.6715 39.8148L26.2429 39.8148C26.2429 41.597 26.594 43.3618 27.276 45.0083C27.958 46.6549 28.9577 48.151 30.2179 49.4112C31.4781 50.6714 32.9742 51.6711 34.6208 52.3531C36.2674 53.0352 38.0321 53.3862 39.8144 53.3862C41.5966 53.3862 43.3614 53.0352 45.0079 52.3531C46.6545 51.6711 48.1506 50.6715 49.4108 49.4112C50.671 48.151 51.6707 46.6549 52.3527 45.0083C53.0348 43.3618 53.3858 41.597 53.3858 39.8148L66.9572 39.8148Z"
      fill="#F0FF49"
    ></path>
    <path
      d="M12.6717 39.8148C12.6717 32.616 15.5314 25.7121 20.6216 20.6219C25.7119 15.5316 32.6158 12.6719 39.8145 12.6719C47.0133 12.6719 53.9172 15.5316 59.0074 20.6219C64.0977 25.7121 66.9574 32.616 66.9574 39.8147L53.386 39.8148C53.386 36.2154 51.9561 32.7634 49.411 30.2183C46.8659 27.6732 43.4139 26.2433 39.8145 26.2433C36.2152 26.2433 32.7632 27.6732 30.2181 30.2183C27.673 32.7635 26.2431 36.2154 26.2431 39.8148L12.6717 39.8148Z"
      fill="#1E1E1E"
    ></path>
  </svg>
);
const gig = (
  <svg
    className="mr-3"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z"
      fill="#D3D3D3"
    ></path>
    <path
      d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z"
      fill="#31B9F3"
    ></path>
    <path
      d="M20.6216 20.6219C23.142 18.1015 26.1342 16.1021 29.4273 14.7381C32.7205 13.374 36.25 12.6719 39.8145 12.6719C43.3789 12.6719 46.9085 13.374 50.2016 14.7381C53.4947 16.1021 56.4869 18.1015 59.0074 20.6219C61.5278 23.1424 63.5271 26.1346 64.8912 29.4277C66.2552 32.7208 66.9573 36.2504 66.9573 39.8148C66.9573 43.3793 66.2552 46.9088 64.8912 50.2019C63.5271 53.495 61.5278 56.4873 59.0074 59.0077L49.4109 49.4113C50.6711 48.151 51.6708 46.6549 52.3528 45.0084C53.0348 43.3618 53.3859 41.597 53.3859 39.8148C53.3859 38.0326 53.0348 36.2678 52.3528 34.6212C51.6708 32.9747 50.6711 31.4786 49.4109 30.2184C48.1507 28.9581 46.6546 27.9585 45.008 27.2764C43.3615 26.5944 41.5967 26.2434 39.8145 26.2434C38.0322 26.2434 36.2675 26.5944 34.6209 27.2764C32.9743 27.9585 31.4782 28.9581 30.218 30.2184L20.6216 20.6219Z"
      fill="#31B9F3"
    ></path>
    <path
      d="M64 34.5C64 41.263 61.3661 47.749 56.6777 52.5312C51.9893 57.3134 45.6304 60 39 60C32.3696 60 26.0107 57.3134 21.3223 52.5312C16.6339 47.7491 14 41.263 14 34.5L26.5 34.5C26.5 37.8815 27.817 41.1245 30.1612 43.5156C32.5054 45.9067 35.6848 47.25 39 47.25C42.3152 47.25 45.4946 45.9067 47.8388 43.5156C50.183 41.1245 51.5 37.8815 51.5 34.5L64 34.5Z"
      fill="#23FFD7"
    ></path>
  </svg>
);

const vacancyType = (vacancy) => {
  if (vacancy?.jobType === "FULL_TIME") {
    return {
      vacancyImage: fullTime,
      vacancyColor: "#3144f3",
      vacancyType: "Full Time",
    };
  }
  if (vacancy?.jobType === "PART_TIME") {
    return {
      vacancyImage: partTime,
      vacancyColor: "#f35f31",
      vacancyType: "Part Time",
    };
  }
  if (vacancy?.jobType === "VOLUNTEERING") {
    return {
      vacancyImage: volunteering,
      vacancyColor: "#717171",
      vacancyType: "Volunteering",
    };
  }
  if (vacancy?.jobType === "INTERNSHIP") {
    return {
      vacancyImage: internship,
      vacancyColor: "#eff331",
      vacancyType: "Internship",
    };
  }
  if (vacancy?.jobType === "GIG") {
    return {
      vacancyImage: gig,
      vacancyColor: "#31b9f3",
      vacancyType: "Gig",
    };
  }
};
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

  const [loadFilterValues, { loading }] = useLazyQuery(VACANCIES_QUERY, {
    fetchPolicy: "network",
    onCompleted: (data) => {
      setVacancies(data.vacancies.edges.map((edge) => edge.node));
    },
  });

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
