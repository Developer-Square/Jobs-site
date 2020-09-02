import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <FormInput className="form-control">
      <label>{label}</label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <Fragment key={option.value}>
                <label>
                  <input
                    type="radio"
                    id={option.key}
                    {...field}
                    {...rest}
                    value={Boolean(option.value)}
                    checked={field.value === `${option.value}`}
                  />
                  {option.key}
                </label>
              </Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </FormInput>
  );
}

export default RadioButtons;

const FormInput = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 10px;
  display: flex;
  /* padding: 20px; */

  > label {
    display: inherit;

    margin-bottom: 5px;
    font-size: 14px;
    line-height: 28px;
    color: #333;
  }

  input,
  textarea,
  select {
    opacity: 0.9;
    height: 10px;
    width: 14px;
  }

  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;
const Fragment = styled.div`
  margin: 0 auto;
  display: flex;
  /* padding: 20px; */

  > label {
    display: inherit;

    margin-bottom: 5px;
    font-size: 14px;
    line-height: 28px;
    color: #333;
  }

  input,
  textarea,
  select {
    opacity: 0.9;
    height: 20px;
    width: 14px;
  }
  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;
