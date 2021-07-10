import React from 'react'
import styled from 'styled-components'
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import FormikControl from "../FormikContainer/FormikControl"
import Button from "components/Button/Button";
import { bioSchema } from './validation.schema'

export const Bio = ({initialValues, onSubmit, loading, industries, switchTabs}) => {
    return (
        <Formik initialValues={initialValues} validationSchema={bioSchema} onSubmit={onSubmit}>
        {(formik) => {
            console.log(formik)
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

                <FormikControl
                    control="file"
                    label="Logo"
                    name="logo"
                    icon="ln ln-icon-Lock-2"
                />

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