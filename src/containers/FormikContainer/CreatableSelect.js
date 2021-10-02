import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";

function CreatableSelectInput(props) {
  const { label, name, options, icon, style, showButton, hideButton, action, ...rest } = props;

  const handleChange = (name, val, setFieldValue) => {
    hideButton('blur')
    setFieldValue(name, val);
    // Call the onSubmit function.
    action(val);
  }

  // Hide the submit button whenever the select input is active and vice versa.
  const handleButton = (data) => {
    hideButton(data);
  }

  return (
    <FormInput className={`form-row form-row-wide`} style={style}>
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
              <CreatableSelect
                isClearable
                options={options}
                value={value}
                onFocus={() => handleButton('focus')}
                onBlur={() => handleButton('blur')}
                onChange={(val) => handleChange(name, val, setFieldValue)}
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

export default CreatableSelectInput;

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
