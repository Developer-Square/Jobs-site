import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CardWrapper, FormWrapper } from "./Jobs.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";

const Jobs = () => {
  const [indusrty, setIndustry] = useState([
    { value: "Select Industry Type", key: "" },
    { key: "telecommumication", value: 1 },
    { key: "Accounting", value: 2 },
  ]);
  useEffect(() => {
    axios
      .post(`${BASE_URL}/industry/`, tokenConfig())
      .then((res) => {
        console.log("industry data", res.data);
        setIndustry(res.data);
      })
      .catch((err) => {
        console.log("error", err.response.data);
      });
  }, []);
  const dropdownOptions = [
    { value: "Select Job Type", key: "" },
    { value: "fulltime", key: "Full-Time" },
    { value: "parttime", key: "Part-Time" },
    { value: "Volunteering", key: "Volunteering" },
    { value: "Internship", key: "Internship" },
  ];
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
    job_type: [],
    experience: [],
    qualifications: [],
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
    salary: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    job_type: Yup.string().required("Required"),
    experience: Yup.string().required("Required"),
    qualifications: Yup.string().required("Required"),
    // courseDate: Yup.date().required("Required").nullable(),
  });

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log("val8es fdsf ", values);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .post(`${BASE_URL}/jobs/`, values, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
      })
      .catch((err) => {
        setSubmitting(false);
        console.log("error", err.response.data);

        setErrors(err.response.data);
      });
  };
  return (
    <CardWrapper>
      <h4>Job Listing</h4>
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
                  label="Title"
                  name="title"
                />
                <FormikControl
                  control="select"
                  label="Industry"
                  name="industry"
                  options={indusrty}
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
                  label="Job Type"
                  name="job_type"
                  options={dropdownOptions}
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
                  label="description"
                  name="description"
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
    </CardWrapper>
  );
};

export default Jobs;
