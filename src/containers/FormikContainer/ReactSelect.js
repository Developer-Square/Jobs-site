import React from 'react'
import Select from 'react-select'
import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

function ReactSelect(props) {
    const { label, name, options, ...rest } = props;

    return (
        <FormInput>
            <label htmlFor={name}>{label}
            <Field name={name}>
                {(field, form) => {
                    const { setFieldValue } = form;
                    const { value } = field;
                    return (
                        <Select
                            options={options}
                            value={value}
                            onInputChange={(val) => setFieldValue(name, val)} 
                            {...rest} 
                        />
                    )
                }}
            </Field>
            <ErrorMessage component={TextError} name={name} />
            </label>
        </FormInput>
    )
}

const FormInput = styled.div``

export default ReactSelect
