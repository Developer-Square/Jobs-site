import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useQuery } from "react-apollo";
import { toast } from "react-toastify";
import { useMutation } from "react-apollo";
import { VACANCY_DETAIL_QUERY } from "graphql/queries";
import Loader from "components/Loader/Loader";
import NoResultFound from "components/NoResult/NoResult";
import DraftRenderer from "components/DraftRenderer/DraftRenderer";
import Bookmark from "./Bookmark";
import {
  checkJobType,
  getClosingDate,
  findJobTypeDescription,
  getDBIdFromGraphqlId,
  getGraphqlIdFromDBId,
} from "utils";
import Button from "components/Button/Button";
import got from "image/got.jpg";
import FormikControl from "containers/FormikContainer/FormikControl";
import { TypedMutation } from "core/mutations";
import { AuthContext } from "contexts/auth/auth.context";
import UserContext from "contexts/user/user.provider";
import { CREATE_APPLICATION, CREATE_SCREENING_ANSWER } from "graphql/mutations";
import { showNotification } from "helpers";
import ConstantsContext from "contexts/constants/constants.provider";
import { normalizeErrors } from "helpers";
import { maybe } from "core/utils";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

export const TypedCreateApplicationMutation = TypedMutation(CREATE_APPLICATION);
const options = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const ApplicationForm = () => {
  const match = useRouteMatch();
  const alert = useAlert();
  const history = useHistory();
  const { data, loading } = useQuery(VACANCY_DETAIL_QUERY, {
    variables: {
      id: match.params.vacancyID
        ? getGraphqlIdFromDBId(match.params.vacancyID, "Vacancy")
        : "",
    },
  });

  const {
    profile,
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);
  const { user } = React.useContext(UserContext);
  const { jobType: jT } = React.useContext(ConstantsContext);
  const handleLoginNotification = () => {
    toast.error("You must login to save this job");
  };
  console.log("some some goooooo", jT);
  const jobType = jT?.find(({ value }) => value === data?.vacancy?.jobType);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <div>
        <NoResultFound />
      </div>
    );
  }
  console.log(data);

  return (
    <div className="bg-white pt-10">
      <div
        id="titlebar"
        className="with-transparent-header parallax background"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(33 39 127 / 0.80), rgb(33 39 127 / 0.80)), url(${got})`,
        }}
      >
        <div className="container-x">
          <div className="ten columns">
            <p className={"text-base text-white"}>
              {data?.vacancy?.industry?.name}
            </p>
            <h2 className={"text-base text-white"}>
              {data?.vacancy?.title}{" "}
              <span
                className={`${checkJobType(
                  findJobTypeDescription(
                    data?.vacancy,
                    data?.__type?.enumValues,
                  ),
                )}`}
              >
                {jobType?.description}
              </span>
            </h2>
            <p className={"text-base text-white"}>
              <i className="fa fa-eye text-gray-200" />{" "}
              {data?.vacancy?.timesViewed}{" "}
              <span className={"text-base text-white"}>
                {data?.vacancy?.timesViewed === 1 ? "View" : "Views"}
              </span>
            </p>
          </div>
          <div className="six columns">
            {profile?.isSeeker && (
              <Bookmark
                handleLoginNotification={handleLoginNotification}
                isAuthenticated={isAuthenticated}
                data={data}
                toast={toast}
                alert={alert}
              />
            )}
            {profile?.isEmployer && profile.email === data.creator.email ? (
              <Button
                className="popup-with-zoom-anim button mt-8 ml-auto"
                title={<div style={{ color: "#FFFFFF" }}> Edit Job</div>}
                onClick={() => {
                  history.push(
                    `/dashboard/vacancies/edit-job/${getDBIdFromGraphqlId(
                      data?.id,
                      data?.__typename,
                    )}`,
                  );
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="pt-6 mt-10">
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 ">
            {/* This example requires Tailwind CSS v2.0+ */}
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  {data?.vacancy?.title}
                </h2>
                <div className="mt-1 flex sflex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    {/* Heroicon name: solid/briefcase */}
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    {data?.vacancy?.postedBy?.name}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    {/* Heroicon name: solid/location-marker */}
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {data?.vacancy?.location}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    {/* Heroicon name: solid/calendar */}
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {getClosingDate(data?.vacancy?.closingDate)}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <span>
                  {user?.isSeeker && (
                    <Bookmark
                      customClass={
                        "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      }
                      handleLoginNotification={handleLoginNotification}
                      isAuthenticated={isAuthenticated}
                      data={data?.vacancy}
                      toast={toast}
                      alert={alert}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
          {/* Options */}
          <div className="py-10 lg:pt-6 lg:pb-16 col-start-1 lg:col-span-2">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  <DraftRenderer
                    content={JSON.parse(data?.vacancy?.description)}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="lg:border-l lg:border-gray-200 mt-4 lg:mt-0 lg:row-span-3 lg:pl-8">
            <ApplicationSeekerForm vacancy={data?.vacancy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;

const ApplicationSeekerForm = ({ vacancy }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const [resumeType, setResumeType] = React.useState();
  const { user, userData, getUser, setRefetchUser } =
    React.useContext(UserContext);
  const [applicationID, setApplicationID] = React.useState(null);
  const [ans, setAns] = React.useState();
  const [vacancyID, setVacancyID] = React.useState(
    getGraphqlIdFromDBId(match.params.vacancyID, "Vacancy"),
  );
  const [createAns] = useMutation(CREATE_SCREENING_ANSWER, {
    onCompleted: (data) => {
      setRefetchUser((prev) => !prev);
    },
  });

  React.useEffect(() => {
    if (!user) {
      getUser();
    }
    const answerList = vacancy?.screeningQuestions?.reduce((arr, q) => {
      const obj = {
        application: applicationID,
        applicant: userData?.me?.id,
        question: q.id,
        answer: "",
      };
      arr.push(obj);
      return arr;
    }, []);
    setAns(answerList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    setVacancyID(getGraphqlIdFromDBId(match.params.vacancyID, "Vacancy"));
  }, [match.params.vacancyID]);

  const changeAns = (qnID, answer) => {
    const item = {
      application: applicationID,
      applicant: userData?.me?.id,
      question: qnID,
      answer: answer,
    };
    let newAns = ans;
    console.log(qnID);
    newAns.forEach((element, index) => {
      if (element.question === item.question) {
        newAns[index] = item;
      }
    });
    // let arr2 = [];
    // arr2.push({
    //   application: applicationID,
    //   applicant: userData?.me?.id,
    //   question: qnID,
    //   answer: answer,
    // });
    // const newAns = ans.map((obj) => arr2.find((o) => o.id === obj.id) || obj);
    setAns(newAns);
  };
  const answerQns = (application) => {
    for (let i = 0; i < ans.length; i++) {
      const element = ans[i];
      element.application = application;
      element.answer = element.answer.toString();
      element.applicant = userData?.me?.id;
      createAns({ variables: { ...element } });
    }
    history.push(`/vacancies`);
  };

  const initialValues = {
    job: vacancyID,
    resume: null,
    budget: "",
    comment: "",
    inbuiltResume: null,
    extraAttachment: null,
  };

  const schema = Yup.object().shape({
    comment: Yup.string()
      .min(100, "Enter more than 100 characters")
      .required("This field is required"),
  });
  const cleanResumes = (data) => {
    return data.reduce((arr, b) => {
      arr.push({
        value: b.id,
        label: b.name,
      });
      return arr;
    }, []);
  };
  console.log("ooooo", ans);
  if (!vacancy) return;

  return (
    <TypedCreateApplicationMutation
      onCompleted={(data, errors) =>
        showNotification(
          data.createApplication,
          errors,
          null,
          "errors",
          "Application Created",
          null,
        )
      }
    >
      {(applicationCreate, { loading }) => {
        function onSubmit(values, { setErrors, setSubmitting }) {
          console.log(values);
          const extraAttachment = values?.extraAttachment
            ? { extraAttachment: values?.extraAttachment[0] }
            : {};
          const inbuiltResume = values?.inbuiltResume
            ? { inbuiltResume: values?.inbuiltResume?.value }
            : {};
          const resume = values?.resume ? { resume: values?.resume[0] } : {};

          applicationCreate({
            variables: {
              job: values.job,
              budget: values.budget,
              comment: values.comment,
              status: "APPLIED",
              ...resume,
              ...extraAttachment,
              ...inbuiltResume,
            },
          }).then(({ data }) => {
            if (data) {
              if (data.createApplication) {
                if (!data.createApplication.success) {
                  // setErrors(normalizeErrors(data.updateAccount.errors));
                  setErrors(
                    normalizeErrors(
                      maybe(() => data.createApplication.errors, []),
                    ),
                  );
                } else {
                  setApplicationID(data.createApplication?.application?.id);
                  setRefetchUser((prev) => !prev);
                  answerQns(data.createApplication?.application?.id);
                }
              }
            }
          });
        }
        return (
          <Formik
            validateOnBlur
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                <div className="dashboard-list-box-content text-base text-gray-900">
                  <div className="form">
                    <ul className="list-none m-0 p-0">
                      {vacancy.screeningQuestions?.length > 0
                        ? vacancy.screeningQuestions?.map((qn, i) => (
                          <div className="rounded-sm bg-white shadow p-3 gap-2  hover:shadow-lg transition delay-150 duration-300 ease-in-out ">
                            <li className="mb-2" key={i}>
                              <div className="flex items-center mb-1">
                                <div className="h-4 w-4 z-10">{i + 1}.</div>
                                <div className="flex-1 ml-4 font-medium">
                                  {qn.question}
                                </div>
                              </div>
                              <div className="ml-12">
                                {qn.questionType === "TXT" ||
                                  qn.questionType === "LNG_TXT" ? (
                                  <input
                                    name={qn.id}
                                    type="text"
                                    onChange={(event) =>
                                      changeAns(qn.id, event.target.value)
                                    }
                                  />
                                ) : null}
                                {qn.questionType === "INT" && (
                                  <input
                                    name={qn.id}
                                    type="number"
                                    pattern="[0-9]+"
                                    onChange={(event) =>
                                      changeAns(qn.id, event.target.value)
                                    }
                                  />
                                )}
                                {qn.questionType === "BINARY" && (
                                  <RadioGroup
                                    name={qn.id}
                                    value={
                                      ans?.find((a) => a.question === qn.id)
                                        ?.answer
                                    }
                                    row
                                    style={{ flexFlow: "inherit" }}
                                    onChange={(event) =>
                                      changeAns(qn.id, event.target.value)
                                    }
                                  >
                                    {options.map((option, i) => {
                                      return (
                                        <FormControlLabel
                                          onClick={() =>
                                            changeAns(
                                              qn.id,
                                              document.getElementById(
                                                option.value,
                                              ).value,
                                            )
                                          }
                                          className={`flex items-center`}
                                          style={{ flexDirection: "inherit" }}
                                          value={option.value}
                                          control={
                                            <Radio
                                              id={option.value}
                                              color="primary"
                                            />
                                          }
                                          label={option.label}
                                          labelPlacement="end"
                                          key={i}
                                        />
                                      );
                                    })}
                                  </RadioGroup>
                                )}
                              </div>
                            </li>
                          </div>
                        ))
                        : null}
                    </ul>
                  </div>
                  <div className="form" style={{ width: "100%" }}>
                    <FormikControl
                      control="textarea"
                      label="Cover Letter"
                      name="comment"
                      subText={
                        <small className="text-xs text-gray-500 leading-3">
                          Introduce yourself and explain why you’re a strong
                          candidate for this job. This is the first thing your
                          potential employer will see before looking at your
                          profile.
                        </small>
                      }
                      placeholder="Your message / cover letter sent to the employer"
                      rte={false}
                      fullWidth
                    />
                  </div>
                  <div className="form p-2 w-full shadow p-8 text-gray-700 ">
                    <div
                      onClick={() => setResumeType("inbuilt")}
                      className={`flex-no-shrink bg-blue-800 hover:bg-blue-500 px-3 py-1 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-300 hover:border-blue-500 text-white rounded-full transition ease-in duration-300 ${resumeType === "inbuilt" && " bg-blue-500"
                        }`}
                    >
                      Select Inbuilt Resume
                    </div>
                    <div
                      onClick={() => setResumeType("file")}
                      className={`flex-no-shrink bg-blue-800 hover:bg-blue-500 px-3 py-1 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-300 hover:border-blue-500 text-white rounded-full transition ease-in duration-300 ${resumeType === "file" && " bg-blue-500"
                        }`}
                    >
                      Upload File (PDF Only)
                    </div>
                    {resumeType === "file" && (
                      <FormikControl
                        control="file"
                        type="file"
                        doc={true}
                        restrict={`.pdf`}
                        setFieldValue={formik.setFieldValue}
                        label="Resume"
                        name="resume"
                        minimal
                      />
                    )}
                    {resumeType === "inbuilt" && (
                      <>
                        {user?.resumes?.length > 0 ? (
                          <FormikControl
                            control="select"
                            hideButton={() => { }}
                            label="Resume"
                            name="inbuiltResume"
                            style={{ margin: 0 }}
                            options={cleanResumes(user?.resumes)}
                          />
                        ) : (
                          <p className="text-sm tracking-wider text-gray-700 text-center p-4">
                            No Resumes Found. Use Our CV Builder to get started
                            and have a professionally curated CV.
                            <button
                              onClick={() => history.push(`/dashboard/resume`)}
                              className={`flex-no-shrink bg-blue-100 hover:bg-blue-200 px-3 py-1 text-xs text-gray-800 shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-300 hover:border-blue-500 text-white rounded-full transition ease-in duration-300`}
                            >
                              Build the Perfect CV now!
                            </button>
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  <div className="form">
                    <FormikControl
                      control="file"
                      type="file"
                      doc={true}
                      restrict={`.pdf`}
                      setFieldValue={formik.setFieldValue}
                      label="Extra Attachments (PDF Only)"
                      name="extraAttachment"
                    />
                  </div>
                  <div className="form">
                    <Button
                      type="submit"
                      fullwidth
                      isLoading={formik?.loading}
                      title={formik?.loading ? "Saving... " : "Apply"}
                      className="button margin-top-15"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        );
      }}
    </TypedCreateApplicationMutation>
  );
};
