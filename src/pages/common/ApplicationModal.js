import React, { useContext, useState } from "react";
import FormikControl from "containers/FormikContainer/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";
import {
  FormWrapper,
  Wrapper,
  Container,
  SubHeading,
  Heading,
} from "../Dashboard/Dashboard.style";
import { AuthContext } from "contexts/auth/auth.context";
import { BASE_URL } from "constants/constants";
import { addObjectToLocalStorageObject } from "helpers";

function ApplicationModal(jobId) {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const submitApplication = (values, { setErrors, setSubmitting }) => {
    setSubmitting(true);
    const { budget, comment } = values;
    const body = {
      applicant: profile.id,
      job: 1,
      budget: budget,
      comment: comment,
    };
    axios
      .post(`${BASE_URL}/jobs/applications/`, body, tokenConfig())
      .then((res) => {
        console.log("applicant data", res.data.results);
        setSuccess(true);
        axios
          .get()
          .post(
            `${BASE_URL}/jobs/applicant/${profile.id}/`,
            body,
            tokenConfig()
          )
          .then((res) => {
            addObjectToLocalStorageObject(
              "thedb_applications",
              res.data.applications
            );
          });
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };
  const initialValues = {
    applicant: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
    job: jobId,
    resume: null,
    budget: "",
    comment: "",
    status: "Applied",
  };
  const validationSchema = Yup.object({
    budget: Yup.string().required("Required"),
    comment: Yup.string().required("Required"),
  });
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        {!success ? (
          <>
            <Heading>Complete Application</Heading>

            <SubHeading>Fill in the details to complete application</SubHeading>

            <FormWrapper>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitApplication}
              >
                {(formik) => {
                  // formik.setFieldValue("job", 1);
                  return (
                    <Form>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Budget"
                        name="budget"
                      />
                      <FormikControl
                        control="textarea"
                        label="comment"
                        name="comment"
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
        ) : (
          <Heading>Application Successful</Heading>
        )}{" "}
      </Container>
    </Wrapper>
  );
}

export default ApplicationModal;
