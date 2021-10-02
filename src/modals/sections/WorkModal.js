import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { getFieldProps } from "../../utils";
import DataModal from "../DataModal";
import Input from "../../components/shared/Input";
import ModalEvents from "../../constants/ModalEvents";

const initialValues = {
  company: "",
  position: "",
  website: "",
  workStart: "",
  workEnd: "",
  descriptionPlaintext: "",
};

const WorkModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    company: Yup.string().required(t("shared.forms.validation.required")),
    position: Yup.string().required(t("shared.forms.validation.required")),
    website: Yup.string().url(t("shared.forms.validation.url")),
    workStart: Yup.date(),
    workEnd: Yup.date().when(
      "startDate",
      (workStart, yupSchema) =>
        workStart &&
        yupSchema.min(workStart, t("shared.forms.validation.dateRange")),
    ),
    descriptionPlaintext: Yup.string().min(
      10,
      t("shared.forms.validation.min", { number: 10 }),
    ),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          path="work.items"
          name={t("builder.sections.work")}
          event={ModalEvents.WORK_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("builder.work.company")}
              className="col-span-2"
              placeholder="Postdot Technologies Pvt. Ltd."
              {...getFieldProps(formik, schema, "company")}
            />

            <Input
              label={t("shared.forms.position")}
              placeholder="Full Stack Web Developer"
              {...getFieldProps(formik, schema, "position")}
            />

            <Input
              label={t("shared.forms.website")}
              placeholder="https://"
              {...getFieldProps(formik, schema, "website")}
            />

            <Input
              type="date"
              label={t("shared.forms.startDate")}
              placeholder="6th August 208"
              {...getFieldProps(formik, schema, "workStart")}
            />

            <Input
              type="date"
              label={t("shared.forms.endDate")}
              placeholder="6th August 208"
              {...getFieldProps(formik, schema, "workEnd")}
            />

            <Input
              type="textarea"
              label={t("shared.forms.summary")}
              className="col-span-2"
              {...getFieldProps(formik, schema, "descriptionPlaintext")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default memo(WorkModal);
