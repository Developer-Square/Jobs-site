import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { getFieldProps } from "utils";
import DataModal from "../DataModal";
import Input from "components/shared/Input";
import ModalEvents from "constants/ModalEvents";
import { TypedMutation } from "core/mutations";
import { AWARD_MUTATION, AWARD_UPDATE_MUTATION } from "graphql/mutations";

import { showNotification } from "helpers";

export const TypedAwardItemMutation = TypedMutation(AWARD_MUTATION);
export const TypedAwardItemUpdateMutation = TypedMutation(
  AWARD_UPDATE_MUTATION,
);

const initialValues = {
  title: "",
  organization: "",
  date: "",
  descriptionPlaintext: "",
};

const AwardModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("shared.forms.validation.required")),
    organization: Yup.string().required(t("shared.forms.validation.required")),
    date: Yup.date().max(new Date()),
    descriptionPlaintext: Yup.string(),
  });

  return (
    <TypedAwardItemMutation
      onCompleted={(data, errors) =>
        showNotification(
          data.awardItemCreate,
          errors,
          alert,
          "accountErrors",
          "Resume Created",
        )
      }
    >
      {(awardItemCreate) => {
        return (
          <TypedAwardItemUpdateMutation
            onCompleted={(data, errors) =>
              showNotification(
                data.awardItemPatch,
                errors,
                alert,
                "accountErrors",
                "Resume Updated",
              )
            }
          >
            {(awardItemUpdate) => {
              return (
                <Formik
                  validateOnBlur
                  initialValues={initialValues}
                  validationSchema={schema}
                >
                  {(formik) => (
                    <DataModal
                      name={t("builder.sections.award")}
                      path="award.items"
                      event={ModalEvents.AWARD_MODAL}
                    >
                      <div className="grid grid-cols-2 gap-8">
                        <Input
                          label={t("shared.forms.title")}
                          className="col-span-2"
                          placeholder="Intl. Flutter Hackathon '19"
                          {...getFieldProps(formik, schema, "title")}
                        />

                        <Input
                          label={t("builder.awards.awarder")}
                          placeholder="Google"
                          {...getFieldProps(formik, schema, "organization")}
                        />

                        <Input
                          type="date"
                          label={t("shared.forms.date")}
                          {...getFieldProps(formik, schema, "date")}
                        />

                        <Input
                          type="textarea"
                          label={t("shared.forms.summary")}
                          className="col-span-2"
                          {...getFieldProps(
                            formik,
                            schema,
                            "descriptionPlaintext",
                          )}
                        />
                      </div>
                    </DataModal>
                  )}
                </Formik>
              );
            }}
          </TypedAwardItemUpdateMutation>
        );
      }}
    </TypedAwardItemMutation>
  );
};

export default memo(AwardModal);
