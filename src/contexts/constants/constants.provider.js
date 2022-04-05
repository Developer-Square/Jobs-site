import React, { createContext, memo, useEffect, useState } from "react";
import { useLazyQuery } from "react-apollo";
import { vacancyType } from "utils/vacancy";
import { cleanSelectData } from "helpers";
import {
  GET_INDUSTRIES,
  GET_INSTITUTIONS,
  GET_SKILLS,
  JobMinQualification,
  JobYearsOfExp,
  JobJobType,
  JobPayRate,
  ApplicationStatus,
  SeekerStatus,
  SeekerGender,
  EmployerWorkForce,
  InstitutionStudentCount,
  SeekerNationality,
  EducationItemLevel,
  ScreeningQuestionType,
} from "graphql/queries";

const defaultState = {
  industries: [],
  institutions: [],
  skills: [],
  experience: [],
  qualification: [],
  jobType: [],
  payRate: [],
  applicationStatus: [],
  seekerStatus: [],
  seekerGender: [],
  institutionCount: [],
  seekerNationality: [],
  educationLevel: [],
  workForce: [],
  screeningQuestionType: [],
  getIndustries: () => [],
  getInstitutions: () => [],
  getExperience: () => [],
  getPayRate: () => [],
  getQualification: () => [],
  getJobType: () => [],
  getApplicationStatus: () => [],
  getSeekerStatus: () => [],
  getSeekerGender: () => [],
  getInstitutionCount: () => [],
  getSeekerNationality: () => [],
  getEducationLevel: () => [],
  getScreeningQuestionType: () => [],
  getWorkForce: () => [],
  getSkills: () => [],
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
  const [institutions, setInstitutions] = useState();
  const [skills, setSkills] = useState();
  const [experience, setExperience] = useState();
  const [payRate, setPayRate] = useState();
  const [qualification, setQualification] = useState();
  const [jobType, setJobType] = useState();
  const [applicationStatus, setApplicationStatus] = useState();
  const [seekerStatus, setSeekerStatus] = useState();
  const [seekerGender, setSeekerGender] = useState();
  const [institutionCount, setInstitutionCount] = useState();
  const [seekerNationality, setSeekerNationality] = useState();
  const [educationLevel, setEducationLevel] = useState();
  const [workForce, setWorkForce] = useState();
  const [screeningQuestionType, setScreeningQuestionType] = useState();

  const [fetchIndustriesData] = useLazyQuery(GET_INDUSTRIES, {
    onCompleted: (data) => setIndustries(cleanIndustries(data.allIndustries)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchInstitutionsData] = useLazyQuery(GET_INSTITUTIONS, {
    onCompleted: (data) =>
      setInstitutions(cleanIndustries(data.allInstitutions)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchSkillsData] = useLazyQuery(GET_SKILLS, {
    onCompleted: (data) => setSkills(cleanIndustries(data.allSkills)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchQualificationData] = useLazyQuery(JobMinQualification, {
    onCompleted: (data) =>
      setQualification(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchNationalityData] = useLazyQuery(SeekerNationality, {
    onCompleted: (data) =>
      setSeekerNationality(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchEducationLevel] = useLazyQuery(EducationItemLevel, {
    onCompleted: (data) =>
      setEducationLevel(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
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
      setWorkForce(cleanSelectData(data?.__type?.enumValues)),
    fetchPolicy: "cahce-and-network",
  });
  const [fetchScreeningQuestionTypeData] = useLazyQuery(ScreeningQuestionType, {
    onCompleted: (data) =>
      setScreeningQuestionType(cleanSelectData(data?.__type?.enumValues)),
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
    fetchInstitutionsData();
    fetchQualificationData();
    fetchYearsOfExpData();
    fetchJobTypeData();
    fetchPayRateData();
    fetchApplicationStatusData();
    fetchSeekerStatusData();
    fetchSeekerGendersData();
    fetchEmployeeWorkForceData();
    fetchInstitutionStudentCountData();
    fetchNationalityData();
    fetchEducationLevel();
    fetchSkillsData();
    fetchScreeningQuestionTypeData();
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
  const getSkills = () => {
    if (skills) {
      return skills;
    }
    return fetchSkillsData();
  };
  const getInstitutions = () => {
    if (institutions) {
      return institutions;
    }
    return fetchInstitutionsData();
  };
  const getExperience = () => {
    if (experience) {
      return experience;
    }
    return fetchYearsOfExpData();
  };
  const getSeekerNationality = () => {
    if (seekerNationality) {
      return seekerNationality;
    }
    return fetchNationalityData();
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
  const getEducationLevel = () => {
    if (educationLevel) {
      return educationLevel;
    }
    return fetchEducationLevel();
  };
  const getInstitutionCount = () => {
    if (institutionCount) {
      return institutionCount;
    }
    return fetchInstitutionStudentCountData();
  };
  const getWorkForce = () => {
    if (workForce) {
      return workForce;
    }
    return fetchEmployeeWorkForceData();
  };
  const getScreeningQuestionType = () => {
    if (screeningQuestionType) {
      return screeningQuestionType;
    }
    return fetchScreeningQuestionTypeData();
  };

  return (
    <ConstantsContext.Provider
      value={{
        industries,
        institutions,
        skills,
        experience,
        qualification,
        jobType,
        payRate,
        applicationStatus,
        seekerStatus,
        seekerGender,
        workForce,
        institutionCount,
        vacancyType,
        seekerNationality,
        educationLevel,
        screeningQuestionType,
        getSkills,
        getIndustries,
        getInstitutions,
        getExperience,
        getPayRate,
        getQualification,
        getJobType,
        getApplicationStatus,
        getSeekerStatus,
        getSeekerGender,
        getSeekerNationality,
        getInstitutionCount,
        getEducationLevel,
        getWorkForce,
        getScreeningQuestionType,
      }}
    >
      {children}
    </ConstantsContext.Provider>
  );
};

export default ConstantsContext;

const memoizedProvider = memo(ConstantsProvider);

export { memoizedProvider as ConstantsProvider };
