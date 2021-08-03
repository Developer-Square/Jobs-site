import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import DataModal from "./DataModal";
// import DatabaseContext from "contexts/database/database.provider";
import FormikControl from "containers/FormikContainer/FormikControl";
import ModalEvents from "../constants/ModalEvents";
import { TypedMutation } from "core/mutations";
import { TypedQuery } from "core/queries";
// import Switch from "@material-ui/core/Switch";

import { CREATE_ADDRESS, UPDATE_ADDRESS } from "graphql/mutations";
import { COUNTRIES_QUERY } from "graphql/queries";

import { showNotification } from "helpers";

import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";

export const TypedCreateAddressMutation = TypedMutation(CREATE_ADDRESS);
export const TypedUpdateAddressMutation = TypedMutation(UPDATE_ADDRESS);
export const TypedCountriesQuery = TypedQuery(COUNTRIES_QUERY);
const initialValues = {
  firstName: "",
  lastName: "",
  companyName: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  postalCode: "",
  country: "KE",
  phone: "",
  isDefaultAddress: true,
};

const AddressModal = () => {
  const { t } = useTranslation();
  const alert = useAlert();

  // const { createResume, updateResume } = useContext(DatabaseContext);

  const schema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, t("shared.forms.validation.min", { number: 3 }))
      .required(t("shared.forms.validation.required")),
    lastName: Yup.string()
      .min(3, t("shared.forms.validation.min", { number: 3 }))
      .required(t("shared.forms.validation.required")),
    companyName: Yup.string()
      .min(3, t("shared.forms.validation.min", { number: 3 }))
      .required(t("shared.forms.validation.required")),
    streetAddress1: Yup.string()
      .min(10, t("shared.forms.validation.min", { number: 10 }))
      .required(t("shared.forms.validation.required")),
    streetAddress2: Yup.string()
      .min(10, t("shared.forms.validation.min", { number: 10 }))
      .required(t("shared.forms.validation.required")),
    city: Yup.string()
      .min(3, t("shared.forms.validation.min", { number: 3 }))
      .required(t("shared.forms.validation.required")),
    phone: Yup.string()
      .min(12, t("shared.forms.validation.min", { number: 3 }))
      .required(t("shared.forms.validation.required")),
  });
  // if (!imgPreview) {
  //   setInitialValues({ name: "", preview: img });
  // }

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
    >
      {(formik) => (
        <TypedCreateAddressMutation
          onCompleted={(data, errors) =>
            showNotification(
              data.accountAddressCreate,
              errors,
              alert,
              "accountErrors",
              "Address Created",
              formik.setErrors,
            )
          }
        >
          {(addressCreate) => {
            return (
              <TypedUpdateAddressMutation
                onCompleted={(data, errors) =>
                  showNotification(
                    data.accountAddressUpdate,
                    errors,
                    alert,
                    "accountErrors",
                    "Address Updated",
                    formik.setErrors,
                  )
                }
              >
                {(addressUpdate) => {
                  return (
                    <DataModal
                      title={{
                        create: "Create Address",
                        edit: "Edit Address",
                      }}
                      onEdit={addressUpdate}
                      onCreate={addressCreate}
                      event={ModalEvents.CREATE_ADDRESS_MODAL}
                    >
                      <div className="dashboard-list-box-content">
                        <div className="form grid grid-cols-2 gap-6">
                          <FormikControl
                            control="input"
                            type="text"
                            label="First Name"
                            placeholder="Jane"
                            name="firstName"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Last Name"
                            placeholder="Doe"
                            name="lastName"
                          />
                        </div>
                        <div className="form grid grid-cols-2 gap-6">
                          <FormikControl
                            control="input"
                            type="text"
                            label="Street Address 1"
                            placeholder="Street Address 1"
                            name="streetAddress1"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Street Address 2"
                            placeholder="Street Address 2"
                            name="streetAddress2"
                          />
                        </div>
                        <div className="form grid grid-cols-2 gap-6">
                          <FormikControl
                            control="input"
                            type="text"
                            label="Company Name"
                            placeholder="e.g. Safaricom PLC"
                            name="companyName"
                          />
                          <FormikControl
                            control="phone"
                            type="phone"
                            label="Phone Number"
                            placeholder="e.g. +254 722-123123"
                            name="phone"
                          />
                        </div>
                        <div className="form grid grid-cols-2 gap-6">
                          <FormikControl
                            control="input"
                            type="text"
                            label="City"
                            placeholder="Nairobi"
                            name="city"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Postal Code"
                            placeholder="00200"
                            name="postalCode"
                          />
                        </div>
                      </div>
                    </DataModal>
                  );
                }}
              </TypedUpdateAddressMutation>
            );
          }}
        </TypedCreateAddressMutation>
      )}
    </Formik>
  );
};

export default memo(withRouter(AddressModal));
