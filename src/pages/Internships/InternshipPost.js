/* eslint-disable react-hooks/rules-of-hooks */
import { closeModal, openModal } from "@redq/reuse-modal";
import axios from "axios";
import Button from "components/Button/Button";
import Error500 from "components/Error/Error500";
import Loader from "components/Loader/Loader";
import { BASE_URL } from "constants/constants";
import FormikControl from "containers/FormikContainer/FormikControl";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import { useStickyDispatch } from "contexts/app/app.provider";
import { AuthContext } from "contexts/auth/auth.context";
import { Form, Formik } from "formik";
import { tokenConfig } from "helpers";
import { Industries } from "pages/common/industry";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { CardWrapper, FormWrapper } from "./Internships.style";

function InternshipPost() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [industry] = useState(Industries);
  useEffect(() => {
    if (!profile.is_verified) {
      history.push(`/dashboard/jobs`);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const minQualificationsOptions = [
    { value: "Select your Qualification", key: "" },
    { value: "none", key: "None" },
    { value: "pri", key: "primary" },
    { value: "sec", key: "secondary" },
    { value: "cert", key: "Certificate" },
    { value: "dip", key: "Diploma" },
    { value: "bsc", key: "BSc" },
    { value: "msc", key: "MSc" },
    { value: "phd", key: "PhD" },
  ];
  const experienceOptions = [
    { value: "Select Years of experience", key: "" },
    { value: "entry", key: "Entry Level" },
    { value: "1-2", key: "1-2 years" },
    { value: "3-5", key: "3-5 years" },
    { value: "6-10", key: "6-10 years" },
    { value: "above 10", key: "Above 10 years" },
  ];

  const initialValues = {
    creator: localStorage.getItem("thedb_auth_profile")
      ? JSON.parse(localStorage.getItem("thedb_auth_profile"))["id"]
      : "",
    title: "",
    industry: "",
    location: "",
    salary: "",
    description: "",
    job_type: "Internship",
    years_of_exp: "",
    min_qualifications: "",
    courseDate: null,
  };
  console.log(
    "the pk for user",
    localStorage.getItem("thedb_auth_profile")
      ? JSON.parse(localStorage.getItem("thedb_auth_profile"))["id"]
      : ""
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    job_type: Yup.string().required("Required"),
    experience: Yup.string().required("Required"),
    qualifications: Yup.string().required("Required"),
    // courseDate: Yup.date().required("Required").nullable(),
  });
  const handleModal = (text, subtext) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => EmailVerificationModal(text, subtext),
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

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log("val8es fdsf ", values);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .post(`${BASE_URL}/jobs/`, values, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
        handleModal(
          "Internship Created Successfully ✔",
          `${res.data.title} - ${res.data.location} @ ${res.data.salary}`
        );
        setTimeout(() => {
          setLoading(false);
          closeModal();
          history.push(`/dashboard/internships/${res.data.id}`);
        }, 2000);
      })
      .catch((err) => {
        if (err.response) {
          setErrors(err.response.data);
        } else {
          setError(err);
        }
        console.log(err.response.status);
        setSubmitting(false);
        setLoading(false);
      });
  };
  const useDispatch = useStickyDispatch();
  const setForm = useCallback(() => useDispatch({ type: "VIEW" }), [
    useDispatch,
  ]);
  const toggleView = () => {
    setForm();
  };
  if (error) {
    return <Error500 err={error} />;
  }
  return (
    <CardWrapper>
      <h4>
        Post Internship
        <Button
          onClick={toggleView}
          size="small"
          title="Listings"
          style={{
            fontSize: 15,
            color: "#21277f",
            backgroundColor: "#e6c018",
            float: "right",
          }}
        />
      </h4>
      {loading ? (
        <Loader />
      ) : (
        <FormWrapper>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Job Name"
                    placeholder="e.g. Eng-Inter, Law-Pupilage"
                    name="title"
                  />

                  <FormikControl
                    control="input"
                    type="text"
                    label="Salary (If confidential, leave Blank)"
                    placeholder="e.g. 10,000 or 20,000"
                    name="salary"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Location (County, place)"
                    placeholder="e.g. Kajiado, Rongai - Maasai Mall"
                    name="location"
                  />
                  <FormikControl
                    control="select"
                    label="Industry"
                    name="industry"
                    options={industry}
                  />
                  <FormikControl
                    control="input"
                    disabled={true}
                    label="Internship Type"
                    name="job_type"
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
                    label="Job Description"
                    placeholder="Tell us more about the job, no. of positions, skills required ..."
                    name="description"
                    rte={true}
                  />
                  <Button
                    type="submit"
                    size="small"
                    title={formik.isSubmitting ? "Submitting... " : "Submit"}
                    style={{ fontSize: 15, color: "#fff" }}
                    disabled={!formik.isValid}
                  />
                </Form>
              );
            }}
          </Formik>
        </FormWrapper>
      )}
    </CardWrapper>
  );
}

export default InternshipPost;
