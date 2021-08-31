import React from "react";
import { fontAwesomeIcons } from "data/fontAwesomeIcons";
import { lineIcons } from "data/lineIcons";
// import { simpleLineIcons } from "data/simpleLineIcons";
import FormikControl from "containers/FormikContainer/FormikControl";

const IconsSearchInput = ({ name, label, formik }) => {
  const cleanSelectData = (data) => {
    return data.reduce((arr, b) => {
      arr.push({
        value: b.className,
        label: b.className,
      });
      return arr;
    }, []);
  };
  const iconTypes = [
    ...cleanSelectData(lineIcons),
    ...cleanSelectData(fontAwesomeIcons),
    // ...cleanSelectData(simpleLineIcons),
  ];
  return (
    <div>
      <FormikControl
        control="select"
        hideButton={() => {}}
        label={label}
        name={name}
        style={{ margin: 0 }}
        options={iconTypes}
        defaultValue={formik.values[name]}
      />
    </div>
  );
};

export default IconsSearchInput;
