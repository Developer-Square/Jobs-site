import React from "react";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
import { institutionProfileSchema } from "./validation.schema";

const InstitutionForm = ({
  initialValues,
  onSubmit,
  loading,
  studentCount,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={institutionProfileSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <h4>Profile Details</h4>
            <div>
              <div className="form grid grid-cols-2 gap-6">
                <FormikControl
                  control="input"
                  type="text"
                  label="Institution Name"
                  placeholder="e.g. University of Kenya"
                  name="name"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="School Registration No."
                  placeholder="PN23U934"
                  name="regNo"
                />
              </div>
              <div className="form grid grid-cols-2 gap-6">
                <FormikControl
                  control="input"
                  type="text"
                  label="Website URL"
                  placeholder="e.g. https://thedatabase.co.ke"
                  name="website"
                />
                <FormikControl
                  control="select"
                  label="Schools Student Population"
                  name="studentCount"
                  hideButton={() => {}}
                  style={{ margin: 0 }}
                  options={studentCount}
                />
              </div>
              <div className="form  grid grid-cols-2 gap-6">
                <FormikControl
                  control="phone"
                  type="phone"
                  label="Contact Number"
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
                  label="Institution Location"
                  name="location"
                  placeholder="e.g. Nairobi, Kasarani - Corner"
                />
              </div>
              <div className="form" style={{ width: "100%" }}>
                <FormikControl
                  control="textarea"
                  label="About the instituition"
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

export default InstitutionForm;
