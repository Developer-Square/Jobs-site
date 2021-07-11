import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function SingleCheckbox(props) {
  const { label, name, checked, ...rest} = props;
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name}>
        {({ field, form }) => {
          const { setFieldValue } = form;
          const { checked } = field;
            return (
              <React.Fragment>
                <input
                  type="checkbox"
                  id={name}
                  onChange={() => setFieldValue(name, !checked)}
                  {...field}
                  {...rest}
                  checked={checked}
                />
                {/* <label htmlFor={value}>{name}</label> */}
              </React.Fragment>
            );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default SingleCheckbox;
