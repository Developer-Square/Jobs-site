import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

const AsyncSelect = (props) => {
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
            return (
              <AsyncPaginate
                placeholder={rest?.placeholder}
                getOptionValue={rest?.getOptionValue}
                getOptionLabel={rest?.getOptionLabel}
                value={field.value}
                additional={rest?.additional}
                loadOptions={rest?.loadOptions}
                onChange={(val) => form.setFieldValue(field.name, val)}
                // {...rest}
                //   reduceOptions={reduceGroupedOptions}
              />
            );
          }}
        </Field>

        <ErrorMessage component={TextError} name={name} />
      </label>
    </FormInput>
  );
};

export default AsyncSelect;

const FormInput = styled.div``;
