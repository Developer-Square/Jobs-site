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
    width: 100%;
    border: 0;
    color: #fff;
    padding: 10px 0px;
    background: transparent;
    border-bottom: 1px solid #fff;

    &:focus {
      /* // removing default focus style */
      outline: 0;
      color: #fff;
      border-bottom: 2px solid #fff;
      /* // adding new one */
      background: transparent;
    }
    /* &:valid {
        background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/check.svg);
        background-size: 20px;
        background-repeat: no-repeat;
        background-position: 20px 20px;
        & + label {
          opacity: 0;
        }
      }

    &:invalid:not(:focus):not(:placeholder-shown) {
        background: palevioletred;
        & + label {
          opacity: 0;
        }
      }

      &:invalid:focus:not(:placeholder-shown) {
        & ~ .requirements {
          max-height: 200px;
          padding: 0 30px 20px 50px;
        }
      } */
    }
  }
  > div {
    color: palevioletred;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-style: italic;
  }
`;
