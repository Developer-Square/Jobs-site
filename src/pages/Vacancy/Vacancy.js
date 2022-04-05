import React from "react";
import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import { useMutation } from "react-apollo";
import { useRouteMatch, useHistory } from "react-router-dom";
import moment from "moment";

import Loader from "components/Loader/Loader";
import NetworkStatus from "components/NetworkStatus";
import OfflinePlaceholder from "components/OfflinePlaceholder";
import { MetaWrapper } from "components/Meta";

import { cleanSelectData, setFieldErrors, showNotification } from "helpers";

import VacancyForm from "./VacancyForm";
import { getGraphqlIdFromDBId, getDBIdFromGraphqlId, objDiff } from "utils";
import { isEmpty } from "lodash";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
import { VACANCY_DETAIL_QUERY } from "graphql/queries";
import {
  CREATE_VACANCY_MUTATION,
  UPDATE_VACANCY_MUTATION,
  CREATE_SCREENING_QUESTION,
} from "graphql/mutations";
import {
  JobMinQualification,
  JobJobType,
  JobYearsOfExp,
  GET_INDUSTRIES,
} from "graphql/queries";
import { JobPayRate } from "graphql/queries";
import UserContext from "contexts/user/user.provider";

const TypedVacancyDetailQuery = TypedQuery(VACANCY_DETAIL_QUERY);
const TypedJobMinQualificationQuery = TypedQuery(JobMinQualification);
const TypedJobYearsOfExpQuery = TypedQuery(JobYearsOfExp);
const TypedJobJobTypeQuery = TypedQuery(JobJobType);
const TypedJobPayRateQuery = TypedQuery(JobPayRate);
const TypedIndustriesQuery = TypedQuery(GET_INDUSTRIES);

const TypedVacancyCreateMutation = TypedMutation(CREATE_VACANCY_MUTATION);
const TypedVacancyUpdateMutation = TypedMutation(UPDATE_VACANCY_MUTATION);

