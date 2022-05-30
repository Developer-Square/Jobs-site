import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

function RadioButtons(props) {
  const { label, name, options, icon, ...rest } = props;
  return (
    <FormInput className=" w-full mb-3">
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
      </label>
      <Field name={name}>
        {({ field, form }) => {
          return (
            <RadioGroup
              name={name}
              value={field.value}
              row
              style={{ flexFlow: "inherit" }}
              onChange={(event) => {
                form.setFieldValue(name, event.currentTarget.value);
              }}
            >
              {options.map((option, i) => {
                return (
                  <FormControlLabel
                    onClick={() => {
                      form.setFieldValue(
                        name,
                        document.getElementById(option.value).value,
                      );
                    }}
                    className={`flex items-center`}
                    style={{ flexDirection: "inherit" }}
                    value={option.value}
                    control={<Radio id={option.value} color="primary" />}
                    label={option.label}
                    labelPlacement="end"
                    key={i}
                  />
                );
              })}
            </RadioGroup>
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </FormInput>
  );
}

export default RadioButtons;

const FormInput = styled.div``;
