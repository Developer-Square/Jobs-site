import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { getFieldProps } from "../../utils";
import DataModal from "../DataModal";
import Input from "../../components/shared/Input";
import ModalEvents from "../../constants/ModalEvents";

const initialValues = {
  institution: "",
  fieldOfStudy: "",
  degree: "",
  gpa: "",
  schoolStart: "",
  schoolEnd: "",
  descriptionPlaintext: "",
};

const EducationModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    institution: Yup.string().required(t("shared.forms.validation.required")),
    fieldOfStudy: Yup.string().required(t("shared.forms.validation.required")),
    degree: Yup.string(),
    gpa: Yup.string(),
    startDate: Yup.date(),
    schoolEnd: Yup.date().when(
      "schoolStart",
      (schoolStart, yupSchema) =>
        schoolStart &&
        yupSchema.min(schoolStart, t("shared.forms.validation.dateRange")),
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
          name={t("builder.sections.education")}
          path="education.items"
          event={ModalEvents.EDUCATION_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("builder.education.institution")}
              className="col-span-2"
              placeholder="Dayananda Sagar College of Engineering"
              {...getFieldProps(formik, schema, "institution")}
            />

            <Input
              label={t("builder.education.field")}
              className="col-span-2"
              placeholder="Computer Science &amp; Engineering"
              {...getFieldProps(formik, schema, "fieldOfStudy")}
            />

            <Input
              label={t("builder.education.degree")}
              placeholder="Bachelor's Degree"
              {...getFieldProps(formik, schema, "degree")}
            />

            <Input
              label={t("builder.education.gpa")}
              placeholder="8.8"
              {...getFieldProps(formik, schema, "gpa")}
            />

            <Input
              type="date"
              label={t("shared.forms.startDate")}
              placeholder="6th August 208"
              {...getFieldProps(formik, schema, "schoolStart")}
            />

            <Input
              type="date"
              label={t("shared.forms.endDate")}
              placeholder="6th August 208"
              {...getFieldProps(formik, schema, "schoolEnd")}
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

export default memo(EducationModal);
