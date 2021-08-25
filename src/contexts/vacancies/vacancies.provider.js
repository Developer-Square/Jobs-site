import React, { useReducer } from "react";
import { VacancyContext } from "./vacancies.context";
import { useLazyQuery } from "react-apollo";
import {
  JobMinQualification,
  JobYearsOfExp,
  JobJobType,
  JobPayRate,
} from "graphql/queries";

export const initialState = {
  loadedData: false,
  jobsData: [],
  sortedJobs: [],
  sortingByPayRate: false,
  jobTypes: [],
  landingPageJobs: [],
  pagesArray: [],
  activeIndex: 1,
  totalCount: 0,
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case "ADD_TOTAL_COUNT":
      return {
        ...state,
        totalCount: payload,
      };
    case "ADD_DATA":
      return {
        ...state,
        jobsData: payload,
        sortedJobs: payload,
        loadedData: true,
      };
    case "SORT_JOBS":
      return {
        ...state,
        sortedJobs: payload,
      };
    case "PAYRATE_SORTING":
      return {
        ...state,
        sortingByPayRate: !initialState.sortingByPayRate,
      };
    case "SET_JOB_TYPES":
      return {
        ...state,
        jobTypes: payload,
      };
    case "SET_VACANCIES_SECTION":
      return {
        ...state,
        landingPageJobs: payload,
      };
    case "ADD_PAGES":
      return {
        ...state,
        pagesArray: payload,
      };
    case "SET_ACTIVE_INDEX":
      return {
        ...state,
        activeIndex: payload,
      };
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
}

export const VacancyProvider = ({ children }) => {
  const [minQualification, setMinQualification] = React.useState(null);
  const [yearsOfExp, setYearsOfExp] = React.useState(null);
  const [jobTypes, setJobType] = React.useState(null);
  const [payRates, setPayRate] = React.useState(null);

  const [fetchMinQualification, { data: minQualificationData }] =
    useLazyQuery(JobMinQualification);
  const [fetchYearsOfExp, { data: yearsOfExpData }] =
    useLazyQuery(JobYearsOfExp);
  const [fetchJobType, { data: jobTypeData }] = useLazyQuery(JobJobType);
  const [fetchPayRate, { data: payRateData }] = useLazyQuery(JobPayRate);

  const getMinQualification = async () => {
    if (!minQualification) {
      await fetchMinQualification();
    }
    return minQualification;
  };
  const getYearsOfExp = async () => {
    if (!yearsOfExp) {
      await fetchYearsOfExp();
    }
    return yearsOfExp;
  };
  const getJobTypes = async () => {
    if (!yearsOfExp) {
      await fetchJobType();
    }
    return jobTypes;
  };
  const getPayRates = async () => {
    if (!yearsOfExp) {
      await fetchPayRate();
    }
    return payRates;
  };
  if (payRateData && !payRates) {
    setPayRate(payRateData.__type.enumValues);
  }
  if (minQualificationData && !minQualification) {
    setMinQualification(minQualificationData.__type.enumValues);
  }
  if (jobTypeData && !jobTypes) {
    setJobType(jobTypeData.__type.enumValues);
  }
  if (yearsOfExpData && !yearsOfExp) {
    setYearsOfExp(yearsOfExpData.__type.enumValues);
  }

  React.useEffect(() => {
    if (!minQualification || !jobTypes || !payRates || !yearsOfExp) {
      setTimeout(function () {}, 1000);
      getMinQualification();
      getYearsOfExp();
      getJobTypes();
      getPayRates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [vacancyState, vacancyDispatch] = useReducer(reducer, initialState);
  return (
    <VacancyContext.Provider
      value={{
        minQualification,
        yearsOfExp,
        jobTypes,
        payRates,
        vacancyState,
        vacancyDispatch,
      }}
    >
      {children}
    </VacancyContext.Provider>
  );
};
