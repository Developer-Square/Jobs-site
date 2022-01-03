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
              value={field.value}
              onChange={(event) => {
                form.setFieldValue(name, event.currentTarget.value);
              }}
            >
              <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                {options.map((option, i) => {
                  return (
                    <div className="flex items-center bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                      <div>
                        <FormControlLabel
                          value={option.value}
                          control={
                            <Radio
                              style={{
                                flex: "0 0 auto",
                                alignSelf: "flex-start",
                                marginRight: "0",
                              }}
                              color="primary"
                              icon={<i className="fa fa-circle-o text-lg" />}
                              checkedIcon={
                                <i className="fa fa-check-circle text-lg" />
                              }
                            />
                          }
                          label={option.label}
                          labelPlacement="Start"
                          key={i}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default MUIRadioButton;
