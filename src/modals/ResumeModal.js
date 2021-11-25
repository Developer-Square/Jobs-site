import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { toast } from "react-toastify";
import DataModal from "./DataModal";
// import DatabaseContext from "contexts/database/database.provider";
import Input from "../components/shared/Input";
import ModalEvents from "../constants/ModalEvents";
import { TypedMutation } from "core/mutations";
import DatabaseContext from "contexts/database/database.provider";

import { RESUME_MUTATION, RESUME_UPDATE_MUTATION } from "graphql/mutations";

import { showNotification } from "helpers";
import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";
import { getFieldProps, unsplashPhotoRequestUrl } from "utils";

export const TypedResumeMutation = TypedMutation(RESUME_MUTATION);
export const TypedResumeUpdateMutation = TypedMutation(RESUME_UPDATE_MUTATION);

const ResumeModal = () => {
  const { t } = useTranslation();
  const alert = useAlert();
  const { setRefetchResumes } = React.useContext(DatabaseContext);
  const [refetchSplashImg, setRefetchSplashImg] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    preview: "",
  });

  React.useEffect(() => {
    (async () => {
      try {
        await fetch(unsplashPhotoRequestUrl).then((results) => {
          if (results && results.url !== undefined) {
            setInitialValues({ name: "", preview: results.url });
          }
        });
      } catch (error) {
        toast.info(
          "You're offline, connect to the internet for the best experience",
        );
        console.log(error);
      }
    })();
  }, [refetchSplashImg]);
  const refetchSplashImages = () => {
    setRefetchSplashImg((curr) => !curr);
  };

  // const { createResume, updateResume } = useContext(DatabaseContext);

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(5, t("shared.forms.validation.min", { number: 5 }))
      .required(t("shared.forms.validation.required")),
  });
  // if (!imgPreview) {
  //   setInitialValues({ name: "", preview: img });
  // }

  return (
    <TypedResumeMutation
      onCompleted={(data, errors) =>
        showNotification(
          data.resumeCreate,
          errors,
          alert,
          "accountErrors",
          "Resume Created",
        )
      }
    >
      {(resumeCreate) => {
        return (
          <TypedResumeUpdateMutation
            onCompleted={(data, errors) =>
              showNotification(
                data.resumePatch,
                errors,
                alert,
                "accountErrors",
                "Resume Updated",
              )
            }
          >
            {(resumeUpdate) => {
              return (
                <Formik
                  validateOnBlur
                  initialValues={initialValues}
                  validationSchema={schema}
                  enableReinitialize
                >
                  {(formik) => (
                    <DataModal
                      title={{
                        create: t("dashboard.createResume"),
                        edit: t("dashboard.editResume"),
                      }}
                      onEdit={(d) => {
                        resumeUpdate(d);
                        refetchSplashImages();
                        setRefetchResumes(true);
                        setRefetchResumes(false);
                      }}
                      onCreate={(d) => {
                        resumeCreate(d);
                        refetchSplashImages();
                        setRefetchResumes(true);
                        setRefetchResumes(false);
                      }}
                      event={ModalEvents.CREATE_RESUME_MODAL}
                    >
                      <Input
                        label={t("shared.forms.name")}
                        className="mb-8"
                        placeholder="Full Stack Web Developer"
                        {...getFieldProps(formik, schema, "name")}
                      />

                      <p className="leading-loose">{t("dashboard.helpText")}</p>
                    </DataModal>
                  )}
                </Formik>
              );
            }}
          </TypedResumeUpdateMutation>
        );
      }}
    </TypedResumeMutation>
  );
};

export default memo(withRouter(ResumeModal));
