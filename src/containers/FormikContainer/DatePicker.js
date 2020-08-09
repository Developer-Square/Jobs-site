import React from "react";
import DateView from "react-datepicker";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import moment from "moment";

function DatePicker(props) {
  const { label, name, ...rest } = props;
  return (
    <FormInput className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          console.log("value date", moment(value).format("YYYY-MM-DD"));
          return (
            <DateView
              dateFormat="yyyy-MM-dd"
              id={name}
              {...field}
              {...rest}
              selected={value}
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
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: inline-block;
  /* padding: 20px; */

  label {
    /* display: none; */

    margin-bottom: 5px;
    font-size: 14px;
    line-height: 28px;
    color: #333;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    opacity: 0.9;
  }

  div {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;
