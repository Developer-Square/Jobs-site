import React from "react";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
import { seekerProfileSchema } from "./validation.schema";
import CoursesSearch from "components/CoursesSearch/CoursesSearch";

const SeekerForm = ({
  initialValues,
  onSubmit,
  industries,
  loading,
  statusOptions,
  genderOptions,
  loadOptions,
  setCourseList,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={seekerProfileSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <div className="form grid grid-cols-2 gap-6">
              <FormikControl
                control="input"
                type="text"
                label="Title"
                placeholder="e.g. Student, Eng, Mr etc"
                name="title"
              />
              <FormikControl
                control="input"
                type="number"
                label="ID Number"
                placeholder="ID Number"
                name="idNumber"
              />
            </div>
            <div className="form grid grid-cols-2 gap-6">
              <FormikControl
                control="select"
                label="Status"
                name="status"
                hideButton={() => {}}
                style={{ margin: 0 }}
                options={statusOptions}
                defaultValue={{
                  value: "",
                  label: "Select Options",
                }}
              />
              <FormikControl
                control="select"
                label="Gender"
                name="gender"
                hideButton={() => {}}
                style={{ margin: 0 }}
                options={genderOptions}
                defaultValue={{ value: "", label: "Select Gender" }}
              />
            </div>
            <div className="form">
              <FormikControl
                control="phone"
                type="phone"
                label="Phone Number"
                placeholder="e.g. +254 722-123123"
                name="mobile"
              />
            </div>
            <div className="form">
              <FormikControl
                control="input"
                type="text"
                label="Current Residence (County, Place)"
                name="location"
                placeholder="e.g. Nairobi, Kasarani - Corner"
              />
            </div>
            <div className="form">
              <FormikControl
                control="date"
                label="Date of Birth"
                name="dateOfBirth"
                maxDate={new Date(2003, 1, 1)}
              />
            </div>
            <div className="form" style={{ width: "100%" }}>
              <FormikControl
                control="select"
                label="Job Industries"
                name="industries"
                hideButton={() => {}}
                style={{ margin: 0 }}
                options={industries}
                isMulti={true}
              />
            </div>
            <div className="form" style={{ width: "100%" }}>
              <CoursesSearch
                formik={formik}
                setCourseList={setCourseList}
                initialSearch={{
                  searchBy: "search",
                  searchAfter: true,
                  searchType: "string",
                  searchString: initialValues?.course?.value,
                }}
              />
            </div>
            <div className="form" style={{ width: "100%" }}>
              <FormikControl
                control="textarea"
                label="Additional Info"
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default SeekerForm;
