import React, { useEffect, useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CardWrapper, FormWrapper } from "./Gigs.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";

function GigPost() {
  const { authDispatch } = useContext(AuthContext);
  const [indusrty, setIndustry] = useState([
    { value: "Select Industry Type", key: "" },
  ]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/industry/`, tokenConfig())
      .then((res) => {
        const arr = res.data.results;
        const result = arr.reduce((acc, d) => {
          acc.push({
            value: "",
            key: "Select Industry Type",
          });
          acc.push({
            key: d.name,
            value: d.id,
          });
          return acc;
        }, []);
        setIndustry(result);
      })
      .catch((err) => {
        console.log("error", err);
      });
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
    job_type: "gig",
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
        console.log("error", err);

        setErrors(err.response.data);
      });
  };
  const toggleView = () => {
    authDispatch({
      type: "VIEW",
    });
  };
  return (
    <CardWrapper>
      <h4>
        Post A Gig
        <Button
          onClick={toggleView}
          size="small"
          title="Post a Gig"
          style={{
            fontSize: 15,
            color: "#5918e6",
            backgroundColor: "#e6c018",
            float: "right",
          }}
        />
      </h4>
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
}

export default GigPost;