const SectionB = ({ isOnline, years, jobType, qualification, payRate }) => {
  const match = useRouteMatch();
  const alert = useAlert();
  const history = useHistory();
  const [updating, setUpdating] = React.useState(false);
  const [publish, setPublish] = React.useState(true);
  // eslint-disable-next-line no-unused-vars
  const [screenQns, setScreenQns] = React.useState([]);
  const { setRefetchUser } = React.useContext(UserContext);

  const [createQn] = useMutation(CREATE_SCREENING_QUESTION, {
    onCompleted: (data) => {
      setRefetchUser((prev) => !prev);
    },
  });

  const initialData = {
    title: "",
    jobType: "",
    minQualification: "",
    yearsOfExp: "",
    salary: 0,
    location: "",
    payRate: "",
    description: "",
    positions: 0,
    closingDate: new Date(),
    applicationUrl: "",
    publish: publish,
    screeningQuestions: [
      {
        questionType: null,
        question: null,
        required: true,
        idealAnswer: null,
      },
    ],
  };
  const cleanIndustries = (data) => {
    return data.reduce((arr, b) => {
      arr.push({
        value: b.id,
        label: b.name,
      });
      return arr;
    }, []);
  };

  const updateScreeningQns = (jobId) => {
    const qns = screenQns?.length ? screenQns : [];
    console.log(qns, screenQns);
    for (let i = 0; i < qns.length; i++) {
      const element = qns[i];
      element.questionType = element.questionType.value;
      element.order = i;
      element.required = true;
      element.job = jobId;
      element.idealAnswer = element.idealAnswer.toString();
      createQn({ variables: { ...element } });
    }
    history.push(`/vacancies/${getDBIdFromGraphqlId(jobId, "Vacancy")}`);
  };

  const cleanFormData = (a, b) => {
    const data = a;
    const oldData = b;
    delete oldData.screeningQuestions;
    delete data.screeningQuestions;
    const jobType = data.jobType.value;
    const minQualification = data.minQualification.value;
    const industry = data.industry.value;
    const yearsOfExp = data.yearsOfExp.value;
    const payRate = data.payRate.value;
    const closingDate = moment(data.closingDate).format("YYYY-MM-DD");
    const originalObject = {
      ...oldData,
      jobType: jobType,
      minQualification: minQualification,
      industry: industry,
      yearsOfExp: yearsOfExp,
      payRate: payRate,
      closingDate: closingDate,
    };
    const newObject = {
      ...data,
      jobType: jobType,
      minQualification: minQualification,
      industry: industry,
      yearsOfExp: yearsOfExp,
      payRate: payRate,
      closingDate: closingDate,
    };

    const id = match.params.vacancyUpdateID
      ? { id: getGraphqlIdFromDBId(match.params.vacancyUpdateID, "Vacancy") }
      : {};
    const formData = isEmpty(objDiff(originalObject, newObject, "id"))
      ? null
      : {
          ...newObject,
          ...id,
          isPublished: publish,
        };

    return formData;
  };

  const cleanInitialValues = (
    data,
    industries,
    years,
    jobType,
    qualification,
    rate,
  ) => {
    const obj = {
      title: data.title,
      industry: industries.find(({ value }) => value === data?.industry.id),
      payRate: rate.find(({ value }) => value === data?.payRate),

      jobType: jobType.find(({ value }) => value === data?.jobType),
      minQualification: qualification.find(
        ({ value }) => value === data?.minQualification,
      ),
      yearsOfExp: years.find(({ value }) => value === data?.yearsOfExp),
      salary: data.salary,
      location: data.location,
      description: data.description,
      positions: data.positions,
      closingDate: new Date(data.closingDate),
      applicationUrl: data.applicationUrl,
    };
    return obj;
  };

  return (
    <TypedIndustriesQuery>
      {(industriesData) => {
        if (industriesData.loading) return <div />;
        let industries = [];
        if (industriesData.data) {
          industries = cleanIndustries(industriesData.data.allIndustries);
        }
        return (
          <TypedVacancyDetailQuery
            variables={{
              id: match.params.vacancyUpdateID
                ? getGraphqlIdFromDBId(match.params.vacancyUpdateID, "Vacancy")
                : "",
            }}
            errorPolicy="all"
            loaderFull
          >
            {(vacancyData) => {
              if (vacancyData.loading) {
                return <Loader />;
              }
              if (vacancyData.errors) {
                toast.error(
                  "Oops! TheDatabase Kenya ran into an unexpected problem",
                );
              }
              let initialValues = initialData;
              if (vacancyData.data && vacancyData.data.vacancy === null) {
                setUpdating(false);
              } else {
                setUpdating(true);
                initialValues = cleanInitialValues(
                  vacancyData.data.vacancy,
                  industries,
                  years,
                  jobType,
                  qualification,
                  payRate,
                );
              }

              if (!isOnline) {
                return <OfflinePlaceholder />;
              }
              return (
                <MetaWrapper
                  meta={{
                    description:
                      vacancyData.data.vacancy === null
                        ? vacancyData.data?.vacancy?.descriptionPlaintext ||
                          vacancyData.data?.vacancy?.seoDescription
                        : "Vacancy Create Page",
                    title:
                      vacancyData.data.vacancy === null
                        ? vacancyData.data?.vacancy?.title ||
                          vacancyData.data?.vacancy?.seoTitle
                        : "Vacancy Create Page",
                  }}
                >
                  <TypedVacancyCreateMutation
                    onCompleted={(data, errors) => {
                      showNotification(
                        data.createVacancy,
                        errors,
                        alert,
                        "vacancyErrors",
                        "Job Created",
                      );
                      if (data?.createVacancy?.job) {
                        updateScreeningQns(data?.createVacancy?.job?.id);
                        setRefetchUser((prev) => !prev);
                      }
                    }}
                  >
                    {(vacancyCreate) => {
                      return (
                        <TypedVacancyUpdateMutation
                          onCompleted={(data, errors) => {
                            showNotification(
                              data.patchVacancy,
                              errors,
                              alert,
                              "vacancyErrors",
                              "Job Updated",
                            );
                            history.push(
                              `/vacancies/${getDBIdFromGraphqlId(
                                data.patchVacancy.job.id,
                                "Vacancy",
                              )}`,
                            );
                          }}
                        >
                          {(vacancyUpdate) => {
                            function onSubmit(
                              values,
                              { setErrors, setSubmitting },
                            ) {
                              setScreenQns(values.screeningQuestions);
                              console.log(values.screeningQuestions);
                              const variables = {
                                variables: cleanFormData(values, initialValues),
                              };
                              if (!cleanFormData(values, initialValues)) {
                                showNotification(
                                  null,
                                  null,
                                  alert,
                                  null,
                                  "No Chages Were Made",
                                );
                              } else {
                                const mutationFn = updating
                                  ? vacancyUpdate(variables)
                                  : vacancyCreate(variables);
                                mutationFn.then(({ data }) => {
                                  if (data) {
                                    setFieldErrors(
                                      updating
                                        ? data.vacancyUpdate
                                        : data.vacancyCreate,
                                      setErrors,
                                    );
                                  }
                                });
                              }
                            }
                            return (
                              <VacancyForm
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                loading={
                                  updating
                                    ? vacancyUpdate.loading
                                    : vacancyCreate.loading
                                }
                                industries={industries}
                                experience={years}
                                qualification={qualification}
                                jobType={jobType}
                                rate={payRate}
                                setPublish={setPublish}
                              />
                            );
                          }}
                        </TypedVacancyUpdateMutation>
                      );
                    }}
                  </TypedVacancyCreateMutation>
                </MetaWrapper>
              );
            }}
          </TypedVacancyDetailQuery>
        );
      }}
    </TypedIndustriesQuery>
  );
};
const Vacancy = () => {
  return (
    <NetworkStatus>
      {(isOnline) => (
        <TypedJobJobTypeQuery>
          {(jobData) => {
            if (jobData.loading) return <div />;
            let jobType = [];
            if (jobData.data) {
              jobType = cleanSelectData(jobData.data.__type.enumValues);
            }
            return (
              <TypedJobMinQualificationQuery>
                {(qualificationData) => {
                  if (qualificationData.loading) return <div />;
                  let qualification = [];
                  if (qualificationData.data) {
                    qualification = cleanSelectData(
                      qualificationData.data.__type.enumValues,
                    );
                  }
                  return (
                    <TypedJobPayRateQuery>
                      {(rateData) => {
                        if (rateData.loading) return <div />;
                        let payRate = [];
                        if (rateData.data) {
                          payRate = cleanSelectData(
                            rateData.data.__type.enumValues,
                          );
                        }
                        return (
                          <TypedJobYearsOfExpQuery>
                            {(yearsData) => {
                              if (yearsData.loading) return <div />;
                              let years = [];
                              if (yearsData.data) {
                                years = cleanSelectData(
                                  yearsData.data.__type.enumValues,
                                );
                              }
                              return (
                                <SectionB
                                  isOnline={isOnline}
                                  years={years}
                                  jobType={jobType}
                                  qualification={qualification}
                                  payRate={payRate}
                                />
                              );
                            }}
                          </TypedJobYearsOfExpQuery>
                        );
                      }}
                    </TypedJobPayRateQuery>
                  );
                }}
              </TypedJobMinQualificationQuery>
            );
          }}
        </TypedJobJobTypeQuery>
      )}
    </NetworkStatus>
  );
};

export default Vacancy;
