import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

function MUIRadioButton(props) {
  const { label, name, options, icon, ...rest } = props;

  return (
    <div className="form-control">
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
        {({ field, form }) => {
          return (
            <RadioGroup
              name={name}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              value={field.value}
              row
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
                    className={`flex items-center ${
                      field?.value === option.value
                        ? "bg-base-theme-blue text-white"
                        : "bg-white text-gray-600"
                    } px-4 border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800`}
                    value={option.value}
                    control={
                      <Radio
                        id={option.value}
                        color="primary"
                        icon={<i className="fa fa-circle-o text-lg" />}
                        checkedIcon={
                          <i className="fa fa-check-circle text-lg text-green-500" />
                        }
                      />
                    }
                    label={option.label}
                    labelPlacement="Start"
                    key={i}
                  />
                );
              })}
            </RadioGroup>
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default MUIRadioButton;
