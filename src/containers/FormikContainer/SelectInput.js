import React from "react";
import { Field, ErrorMessage } from "formik";
import styled from "styled-components";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import TextError from "./TextError";

function SelectInput(props) {
  const { label, name, options, icon, style, hideButton, ...rest } = props;

  // Hide the submit button whenever the select input is active and vice versa.
  const handleButton = (data) => {
    hideButton(data);
  };

  const handleChange = (name, val, setFieldValue) => {
    const inputOrganization = document.getElementById("react-select-3-input");
    const inputSeeker = document.getElementById("react-select-5-input");

    // Check if the select input is still the focused element.
    if (document.activeElement === inputOrganization) {
      inputOrganization.blur();
    }

    if (document.activeElement === inputSeeker) {
      inputSeeker.blur();
    }

    handleButton("blur");
    setFieldValue(name, val);
  };

  return (
    <FormInput className="relative w-full mb-3" style={style}>
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
            return rest?.isAsync ? (
              <AsyncSelect
                value={value}
                cacheOptions={rest.cacheOptions}
                loadOptions={rest.loadOptions}
                defaultOptions={rest.defaultOptions}
                onInputChange={rest.handleInputChange}
                onChange={(val) => handleChange(name, val, setFieldValue)}
              />
            ) : (
              <Select
                options={options}
                value={value}
                onFocus={() => handleButton("focus")}
                onBlur={() => handleButton("blur")}
                onChange={(val) => handleChange(name, val, setFieldValue)}
                className="shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                // {...field}
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

export default SelectInput;

const FormInput = styled.div`
  .error {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
  .css-2b097c-container {
  }
  .css-yk16xz-control {
    padding: 2px;
    outline: none;
    font-size: 14px;
    color: #909090;
    margin: 0;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: #fcfcfc;
    font-weight: 500;
    border: 1px solid #e0e0e0;
    opacity: 1;
  }
`;
