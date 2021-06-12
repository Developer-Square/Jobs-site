import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

function Input(props) {
  const { label, name, type, file, setFieldValue, icon, ...rest } = props;

  return (
    <FormInput className={`form-row form-row-wide`}>
      <label htmlFor={name}>
        {label}
        <i className={`ln ${icon}`}></i>

        <Field
          className={`input-text`}
          placeholder={label}
          id={name}
          name={name}
          type={type}
          {...rest}
        />
        <ErrorMessage component={TextError} name={name} />
      </label>
    </FormInput>
  );
}

export default Input;

const FormInput = styled.p`
  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;
