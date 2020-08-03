import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <FormInput>
      <label htmlFor={name}>{label}</label>
      <Field placeholder={label} id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </FormInput>
  );
}

export default Input;

const FormInput = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  > label {
    display: none;
    /* opacity: 0.3;
    font-weight: bold;
    position: absolute;
    top: 22px;
    left: 20px; */
  }

  > input[type="text"],
  > input[type="email"],
  > input[type="password"] {

    }
  }
  > div {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;
