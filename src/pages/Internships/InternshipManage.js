/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CardWrapper, FormWrapper } from "./Internships.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";
import { useStickyDispatch } from "contexts/app/app.provider";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";
import { useRouteMatch } from "react-router-dom";
import { useAppState } from "contexts/app/app.provider";
import { Industries } from "pages/common/industry";
import {
  ListingLogo,
  ListingTitle,
  ListingIcons,
  LeftContent,
  TypeList,
} from "styles/pages.style";
import ImageWrapper from "components/Image/Image";
import { LockIcon } from "components/AllSvgIcon";
import Error500 from "components/Error/Error500";
import Loader from "components/Loader/Loader";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import ModalTemplate from "pages/common/ModalTemplate";

function InternshipManage() {
  const match = useRouteMatch();
  const [initialValues, setInitialValues] = useState([]);
  const [applicants, setApplicants] = useState([
    {
      email: "demo@demo.com",
      full_name: "Tester User",
      id: 1,
      username: "1demo.com",
      salary: 5000,
    },
    {
      email: "admin@demo.com",
      full_name: "Only User",
      id: 2,
      username: "IDM",
      salary: 4000,
    },
  ]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editting, setEditting] = useState(false);
  const industry = Industries;
  const useDispatch = useStickyDispatch();
  const setList = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const setForm = useCallback(() => useDispatch({ type: "EDIT" }), [
    useDispatch,
  ]);
  const currentForm = useAppState("currentForm");
  const isEdit = currentForm === "edit";

  useEffect(() => {
    setLoading(false);
    setList();
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
          console.log("Catching Errors:", err);
          setError(err);
          setLoading(false);
        });
    } catch (error) {
      console.log("Catching Errors:", error);
      setError(error);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("job title", job.title);

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    salary: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    years_of_exp: Yup.string().required("Required"),
    min_qualification: Yup.string().required("Required"),
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
  const selectApplicant = () => {
    const values = { status: "accepted" };
    axios
      .post(
        `${BASE_URL}/application/${match.params.jobID}/`,
        values,
        tokenConfig()
      )
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
        if (err.response.data) {
        } else {
          setError(err);
        }
        console.log(err.response.status);
        setLoading(false);
      });
  };
  const applicantView = (profile) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => ModalTemplate(profile),
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <CardWrapper>
      <h4>
        Manage Applications
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
                          control="textarea"
                          label="description"
                          name="description"
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
                            <Button
                              onClick={() => selectApplicant(applicant.id)}
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
                          </TypeList>
                        </h3>
                        <ListingIcons>
                          <li>
                            <LockIcon />
                            {applicant.email}
                          </li>
                        </ListingIcons>
                      </ListingTitle>
                    </section>
                  </li>
                ))}
              </ul>
            </LeftContent>
          )}
        </>
      )}
    </CardWrapper>
  );
}

export default InternshipManage;
