import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
// import RichTextEditor from "components/RichTextEditor/RichTextEditor";

function Textarea(props) {
  const { label, name, ...rest } = props;
  return (
    <FormInput className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} />
      {/* <RichTextEditor
          disabled={disabled}
          error={!!formErrors.descriptionJson}
          helperText={getProductErrorMessage(formErrors.descriptionJson, intl)}
          initial={initialDescription}
          label={intl.formatMessage(commonMessages.description)}
          name="description"
          onChange={onChange}
        /> */}
      <ErrorMessage component={TextError} name={name} />
    </FormInput>
  );
}

export default Textarea;

const FormInput = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: inline-block;
  /* padding: 20px; */

  > label {
    /* display: none; */

    margin-bottom: 5px;
    font-size: 14px;
    line-height: 28px;
    color: #333;
  }

  > input[type="text"],
  > input[type="email"],
  > input[type="password"],
  textarea,
  select {
    opacity: 0.9;
  }

  > div {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;
