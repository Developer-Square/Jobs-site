import React from "react";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
import { employerProfileSchema } from "./validation.schema";

const EmployerForm = ({
  initialValues,
  onSubmit,
  industries,
  loading,
  workForce,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={employerProfileSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <div>
              <div className="form grid grid-cols-2 gap-6">
                <FormikControl
                  control="input"
                  type="text"
                  label="Company Name"
                  placeholder="e.g. TheDatabase Kenya"
                  name="name"
                />
                <FormikControl
                  control="input"
                  type="number"
                  label="Company Registration No."
                  placeholder="0"
                  name="regNo"
                />
              </div>
              <div className="form grid grid-cols-2 gap-6">
                <FormikControl
                  control="input"
                  type="text"
                  label="Website URL"
                  placeholder="e.g. Safaricom PLC"
                  name="website"
                />
                <FormikControl
                  control="select"
                  label="Company's WorkForce"
                  hideButton={() => {}}
                  name="workForce"
                  style={{ margin: 0 }}
                  options={workForce}
                />
              </div>
              <div className="form  grid grid-cols-2 gap-6">
                <FormikControl
                  control="phone"
                  type="phone"
                  label="Phone Number"
                  placeholder="e.g. +254 722-123123"
                  name="mobile"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Country"
                  name="country"
                  placeholder="e.g. Kenya, Rwanda, Egypt"
                />
              </div>
              <div className="form">
                <FormikControl
                  control="input"
                  type="text"
                  label="Office Location"
                  name="location"
                  placeholder="e.g. Nairobi, Kasarani - Corner"
                />
              </div>
              <div className="form" style={{ width: "100%" }}>
                <FormikControl
                  control="select"
                  label="Industries Engaged"
                  name="industries"
                  hideButton={() => {}}
                  style={{ margin: 0 }}
                  options={industries}
                  isMulti={true}
                />
              </div>
              <div className="form" style={{ width: "100%" }}>
                <FormikControl
                  control="textarea"
                  label="Key Traits"
                  name="lookingFor"
                  placeholder="What you're looking for in an employee"
                  rte={false}
                  fullWidth
                />
              </div>
              <div className="form" style={{ width: "100%" }}>
                <FormikControl
                  control="textarea"
                  label="About the company"
                  name="description"
                  rte={true}
                  fullWidth
                />
              </div>
              <div className="form" style={{ width: "100%" }}>
                <Button
                  type="submit"
                  disabled={!formik.isValid}
                  fullwidth
                  isLoading={loading}
                  title={loading ? "Saving... " : "Save"}
                  className="button margin-top-15"
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EmployerForm;
