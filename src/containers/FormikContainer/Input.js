import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
import Uploader from "components/Uploader/Uploader";

function Input(props) {
  const { label, name, type, file, setFieldValue, value, ...rest } = props;

  return (
    <FormInput>
      <label htmlFor={name}>{label}</label>

      {type === "file" ? (
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <Uploader
                id={name}
                {...field}
                {...rest}
                selected={value}
                onChange={(val) => setFieldValue(name, val)}
              />
            );
          }}
        </Field>
      ) : (
        <Field
          placeholder={label}
          id={name}
          name={name}
          type={type}
          value={value}
          {...rest}
        />
      )}
      <ErrorMessage component={TextError} name={name} />
    </FormInput>
  );
}

export default Input;

const FormInput = styled.div`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  display: inline-block;
  /* padding: 20px; */

  > label {
    /* display: none; */

    margin-bottom: 5px;
    font-size: 14px;
    line-height: 28px;
    color: #333;
  }

  > input[type="text"],
  > input[type="email"],
  > input[type="password"] {
    opacity: 0.9;
  }

  > div {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;
