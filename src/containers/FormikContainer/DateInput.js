import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
import moment from "moment";
import Input from "components/shared/Input";

function DateInput(props) {
  const { label, name, icon, ...rest } = props;
  return (
    <FormInput className="relative w-full mb-3">
      <label
        className="block text-blueGray-600 text-xs font-bold"
        htmlFor={name}
      >
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
            return (
              <Input
                id={name}
                type="date"
                placeholder="6th August 2008"
                name={field.name}
                value={moment(field.value).format("YYYY-MM-DD")}
                onBlur={field.onBlur}
                onChange={field.onChange}
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
    padding: 0;
  }
  .react-date-picker__calendar {
    z-index: 9999;
  }
  .react-date-picker__wrapper {
    padding: 6px;
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
