import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

function Input(props) {
  const [show, setShow] = useState(false);
  const { label, name, type, file, setFieldValue, icon, ...rest } = props;
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <FormInput className={`form-row form-row-wide`}>
      <label htmlFor={name}>
        {label}
        <i className={icon}></i>
        <Field
          className={`input-text`}
          placeholder={label}
          id={name}
          name={name}
          type={show ? "text" : type}
          {...rest}
        />
        {type === "password" ? (
          <i
            onClick={handleShow}
            className={show ? "fa fa-eye" : "fa fa-eye-slash"}
            style={{
              position: "absolute",
              right: "10px",
              bottom: "14px",
              left: "90%",

              // fontSize: "21px",
              // color: "#a0a0a0",
              // position: "absolute",
              // left: "15px",
              // bottom: "14px",
            }}
          />
        ) : null}
        <ErrorMessage component={TextError} name={name} />
      </label>
    </FormInput>
  );
}

export default Input;

const FormInput = styled.div``;
