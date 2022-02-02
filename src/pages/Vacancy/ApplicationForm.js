import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useAlert } from "react-alert";
import { useQuery } from "react-apollo";
import { toast } from "react-toastify";
import { VACANCY_DETAIL_QUERY } from "graphql/queries";
import Loader from "components/Loader/Loader";
import NoResultFound from "components/NoResult/NoResult";
import DraftRenderer from "components/DraftRenderer/DraftRenderer";
import { getGraphqlIdFromDBId } from "utils";
import Bookmark from "./Bookmark";
import { getClosingDate } from "utils";
import Button from "components/Button/Button";
import * as Yup from "yup";
import { Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { TypedMutation } from "core/mutations";

import { AuthContext } from "contexts/auth/auth.context";
import UserContext from "contexts/user/user.provider";
import { UPDATE_APPLICATION } from "graphql/mutations";
import { showNotification } from "helpers";

const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);

const ApplicationForm = () => {
  const match = useRouteMatch();
  const alert = useAlert();
  const { data, loading } = useQuery(VACANCY_DETAIL_QUERY, {
    variables: {
      id: match.params.vacancyID
        ? getGraphqlIdFromDBId(match.params.vacancyID, "Vacancy")
        : "",
    },
  });

  const {
    authState: { isAuthenticated },
  } = React.useContext(AuthContext);
  const { user } = React.useContext(UserContext);
  const handleLoginNotification = () => {
    toast.error("You must login to save this job");
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <div>
        <NoResultFound />
      </div>
    );
  }
  console.log(data);

  return (
    <div className="bg-white pt-10">
      <div className="mb-4" />
      <div className="pt-6 mt-10">
        {/* Image gallery */}
        {/* <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
                alt="Model wearing plain black basic tee."
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
                alt="Model wearing plain gray basic tee."
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
        </div> */}
        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* This example requires Tailwind CSS v2.0+ */}
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Back End Developer
                </h2>
                <div className="mt-1 flex sflex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    {/* Heroicon name: solid/briefcase */}
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    {data?.vacancy?.postedBy?.name}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    {/* Heroicon name: solid/location-marker */}
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {data?.vacancy?.location}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    {/* Heroicon name: solid/currency-dollar */}
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    $120k – $140k
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    {/* Heroicon name: solid/calendar */}
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {getClosingDate(data?.vacancy?.closingDate)}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <span>
                  {user?.isSeeker && (
                    <Bookmark
                      customClass={
                        "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      }
                      handleLoginNotification={handleLoginNotification}
                      isAuthenticated={isAuthenticated}
                      data={data?.vacancy}
                      toast={toast}
                      alert={alert}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <ApplicationSeekerForm />
          </div>
          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  <DraftRenderer
                    content={JSON.parse(data?.vacancy?.description)}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;

const ApplicationSeekerForm = () => {
  const match = useRouteMatch();
  const [vacancyID, setVacancyID] = React.useState(
    getGraphqlIdFromDBId(match.params.vacancyID, "Vacancy"),
  );
  React.useEffect(() => {
    setVacancyID(getGraphqlIdFromDBId(match.params.vacancyID, "Vacancy"));
  }, [match.params.vacancyID]);

  const initialValues = {
    job: vacancyID,
    resume: "",
    budget: "",
    comment: "",
  };

  const schema = Yup.object().shape({
    comment: Yup.string()
      .min(50, "Please enter at least 50 characters")
      .required("This field is required"),
  });
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
    >
      {(formik) => (
        <TypedUpdateApplicationMutation
          onCompleted={(data, errors) =>
            showNotification(
              data.applicationPatch,
              errors,
              alert,
              null,
              "Application Updated",
              formik.setErrors,
            )
          }
        >
          {(applicationUpdate) => {
            return (
              <div className="dashboard-list-box-content text-base text-gray-900">
                <div className="form">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Budget"
                    placeholder="starting at 1,000"
                    name="budget"
                  />
                </div>
                <div className="form" style={{ width: "100%" }}>
                  <FormikControl
                    control="textarea"
                    label="Cover Letter"
                    name="comment"
                    subText={
                      "Introduce yourself and explain why you’re a strong candidate for this job. This is the first thing your potential employer will see before looking at your profile."
                    }
                    placeholder="Your message / cover letter sent to the employer"
                    rte={false}
                    fullWidth
                  />
                </div>
                <div className="form">
                  <FormikControl
                    control="file"
                    type="file"
                    doc={true}
                    restrict={`.pdf`}
                    setFieldValue={formik.setFieldValue}
                    label="Resume"
                    name="resume"
                  />
                </div>
                <div className="form">
                  <Button
                    type="submit"
                    disabled={!formik.isValid}
                    fullwidth
                    isLoading={formik?.loading}
                    title={formik?.loading ? "Saving... " : "Apply"}
                    className="button margin-top-15"
                  />
                </div>
              </div>
            );
          }}
        </TypedUpdateApplicationMutation>
      )}
    </Formik>
  );
};
