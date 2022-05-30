import React from "react";
import Autocomplete from "react-google-autocomplete";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";

const GOOGLE_MAPS_API_KEY = "AIzaSyBl4fQc8fENnnRLnUQ18HFWQoMabJ7hKRY";

function LocationSearch(props) {
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
              <Autocomplete
                apiKey={
                  process.env.GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY
                }
                {...props}
                onPlaceSelected={(place) => {
                  form.setFieldValue(name, place?.formatted_address);
                }}
              />
            );
          }}
        </Field>

        <ErrorMessage component={TextError} name={name} />
      </label>
    </FormInput>
  );
}

export default LocationSearch;

const FormInput = styled.div``;
