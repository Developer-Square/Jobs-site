import React from "react";

import Input from "./Input";
import Textarea from "./Textarea";
import SelectInput from "./SelectInput";
import RadioButtons from "./RadioButtons";
import CheckboxGroup from "./CheckboxGroup";
import DateInput from "./DateInput";
import UploadInput from "./UploadInput";
import PhoneNumberInput from "./PhoneInput";
import SingleCheckbox from './SingleCheckbox'



function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <SelectInput {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxGroup {...rest} />;
    case "single-checkbox":
      return <SingleCheckbox {...rest} />;
    case "date":
      return <DateInput {...rest} />;
    case "file":
      return <UploadInput {...rest} />;
    case "phone":
      return <PhoneNumberInput {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
