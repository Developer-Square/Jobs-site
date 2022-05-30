import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { Switch } from "@material-ui/core";

function SwitchButton(props) {
  const { label, name, value, icon, ...rest } = props;

  return (
    <div className="form-control">
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
            <Switch
              checked={field.value}
              onChange={(e) => form.setFieldValue(name, e.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
              color={`primary`}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default SwitchButton;
