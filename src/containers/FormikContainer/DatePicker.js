import React from "react";
import DateView from "react-datepicker";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

function DatePicker(props) {
  const { label, name, icon, ...rest } = props;
  return (
    <FormInput className="form-row form-row-wide">
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
            <DateView
              dateFormat="yyyy-MM-dd"
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
    </FormInput>
  );
}

export default DatePicker;

const FormInput = styled.div`
  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;
