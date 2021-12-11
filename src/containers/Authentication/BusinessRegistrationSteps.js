import React from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import FormikControl from "../FormikContainer/FormikControl";
import Button from "components/Button/Button";
import { bioSchema } from "./validation.schema";
import { handleAvatarUpdate } from "utils";
import { TypedAvatarUpdateMutation } from "./mutations";

export const Bio = ({
  initialValues,
  onEmployerProfileSubmit,
  loading,
  industries,
  switchTabs,
  alert,
}) => {
  const [showButton, setShowButton] = React.useState(true);

  const handleButton = (data) => {
    if (data === "focus") {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bioSchema}
      onSubmit={onEmployerProfileSubmit}
    >
      {(formik) => {
        return (
          <Form noValidate>
            <Spacer>
              <Link to={"/auth"} onClick={() => switchTabs("", "back")}>
                {`<`} Go to previous tab{" "}
              </Link>
            </Spacer>

            <FormikControl
              control="input"
              type="text"
              label="Company Name"
              name="company"
              icon="ln ln-icon-Lock-2"
            />

            <FormikControl
              control="input"
              type="text"
              label="Location"
              name="location"
              icon="ln ln-icon-Lock-2"
            />

            <FormikControl
              control="select"
              options={industries}
              showButton={showButton}
              hideButton={(data) => handleButton(data)}
              label="Industries"
              name="industries"
              isMulti
              id="basic-multi-select"
              classNamePrefix="select"
              icon="ln ln-icon-Lock-2"
            />

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
                      .then((res) => { })
                      .catch((err) => console.log(err));
                  }
                };

                return (
                  <>
                    {showButton ? (
                      <FormikControl
                        control="file"
                        type="file"
                        setFieldValue={formik.setFieldValue}
                        version="profile"
                        directUpload={true}
                        action={handleAvatarChange}
                        style={{
                          i: {
                            position: "initial",
                          },
                        }}
                        label="Logo"
                        showIcon={false}
                        name="avatar"
                      />
                    ) : null}
                  </>
                );
              }}
            </TypedAvatarUpdateMutation>
            {showButton ? (
              <Button
                type="submit"
                disabled={!formik.isValid}
                fullwidth
                isLoading={loading}
                title={loading ? "Verifying... " : "Get Started"}
              />
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};

const Spacer = styled.div`
  margin: ${(props) =>
    props.marginTopBottom ? props.marginTopBottom : "15px 0"};
`;
