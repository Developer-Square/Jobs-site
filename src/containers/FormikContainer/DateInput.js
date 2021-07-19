import React from "react";
import DatePicker from "react-date-picker";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

function DateInput(props) {
  const { label, name, icon, ...rest } = props;
  return (
    <FormInput className="form-row form-row-wide">
      <label htmlFor={name}>
        {rest.iconPosition ? (
          <>
            {rest.iconPosition === "left" ? (
              <>
                <i className={icon} />
                {label}
              </>
            ) : (
              <>
                {label} <i className={icon} />
              </>
            )}
          </>
        ) : (
          label
        )}
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <DatePicker
                dateFormat="y-MM-dd"
                id={name}
                {...field}
                {...rest}
                selected={typeof value === "string" ? new Date(value) : value}
                onChange={(val) => setFieldValue(name, val)}
              />
            );
          }}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </label>
    </FormInput>
  );
}

export default DateInput;

const FormInput = styled.div`
  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
  .react-date-picker__inputGroup__input {
    display: initial;
    border: none;
  }
  .react-date-picker__calendar {
    z-index: 9999;
  }
  .react-date-picker__wrapper {
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    background: #fcfcfc;
    color: #909090;
  }
  .react-date-picker__clear-button react-date-picker__button {
    &:hover {
      background: #d2d2d2;
    }
  }
  .react-date-picker__calendar-button react-date-picker__button {
    &:hover {
      background: #d2d2d2;
    }
  }
`;