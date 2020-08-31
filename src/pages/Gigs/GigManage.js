/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CardWrapper, FormWrapper } from "./Gigs.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";
import { useAppState } from "contexts/app/app.provider";
import { useRouteMatch } from "react-router-dom";
import { useStickyDispatch } from "contexts/app/app.provider";
import { Industries } from "pages/common/industry";
import Loader from "components/Loader/Loader";
import Error500 from "components/Error/Error500";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import {
  ListingLogo,
  ListingTitle,
  ListingIcons,
  LeftContent,
  TypeList,
} from "styles/pages.style";
import ImageWrapper from "components/Image/Image";
import { RefundIcon } from "components/AllSvgIcon";
import ModalTemplate from "pages/common/ModalTemplate";
import { H3 } from "styles/pages.style";

function GigManage() {
  const match = useRouteMatch();
  const industry = Industries;
  const [initialValues, setInitialValues] = useState();
  const [editting, setEditting] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [application, setApplication] = useState();
  const [userApplied, setUserApplied] = useState([]);
  const [userShortlisted, setUserShortlisted] = useState([]);
  const [userApproved, setUserApproved] = useState([]);
  const [userRejected, setUserRejected] = useState([]);
  const [reload, setReload] = useState(false);
  const useDispatch = useStickyDispatch();
  const setList = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const setForm = useCallback(() => useDispatch({ type: "EDIT" }), [
    useDispatch,
  ]);
  const currentForm = useAppState("currentForm");
  const isEdit = currentForm === "edit";
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setApplication(false);
    setList();
    setTimeout(() => {
      try {
        axios
          .get(
            `${BASE_URL}/jobs/applications/?job_id=${match.params.jobID}`,
            tokenConfig()
          )
          .then((res) => {
            // const arr = res.data.results;
            // const result = arr.reduce((acc, d) => {
            //   acc.push({
            //     key: d.name,
            //     value: d.id,
            //   });
            //   return acc;
            // }, []);
            setApplicants(res.data.results);
            console.log("applicants", res.data.results);
          })
          .catch((err) => {
            setLoading(false);
            console.log("Catching Errors:", err);
            setError(err);
          });
        axios
          .get(`${BASE_URL}/jobs/${match.params.jobID}/`, tokenConfig())
          .then((res) => {
            const arr = res.data;
            console.log("array jobs", arr);
            // setJob(arr);
            setInitialValues(arr);
            if (arr.id) {
              setEditting(true);
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log("Catching Errors:", error);
            setError(error);
            setLoading(false);
          });
        axios
          .get(`${BASE_URL}/jobs/applications/`, tokenConfig())
          .then((res) => {
            console.log("industry data", res.data.results);
            const shortlisted = res.data.results
              .filter(
                (filteredUsers) =>
                  filteredUsers.job.toString() ===
                    match.params.jobID.toString() &&
                  (filteredUsers.status === "shortlisted" ||
                    filteredUsers.status === "Shortlisted")
              )
              .reduce((arr, b) => {
                arr.push(b.applicant);
                return arr;
              }, []);
            setUserShortlisted(shortlisted);
            const approved = res.data.results
              .filter(
                (filteredUsers) =>
                  filteredUsers.job.toString() ===
                    match.params.jobID.toString() &&
                  (filteredUsers.status === "accepted" ||
                    filteredUsers.status === "Accepted")
              )
              .reduce((arr, b) => {
                arr.push(b.applicant);
                return arr;
              }, []);
            setUserApproved(approved);
            const applied = res.data.results
              .filter(
                (filteredUsers) =>
                  filteredUsers.job.toString() ===
                    match.params.jobID.toString() &&
                  (filteredUsers.status === "applied" ||
                    filteredUsers.status === "Applied")
              )
              .reduce((arr, b) => {
                arr.push(b.applicant);
                return arr;
              }, []);
            setUserApplied(applied);
            const rejected = res.data.results
              .filter(
                (filteredUsers) =>
                  filteredUsers.job.toString() ===
                    match.params.jobID.toString() &&
                  (filteredUsers.status === "rejected" ||
                    filteredUsers.status === "Rejected")
              )
              .reduce((arr, b) => {
                arr.push(b.applicant);
                return arr;
              }, []);
            setUserRejected(rejected);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("Catching Errors:", err);
            setError(err);
          });
      } catch (error) {
        console.log("Catching Errors:", error);
        setError(error);
        setLoading(false);
      }
      setReload(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const minQualificationsOptions = [
    { value: "", key: "Select your Qualification" },
    { value: "none", key: "None" },
    { value: "pri", key: "Primary" },
    { value: "sec", key: "Secondary" },
    { value: "cert", key: "Certificate" },
    { value: "dip", key: "Diploma" },
    { value: "bsc", key: "BSc" },
    { value: "msc", key: "MSc" },
    { value: "phd", key: "PhD" },
  ];
  const experienceOptions = [
    { value: "", key: "Select Years of experience" },
    { value: "entry", key: "Entry Level" },
    { value: "1-2", key: "1-2 years" },
    { value: "3-5", key: "3-5 years" },
    { value: "6-10", key: "6-10 years" },
    { value: "above 10", key: "Above 10 years" },
  ];

  // const initialValues = {
  //   creator: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
  //   title: "",
  //   industry: "",
  //   location: "",
  //   salary: "",
  //   description: "",
  //   job_type: "gig",
  //   experience: [],
  //   qualifications: [],
  //   courseDate: null,
  // };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    salary: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    experience: Yup.string().required("Required"),
    qualifications: Yup.string().required("Required"),
    // courseDate: Yup.date().required("Required").nullable(),
  });

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log("val8es fdsf ", values);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .post(`${BASE_URL}/jobs/${match.params.jobID}/`, values, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
      })
      .catch((err) => {
        setSubmitting(false);
        console.log("error", err);

        setErrors(err.response.data);
      });
  };
  const onChangeSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log("val8es fdsf ", values);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .put(`${BASE_URL}/jobs/${match.params.jobID}/`, values, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
      })
      .catch((err) => {
        setSubmitting(false);
        console.log("error", err);

        setErrors(err.response.data);
      });
  };

  const closeApplications = () => {
    setLoading(true);
    const {
      id,
      creator,
      title,
      industry,
      job_type,
      min_qualification,
      years_of_exp,
      description,
      salary,
      location,
    } = initialValues;
    const body = {
      is_active: false,
      creator: creator,
      job_type: job_type,
      title: title,
      id: id,
      industry: industry,
      min_qualification: min_qualification,
      years_of_exp: years_of_exp,
      description: description,
      salary: salary,
      location: location,
    };
    axios
      .put(`${BASE_URL}/jobs/${match.params.jobID}/`, body, tokenConfig())
      .then((res) => {
        openModal({
          show: true,
          overlayClassName: "quick-view-overlay",
          closeOnClickOutside: true,
          component: () => EmailVerificationModal("Applications halted!"),
          closeComponent: "",
          config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        console.log(err.response.data);
        setLoading(false);
      });
  };
  const deleteJob = (text) => {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/jobs/${match.params.jobID}/`, tokenConfig())
      .then((res) => {
        setLoading(false);
        openModal({
          show: true,
          overlayClassName: "quick-view-overlay",
          closeOnClickOutside: true,
          component: () => EmailVerificationModal("Job deleted"),
          closeComponent: "",
          config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
          },
        });
      })
      .catch((err) => {
        setError(err);
        console.log(err.response.status);
        setLoading(false);
      });
  };
  const selectApplicant = (account, profile, status) => {
    const values = { status: status };
    console.log("values set applicant", values);
    axios
      .patch(
        `${BASE_URL}/jobs/applications/${account.id}/`,
        values,
        tokenConfig()
      )
      .then((res) => {
        setLoading(false);
        openModal({
          show: true,
          overlayClassName: "quick-view-overlay",
          closeOnClickOutside: true,
          component: () =>
            EmailVerificationModal(`${profile.full_name}${" "}${status}`),
          closeComponent: "",
          config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
          },
        });
        setReload(true);
      })
      .catch((err) => {
        if (err.response) {
        } else {
          setError(err);
        }
        console.log(err.response.data);
        setLoading(false);
        setReload(true);
      });
  };
  const applicantView = async (profile) => {
    await axios
      .get(`${BASE_URL}/jobs/applications/`, tokenConfig())
      .then(async (res) => {
        const arr = res.data.results.filter(
          (filteredApplication) =>
            filteredApplication.applicant === profile.id &&
            `${filteredApplication.job}` === match.params.jobID
        );
        setApplication(arr[0]);
      })
      .catch((err) => {
        console.log("Catching Errors:", err);
        setError(err);
        setLoading(false);
      });
    if (application) {
      await setTimeout(() => {
        openModal({
          show: true,
          overlayClassName: "quick-view-overlay",
          closeOnClickOutside: true,
          component: () =>
            ModalTemplate(
              profile,
              application,
              <>
                {!userShortlisted.includes(profile.id) && (
                  <Button
                    onClick={() =>
                      selectApplicant(application, profile, "shortlisted")
                    }
                    size="small"
                    title={`Shortlist`}
                    style={{
                      fontSize: 15,
                      color: "#fff",
                      backgroundColor: "#e618a5",
                      margin: "10px 10px",
                    }}
                  />
                )}
                {!userApproved.includes(profile.id) && (
                  <Button
                    onClick={() =>
                      selectApplicant(application, profile, "accepted")
                    }
                    size="small"
                    title={`Accept`}
                    style={{
                      fontSize: 15,
                      color: "#fff",
                      backgroundColor: "#e65918",
                      margin: "10px 10px",
                    }}
                  />
                )}
                {!userRejected.includes(profile.id) && (
                  <Button
                    onClick={() =>
                      selectApplicant(application, profile, "rejected")
                    }
                    size="small"
                    title={`Reject`}
                    style={{
                      fontSize: 15,
                      color: "#fff",
                      backgroundColor: "#e6183e",
                      margin: "10px 10px",
                    }}
                  />
                )}
              </>
            ),
          closeComponent: "",
          config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
          },
        });
      }, 1000);
    }
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <CardWrapper>
      <h4>
        Manage Applications
        {initialValues ? ` (${initialValues.title})` : " ..."}
        <Button
          onClick={isEdit ? setList : setForm}
          size="small"
          title={isEdit ? `Manage Applications` : `Edit Post`}
          style={{
            fontSize: 15,
            color: "#5918e6",
            backgroundColor: "#e6c018",
            float: "right",
          }}
        />
      </h4>
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentForm === "edit" && (
            <>
              <h4>
                .
                <Button
                  onClick={closeApplications}
                  size="small"
                  title={`Close Applications`}
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    backgroundColor: "#c018e6",
                    float: "left",
                  }}
                />
                <Button
                  onClick={deleteJob}
                  size="small"
                  title={`Delete Job`}
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    backgroundColor: "#e6183e",
                    float: "right",
                  }}
                />
              </h4>
              <FormWrapper>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={editting ? onChangeSubmit : onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <FormikControl
                          control="input"
                          type="text"
                          label="Title"
                          name="title"
                        />
                        <FormikControl
                          control="select"
                          label="Industry"
                          name="industry"
                          options={industry}
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Salary"
                          name="salary"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Location"
                          name="location"
                        />
                        <FormikControl
                          control="select"
                          label="Qualification"
                          name="qualifications"
                          options={minQualificationsOptions}
                        />
                        <FormikControl
                          control="select"
                          label="Experience"
                          name="experience"
                          options={experienceOptions}
                        />
                        <FormikControl
                          control="textarea"
                          label="Description"
                          name="description"
                          rte={true}
                        />
                        <Button
                          type="submit"
                          size="small"
                          title={
                            formik.isSubmitting ? "Submitting... " : "Submit"
                          }
                          style={{ fontSize: 15, color: "#fff" }}
                          disabled={!formik.isValid}
                        />
                      </Form>
                    );
                  }}
                </Formik>
              </FormWrapper>
            </>
          )}
          {currentForm === "manage" && (
            <LeftContent>
              <ul>
                {applicants.length > 0 ? (
                  <>
                    {applicants.map((applicant, index) => (
                      <li key={index}>
                        <section onClick={() => applicantView(applicant)}>
                          <ListingLogo>
                            <ImageWrapper
                              url={applicant.image}
                              alt={"company logo"}
                            />
                          </ListingLogo>
                          <ListingTitle>
                            <h3>
                              {applicant.full_name}
                              <TypeList>
                                {userApplied.includes(applicant.id) && (
                                  <Button
                                    onClick={() => applicantView(applicant)}
                                    size="small"
                                    title={`Approve`}
                                    style={{
                                      fontSize: 15,
                                      color: "#fff",
                                      backgroundColor: "#5918e6",
                                      float: "right",
                                      height: "29px",
                                      margin: "0 0 0 10px",
                                    }}
                                  />
                                )}
                                {userApproved.includes(applicant.id) && (
                                  <Button
                                    onClick={() => applicantView(applicant)}
                                    size="small"
                                    title={`Approved`}
                                    style={{
                                      fontSize: 15,
                                      color: "#fff",
                                      backgroundColor: "#18e62d",
                                      float: "right",
                                      height: "29px",
                                      margin: "0 0 0 10px",
                                    }}
                                  />
                                )}
                                {userRejected.includes(applicant.id) && (
                                  <Button
                                    onClick={() => applicantView(applicant)}
                                    size="small"
                                    title={`Rejected`}
                                    style={{
                                      fontSize: 15,
                                      color: "#fff",
                                      backgroundColor: "#e6183e",
                                      float: "right",
                                      height: "29px",
                                      margin: "0 0 0 10px",
                                    }}
                                  />
                                )}
                                {userShortlisted.includes(applicant.id) && (
                                  <Button
                                    onClick={() => applicantView(applicant)}
                                    size="small"
                                    title={`Shortlisted`}
                                    style={{
                                      fontSize: 15,
                                      color: "#fff",
                                      backgroundColor: "#c018e6",
                                      float: "right",
                                      height: "29px",
                                      margin: "0 0 0 10px",
                                    }}
                                  />
                                )}
                              </TypeList>
                            </h3>
                            <ListingIcons>
                              <li>
                                <RefundIcon />
                                {applicant.email}
                              </li>
                            </ListingIcons>
                          </ListingTitle>
                        </section>
                      </li>
                    ))}
                  </>
                ) : (
                  <H3>No Applications Yet</H3>
                )}
              </ul>
            </LeftContent>
          )}
        </>
      )}
    </CardWrapper>
  );
}

export default GigManage;
