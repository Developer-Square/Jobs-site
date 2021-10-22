import React from "react";
import ReactCodeInput from "components/CodeInput/CodeInput";
import { Field, ErrorMessage } from "formik";
import styled from "styled-components";
import TextError from "./TextError";

const Code = (props) => {
  const { name, label, icon, ...rest } = props;
  return (
    <FormInput className="relative w-full mb-3">
      <label
        className="flex justify-center items-center text-blueGray-600 text-xs font-bold mb-2"
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
        <Field className="position-items-center" name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <ReactCodeInput
                value={value}
                onChange={(val) => setFieldValue(name, val)}
                type="text"
                fields={6}
                style={{ display: "flex", flexDirection: "row" }}
              />
            );
          }}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </label>
    </FormInput>
  );
};

export default Code;

const FormInput = styled.div``;
