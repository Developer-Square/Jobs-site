import React from "react";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
import { vacancySchema } from "./validation.schema";

const VacancyForm = ({
  initialValues,
  onSubmit,
  loading,
  industries,
  experience,
  qualification,
  jobType,
  rate,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={vacancySchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <section className="py-1 bg-blueGray-50">
            <div className="w-full px-4 mx-auto mt-6">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Job</h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 bg-gray-100">
                  <Form>
                    <div>
                      <div className="form grid grid-cols-2 gap-6">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Title"
                          placeholder="Front Desk Assistant"
                          name="title"
                        />
                        <FormikControl
                          control="select"
                          hideButton={() => {}}
                          label="Minimum Education Qualification"
                          name="minQualification"
                          style={{ margin: 0 }}
                          options={qualification}
                          defaultValue={formik.values.minQualification}
                        />
                      </div>
                      <div className="form grid grid-cols-2 gap-6">
                        <FormikControl
                          control="input"
                          type="number"
                          label="Salary"
                          placeholder="Salary"
                          name="salary"
                        />
                        <FormikControl
                          control="select"
                          hideButton={() => {}}
                          label="Pay Rate"
                          name="payRate"
                          style={{ margin: 0 }}
                          options={rate}
                          defaultValue={formik.values.payRate}
                        />
                      </div>
                      <div className="form grid grid-cols-2 gap-6">
                        <FormikControl
                          control="select"
                          hideButton={() => {}}
                          label="Job Type"
                          name="jobType"
                          style={{ margin: 0 }}
                          options={jobType}
                          defaultValue={formik.values.jobType}
                        />
                        <FormikControl
                          control="select"
                          hideButton={() => {}}
                          label="Years of Experience required"
                          name="yearsOfExp"
                          style={{ margin: 0 }}
                          options={experience}
                          defaultValue={formik.values.experience}
                        />
                      </div>
                      <div className="form grid grid-cols-2 gap-6">
                        <FormikControl
                          control="input"
                          type="number"
                          label="Open Positions"
                          name="positions"
                        />
                        <FormikControl
                          control="date"
                          label="Closing Date"
                          name="closingDate"
                          minDate={new Date()}
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
                      <div className="form">
                        <FormikControl
                          control="input"
                          type="email"
                          label="Application Email"
                          name="applicationEmail"
                        />
                      </div>

                      <div className="form">
                        <FormikControl
                          control="select"
                          hideButton={() => {}}
                          label="Industry"
                          name="industry"
                          style={{ margin: 0 }}
                          options={industries}
                          defaultValue={formik.values.industries}
                          //   isMulti={true}
                        />
                      </div>
                      <div className="form" style={{ width: "100%" }}>
                        <FormikControl
                          control="textarea"
                          label="Job Description, requirements, duties and more information"
                          name="description"
                          rte={true}
                          fullWidth
                        />
                        <h3>
                          NB : copy and paste as plain text to add pre-compiled
                          description
                        </h3>
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
                </div>
              </div>
            </div>
          </section>
        );
      }}
    </Formik>
  );
};

export default VacancyForm;
