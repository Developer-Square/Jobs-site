import React from "react";
import { useAlert } from "react-alert";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { maybe } from "core/utils";
import {
  TypedBaseProfileMutation,
  TypedAvatarUpdateMutation,
} from "./mutations";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { baseProfileSchema } from "./validation.schema";
import LogoImage from "image/thedb.png";
import { handleAvatarUpdate } from "utils";
import UserContext from "contexts/user/user.provider";

const BaseProfile = () => {
  const alert = useAlert();
  const { user, setRefetchUser } = React.useContext(UserContext);
  const initialValues = {
    avatar: user?.avatar?.url ? user.avatar.url : LogoImage,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  };

  const showNotification = (data, errors, alert) => {
    if (errors) {
      return errors[0].message;
    }

    const successful = maybe(() => data.updateAccount.success);

    if (successful) {
      alert.show(
        {
          title: "Update Successful",
        },
        { type: "success", timeout: 5000 },
      );
      setRefetchUser((curr) => !curr);
    } else {
      const err = maybe(() => data.updateAccount.errors, []);

      if (err) {
        const nonFieldErr = normalizeErrors(
          maybe(() => data.updateAccount.errors, []),
        );
        alert.show(
          {
            title: nonFieldErr?.nonFieldErrors,
          },
          { type: "error", timeout: 5000 },
        );
      }
    }
  };

  return (
    <TypedBaseProfileMutation
      onCompleted={(data, errors) => showNotification(data, errors, alert)}
    >
      {(updateAccount, { loading }) => {
        function onSubmit(values, { setErrors, setSubmitting }) {
          updateAccount({
            variables: values,
          }).then(({ data }) => {
            if (data) {
              if (data.updateAccount) {
                if (!data.updateAccount.success) {
                  // setErrors(normalizeErrors(data.updateAccount.errors));
                  setErrors(
                    normalizeErrors(maybe(() => data.updateAccount.errors, [])),
                  );
                }
              }
            }
          });
        }

        return (
          <Formik
            initialValues={initialValues}
            validationSchema={baseProfileSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <div className="my-profile">
                    <TypedAvatarUpdateMutation
                      onCompleted={(data, errors) =>
                        handleAvatarUpdate(data, errors, alert)
                      }
                    >
                      {(updateAvatar) => {
                        const handleAvatarChange = (file) => {
                          for (let i = 0; i < file.length; i++) {
                            const f = file[i];
                            updateAvatar({
                              variables: { image: f },
                            })
                              .then((res) => {
                                handleAvatarUpdate(res.data, null, alert);
                              })
                              .catch((err) => console.log(err));
                          }
                        };

                        return (
                          <FormikControl
                            control="file"
                            type="file"
                            setFieldValue={formik.setFieldValue}
                            version="profile"
                            directUpload={true}
                            action={handleAvatarChange}
                            label="Profile Image"
                            name="avatar"
                          />
                        );
                      }}
                    </TypedAvatarUpdateMutation>

                    <FormikControl
                      control="input"
                      type="text"
                      label="First Name"
                      placeholder="First Name"
                      name="firstName"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      name="lastName"
                    />
                    {/* 
                    <FormikControl
                      control="input"
                      type="text"
                      label="Instagram"
                      placeholder="https://www.instagram.com/"
                      name="instagram"
                      icon="fa fa-instagram"
                      iconPosition="left"
                    />*/}

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
      }}
    </TypedBaseProfileMutation>
  );
};

export default BaseProfile;
