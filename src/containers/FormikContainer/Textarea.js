import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { themeGet } from "@styled-system/theme-get";
import styled from "styled-components";
import EditorField from "./EditorField";

function Textarea(props) {
  const { label, name, rte, value, ...rest } = props;
  return (
    <FormInput className="relative w-full mb-3">
      <label
        className="block text-blueGray-600 text-xs font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      {rest?.subText && (
        <span
          style={{
            font: "10px",
            // color: "#fefefe",
            fontStyle: "italic",
          }}
        >
          {rest?.subText}
        </span>
      )}
      {rte ? (
        <Field
          as="textarea"
          id={name}
          name={name}
          value={value}
          component={EditorField}
          className="border-0 px-3 py-3 placeholder-blueGray-900 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          {...rest}
        />
      ) : (
        <Field as="textarea" id={name} name={name} value={value} {...rest} />
      )}

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

  .rdw-editor-toolbar {
    padding: 6px 5px 0;
    border-radius: 2px;
    border: 1px solid #f1f1f1;
    display: flex;
    justify-content: flex-start;
    background: #e6e6e6;
    flex-wrap: wrap;
    font-size: 15px;
    margin-bottom: 5px;
    -webkit-user-select: none;
    user-select: none;
    a {
      color: ${themeGet("colors.darkBold", "#6c3a1f")};
      -webkit-transition: 0.3s;
      transition: 0.3s;
    }
  }
  .editorClassName {
    width: 100%;
    min-height: 100px;
    max-height: 300px;
    border-radius: 6px;
    background-color: ${themeGet("colors.lightColor", "#F7F7F7")};
    border: 1px solid ${themeGet("colors.borderColor", "#E6E6E6")};
    font-family: "Lato", sans-serif;
    font-size: ${themeGet("fontSizes.2", "15")}px;
    font-weight: ${themeGet("fontWeights.3", "400")};
    color: ${themeGet("colors.darkBold", "#6c3a1f")};
    line-height: 19px;
    padding: 0 18px;
    box-sizing: border-box;
    transition: border-color 0.25s ease;

    &:hover,
    &:focus {
      outline: 0;
    }

    &:focus {
      border-color: ${themeGet("colors.primary", "#6c3a1f")};
    }

    &::placeholder {
      color: ${themeGet("colors.darkRegular", "#77798c")};
      font-size: 14px;
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &.disabled {
      .inner-wrap {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }
  }
`;
