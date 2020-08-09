import React, { useEffect, useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CardWrapper, FormWrapper } from "./Internships.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import { useRouteMatch } from "react-router-dom";
import { useAppState } from "contexts/app/app.provider";

function InternshipManage() {
  const {
    authState: { profile },
    authDispatch,
  } = useContext(AuthContext);
  const match = useRouteMatch();
  console.log("match :", match.params.jobID);
  const [job, setJob] = useState();
  const currentForm = useAppState("currentForm");
  console.log("app state", currentForm);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/jobs/${match.params.jobID}/`, tokenConfig())
      .then((res) => {
        const arr = res.data;
        console.log("array jobs", arr);
        setJob(arr);
      })
      .catch((err) => {
        console.log("error", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    creator: job ? job.creator : "",
    title: job ? job.title : "",
    industry: job ? job.industry : "",
    location: job ? job.location : "",
    salary: job ? job.salary : "",
    description: job ? job.description : "",
    job_type: job ? job.job_type : "",
    years_of_exp: job ? job.years_of_exp : "",
    min_qualification: job ? job.min_qualifications : "",
    id: job ? job.id : "",
  };
  console.log(
    "the pk for user",
    localStorage.getItem("thedb_auth_profile") ? profile.id : ""
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
  const toggleEdit = () => {
    authDispatch({
      type: "EDIT",
    });
  };
  return (
    <CardWrapper>
      <h4>
        Manage A Internship
        <Button
          onClick={toggleEdit}
          size="small"
          title="Manage a Internship"
          disabled={true}
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

export default InternshipManage;
