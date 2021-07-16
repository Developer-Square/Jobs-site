import React from 'react'
import styled from 'styled-components'
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import FormikControl from "../FormikContainer/FormikControl"
import Button from "components/Button/Button";
import { bioSchema } from './validation.schema'
import { handleAvatarUpdate } from 'utils';
import { TypedAvatarUpdateMutation } from './mutations';

export const Bio = ({initialValues, onSubmit, loading, industries, switchTabs, alert}) => {
    return (
        <Formik initialValues={initialValues} validationSchema={bioSchema} onSubmit={onSubmit}>
        {(formik) => {
        return (
            <Form noValidate>
                <Spacer>
                    <Link to={"/auth"} onClick={() => switchTabs('', 'back')}>{`<`} Go to previous tab </Link>
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
                    control="react-select"
                    options={industries}
                    label="Industries"
                    name="industries"
                    isMulti
                    className="basic-multi-select"
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
                        label="Logo"
                        name="avatar"
                        />
                    );
                    }}
                </TypedAvatarUpdateMutation>

                <Button
                    type="submit"
                    disabled={!formik.isValid}
                    fullwidth
                    loading={loading}
                    title={loading ? "Verifying ... " : "Verify"}
                />
            </Form>
        )
        }}
    </Formik>
    )
}

const Spacer = styled.div`
  margin: ${props => props.marginTopBottom ? props.marginTopBottom : "15px 0"};
`