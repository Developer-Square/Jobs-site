import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import PhoneInput from "react-phone-input-2";

function PhoneNumberInput(props) {
  const { label, name, type, file, setFieldValue, icon, ...rest } = props;

  return (
    <FormInput className={`form-row form-row-wide`}>
      <label htmlFor={name}>
        {label}
        <i className={`ln ${icon}`}></i>
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <PhoneInput
                id={name}
                name={name}
                inputExtraProps={{
                  name: "mobile",
                  required: true,
                  autoFocus: false,
                  className: "input-group mb-3 phone-input",
                }}
                //   className="form-control"
                className={`input-text`}
                defaultCountry={"ke"}
                onlyCountries={["ke", "ug", "tz"]}
                masks={{ ke: "...-......" }}
                value={value}
                onBlur={(e) => field.onBlur(e)}
                onChange={(val) => setFieldValue(name, val)}
                {...field}
                {...rest}
              />
            );
          }}
        </Field>

        <ErrorMessage component={TextError} name={name} />
      </label>
    </FormInput>
  );
}

export default PhoneNumberInput;

const FormInput = styled.p`
  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }

  .react-tel-input .country-list {
    max-width: 400px;
    width: 2000%;
  }
  .react-tel-input .form-control {
    width: 100%;
    height: 48px;
    border-radius: 6px;
    background-color: ${themeGet("colors.lightColor", "#F7F7F7")};
    border: 1px solid ${themeGet("colors.borderColor", "#E6E6E6")};
    font-family: "Lato", sans-serif;
    font-size: ${themeGet("fontSizes.2", "15")}px;
    font-weight: ${themeGet("fontWeights.3", "400")};
    color: ${themeGet("colors.darkBold", "#6c3a1f")};
    line-height: 19px;
    box-sizing: border-box;
    transition: border-color 0.25s ease;

    &:hover,
    &:focus {
      outline: 0;
    }

    &:focus {
      border-color: ${themeGet("colors.primary", "#6c3a1f")};
    }

    &::placeholder {
      color: ${themeGet("colors.darkRegular", "#77798c")};
      font-size: 14px;
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &.disabled {
      .inner-wrap {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }
  }
`;
