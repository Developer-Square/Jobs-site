import React, { memo } from "react";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import * as Yup from "yup";
import { TypedMutation } from "core/mutations";
import { DELETE_ACCOUNT } from "graphql/mutations";
import DataModal from "./DataModal";
import ModalEvents from "../constants/ModalEvents";

import { withRouter } from "react-router-dom";

const initialValues = {
  password2: "",
};
const password = Yup.string()
  .min(5, "password not long enough")
  .max(100)
  .required("password is required");
const deleteAccountSchema = Yup.object().shape({
  password: password,
});
const TypedDeleteAccountMutation = TypedMutation(DELETE_ACCOUNT);
const DeleteAccountModal = () => {
  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={deleteAccountSchema}
      enableReinitialize
    >
      {(formik) => (
        <TypedDeleteAccountMutation>
          {(deleteAccount) => {
            return (
              <DataModal
                title={{
                  create: "Delete Account",
                  edit: "Delete Account",
                }}
                onEdit={deleteAccount}
                onCreate={deleteAccount}
                event={ModalEvents.DELETE_MODAL}
              >
                <Form className="changePassword">
                  <FormikControl
                    control="input"
                    type="password"
                    label="Current Password"
                    name="password"
                    className="margin-top-0"
                    icon="ln ln-icon-Lock-2"
                  />
                </Form>
              </DataModal>
            );
          }}
        </TypedDeleteAccountMutation>
      )}
    </Formik>
  );
};

export default memo(withRouter(DeleteAccountModal));
