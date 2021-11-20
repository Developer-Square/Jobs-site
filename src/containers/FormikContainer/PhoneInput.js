import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";

function PhoneNumberInput(props) {
  const { label, name, type, file, setFieldValue, icon, ...rest } = props;
  return (
    <FormInput className="relative w-full mb-3">
      <label
        className="block text-blueGray-600 text-xs font-bold mb-2"
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
                  className:
                    "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150",
                }}
                inputClass="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                defaultCountry={"ke"}
                onlyCountries={["ke", "ug", "tz"]}
                masks={{ ke: "...-......" }}
                value={value}
                onBlur={(e) => field.onBlur(e)}
                onChange={(val) => setFieldValue(name, val)}
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
    height: 40px;
    // border-radius: 3px;
    // font-family: "Lato", sans-serif;
    // line-height: 19px;
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
