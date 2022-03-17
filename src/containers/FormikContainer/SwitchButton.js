import React from "react";
import { Switch } from "formik-material-ui";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function SwitchButton(props) {
  const { label, name, value, icon, formik, ...rest } = props;
  const [toggle, setToggle] = React.useState(value);

  const handleToggle = () => {
    if (toggle) {
    } else {
    }
    toggle ? setToggle(false) : setToggle(true);
    console.log("toggle State: ", toggle);
    // formik.setFieldValue(name, toggle);
  };
  return (
    <div className="form-control">
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
      </label>
      <Field
        name={name}
        component={Switch}
        onChange={handleToggle}
        checked={toggle}
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default SwitchButton;
