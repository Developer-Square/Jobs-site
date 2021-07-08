import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";

function PhoneNumberInput(props) {
  const { label, name, type, file, setFieldValue, icon, ...rest } = props;

  return (
    <FormInput className={`form-row form-row-wide`}>
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

const FormInput = styled.div`
  .react-tel-input .form-control {
    width: 100%;
    height: 44px;
    border-radius: 3px;
    font-family: "Lato", sans-serif;
    line-height: 19px;
    box-sizing: border-box;
    transition: border-color 0.25s ease;

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
