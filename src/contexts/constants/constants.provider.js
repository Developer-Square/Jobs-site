import React, { createContext, memo, useEffect, useState } from "react";
import { useLazyQuery } from "react-apollo";
import { vacancyType } from "utils/vacancy";
import { cleanSelectData } from "helpers";
import {
  GET_INDUSTRIES,
  JobMinQualification,
  JobYearsOfExp,
  JobJobType,
  JobPayRate,
  ApplicationStatus,
  SeekerStatus,
  SeekerGender,
  EmployerWorkForce,
  InstitutionStudentCount,
} from "graphql/queries";

const defaultState = {
  industries: [],
  experience: [],
  qualification: [],
  jobType: [],
  payRate: [],
  applicationStatus: [],
  seekerStatus: [],
  seekerGender: [],
  institutionCount: [],
  getIndustries: () => [],
  getExperience: () => [],
  getPayRate: () => [],
  getQualification: () => [],
  getJobType: () => [],
  getApplicationStatus: () => [],
  getSeekerStatus: () => [],
  getSeekerGender: () => [],
  getInstitutionCount: () => [],
  vacancyType: () => {},
};

const ConstantsContext = createContext(defaultState);

const cleanIndustries = (data) => {
  return data.reduce((arr, b) => {
    arr.push({
      value: b.id,
      label: b.name,
    });
    return arr;
  }, []);
};

const ConstantsProvider = ({ children }) => {
  const [industries, setIndustries] = useState();
  const [experience, setExperience] = useState();
  const [payRate, setPayRate] = useState();
  const [qualification, setQualification] = useState();
  const [jobType, setJobType] = useState();
  const [applicationStatus, setApplicationStatus] = useState();
  const [seekerStatus, setSeekerStatus] = useState();
  const [seekerGender, setSeekerGender] = useState();
  const [institutionCount, setInstitutionCount] = useState();

  const [fetchIndustriesData] = useLazyQuery(GET_INDUSTRIES, {
    onCompleted: (data) => setIndustries(cleanIndustries(data.allIndustries)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchQualificationData] = useLazyQuery(JobMinQualification, {
    onCompleted: (data) => setQualification(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  })
  const [fetchYearsOfExpData] = useLazyQuery(JobYearsOfExp, {
    onCompleted: (data) =>
      setExperience(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchJobTypeData] = useLazyQuery(JobJobType, {
    onCompleted: (data) =>
      setJobType(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchPayRateData] = useLazyQuery(JobPayRate, {
    onCompleted: (data) =>
      setPayRate(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchApplicationStatusData] = useLazyQuery(ApplicationStatus, {
    onCompleted: (data) =>
      setApplicationStatus(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchSeekerStatusData] = useLazyQuery(SeekerStatus, {
    onCompleted: (data) =>
      setSeekerStatus(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchSeekerGendersData] = useLazyQuery(SeekerGender, {
    onCompleted: (data) =>
      setSeekerGender(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchEmployeeWorkForceData] = useLazyQuery(EmployerWorkForce, {
    onCompleted: (data) =>
      setExperience(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchInstitutionStudentCountData] = useLazyQuery(
    InstitutionStudentCount,
    {
      onCompleted: (data) =>
        setInstitutionCount(cleanSelectData(data?.__type?.enumValues)),
      fetchPolicy: "cahce-and-network",
    },
  );

  const getConstants = () => {
    fetchIndustriesData();
    fetchQualificationData();
    fetchYearsOfExpData();
    fetchJobTypeData();
    fetchPayRateData();
    fetchApplicationStatusData();
    fetchSeekerStatusData();
    fetchSeekerGendersData();
    fetchEmployeeWorkForceData();
    fetchInstitutionStudentCountData();
  };

  useEffect(() => {
    getConstants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIndustries = () => {
    if (industries) {
      return industries;
    }
    return fetchIndustriesData();
  };
  const getExperience = () => {
    if (experience) {
      return experience;
    }
    return fetchYearsOfExpData();
  };
  const getPayRate = () => {
    if (payRate) {
      return payRate;
    }
    return fetchJobTypeData();
  };
  const getQualification = () => {
    if (qualification) {
      return qualification;
    }
    return fetchQualificationData();
  };
  const getJobType = () => {
    if (jobType) {
      return jobType;
    }
    return fetchJobTypeData();
  };
  const getApplicationStatus = () => {
    if (applicationStatus) {
      return applicationStatus;
    }
    return fetchApplicationStatusData();
  };
  const getSeekerStatus = () => {
    if (seekerStatus) {
      return seekerStatus;
    }
    return fetchSeekerStatusData();
  };
  const getSeekerGender = () => {
    if (seekerGender) {
      return seekerGender;
    }
    return fetchSeekerGendersData();
  };
  const getInstitutionCount = () => {
    if (institutionCount) {
      return institutionCount;
    }
    return fetchInstitutionStudentCountData();
  };

  return (
    <ConstantsContext.Provider
      value={{
        industries,
        experience,
        qualification,
        jobType,
        payRate,
        applicationStatus,
        seekerStatus,
        seekerGender,
        institutionCount,
        vacancyType,
        getIndustries,
        getExperience,
        getPayRate,
        getQualification,
        getJobType,
        getApplicationStatus,
        getSeekerStatus,
        getSeekerGender,
        getInstitutionCount,
      }}
    >
      {children}
    </ConstantsContext.Provider>
  );
};

export default ConstantsContext;

const memoizedProvider = memo(ConstantsProvider);

export { memoizedProvider as ConstantsProvider };
