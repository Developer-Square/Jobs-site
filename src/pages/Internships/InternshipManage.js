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

function InternshipManage() {
  const match = useRouteMatch();
  const [initialValues, setInitialValues] = useState([]);
  const industry = Industries;
  const useDispatch = useStickyDispatch();
  const setList = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const setForm = useCallback(() => useDispatch({ type: "EDIT" }), [
    useDispatch,
  ]);
  const currentForm = useAppState("currentForm");
  console.log("app state", currentForm);
  const isEdit = currentForm === "edit";

  useEffect(() => {
    setList();
    axios
      .get(`${BASE_URL}/jobs/${match.params.jobID}/`, tokenConfig())
      .then((res) => {
        const arr = res.data;
        console.log("array jobs", arr);
        // setJob(arr);
        setInitialValues(arr);
      })
      .catch((err) => {
        console.log("error", err);
      });
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

  return (
    <CardWrapper>
      <h4>
        Manage Internship
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
      {currentForm === "edit" && (
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
      {currentForm === "manage" && (
        <ul>
          <li>applicant one</li>
          <li>applicant two</li>
        </ul>
      )}
    </CardWrapper>
  );
}

export default InternshipManage;
