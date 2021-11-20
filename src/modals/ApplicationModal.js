import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import DataModal from "./DataModal";
import FormikControl from "containers/FormikContainer/FormikControl";
import ModalEvents from "../constants/ModalEvents";
import { TypedMutation } from "core/mutations";

import { CREATE_APPLICATION, UPDATE_APPLICATION } from "graphql/mutations";

import { showNotification } from "helpers";

import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";
import ModalContext from "contexts/modal/modal.provider";
import { AuthContext } from "contexts/auth/auth.context";

export const TypedCreateApplicationMutation = TypedMutation(CREATE_APPLICATION);
export const TypedUpdateApplicationMutation = TypedMutation(UPDATE_APPLICATION);

const ApplicationModal = () => {
  const {
    authState: { profile },
  } = React.useContext(AuthContext);
  const { t } = useTranslation();
  const alert = useAlert();
  const [vacancyID, setVacancyID] = React.useState();
  const { emitter, events } = React.useContext(ModalContext);

  React.useEffect(() => {
    const unbind = emitter.on(events.APPLICATION_MODAL, (payload) => {
      console.log(payload);
      setVacancyID(payload.id);
    });
    return () => unbind();
  }, [emitter, events]);

  const initialValues = {
    job: vacancyID,
    resume: "",
    budget: "",
    comment: "",
  };

  const schema = Yup.object().shape({
    comment: Yup.string()
      .min(50, t("shared.forms.validation.min", { number: 50 }))
      .required(t("shared.forms.validation.required")),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
    >
      {(formik) => (
        <TypedCreateApplicationMutation
          onCompleted={(data, errors) =>
            showNotification(
              data.createApplication,
              errors,
              null,
              "errors",
              "Application submitted successfully, Wait for response from the contractor",
              formik.setErrors,
            )
          }
        >
          {(applicationCreate) => {
            function createApplication(values) {
              console.log(values);
              applicationCreate({
                variables: {
                  job: vacancyID,
                  resume: values.variables.resume[0],
                  budget: values.variables.budget,
                  comment: values.variables.comment,
                  applicant: profile.id,
                  status: "APPLIED",
                },
              });
            }
            return (
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
                    <DataModal
                      title={{
                        create: "Make Application",
                        edit: "Make Application",
                      }}
                      onEdit={createApplication}
                      onCreate={createApplication}
                      event={ModalEvents.APPLICATION_MODAL}
                    >
                      <div className="dashboard-list-box-content">
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
                      </div>
                    </DataModal>
                  );
                }}
              </TypedUpdateApplicationMutation>
            );
          }}
        </TypedCreateApplicationMutation>
      )}
    </Formik>
  );
};

export default memo(withRouter(ApplicationModal));
