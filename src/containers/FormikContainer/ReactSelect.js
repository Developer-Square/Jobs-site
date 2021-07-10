import React from 'react'
import Select from 'react-select'
import { ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

function ReactSelect(props) {
    const { label, name, ...rest } = props;

    return (
        <FormInput>
            <label htmlFor={name}>{label}
            <Select {...rest} />
            <ErrorMessage component={TextError} name={name} />
            </label>
        </FormInput>
    )
}

const FormInput = styled.div``

export default ReactSelect
