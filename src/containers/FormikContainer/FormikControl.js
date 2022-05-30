import React from "react";

import Input from "./Input";
import Textarea from "./Textarea";
import SelectInput from "./SelectInput";
import RadioButtons from "./RadioButtons";
import CheckboxGroup from "./CheckboxGroup";
import DateInput from "./DateInput";
import UploadInput from "./UploadInput";
import PhoneNumberInput from "./PhoneInput";
import SingleCheckbox from "./SingleCheckbox";
import CreatableSelectInput from "./CreatableSelect";
import MUIRadioButton from "./RadioButton.MUI";
import Code from "./Code";
import AsyncSelect from "./AsyncSelect";
import LocationSearch from "./LocationSearch";
import SwitchButton from "./SwitchButton";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <SelectInput {...rest} />;
    case "async-select":
      return <AsyncSelect {...rest} />;
    case "create-select":
      return <CreatableSelectInput {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "mui-radio":
      return <MUIRadioButton {...rest} />;
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
    case "code":
      return <Code {...rest} />;
    case "location":
      return <LocationSearch {...rest} />;
    case "switch":
      return <SwitchButton {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
