import React from "react";
import ProfileStepper from "./ProfileStepper";

const personaTitles = [
  { label: "Student", value: "Student" },
  { label: "Sir", value: "Sir" },
  { label: "Ma'am", value: "Ma'am" },
  { label: "Madam", value: "Madam" },
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },
  { label: "Ms", value: "Ms" },
  { label: "Miss", value: "Miss" },
  { label: "Engineer", value: "Engineer" },
];

const seekerSteps = [
  {
    label: "Account Settings",
    description: `Help Us understand more about you.`,
    fields: [
      {
        type: "file",
        name: "avatar",
        version: "stepper",
        multiple: false,
        description: "Upload a profile Picture",
        control: "file",
      },
      {
        name: "title",
        description: "Current Status as a Job Seeker",
        control: "mui-radio",
        options: personaTitles,
      },
    ],
  },
  {
    label: "Education",
    description: "Education",
    fields: [
      {
        name: "phone",
        description: "Current Status as a Job Seeker",
        control: "input",
      },
    ],
  },
  {
    label: "Skills",
    description: `Skills.`,
    fields: [
      {
        type: "text",
        name: "location",
        description: "Current Status as a Job Seeker",
        control: "input",
      },
    ],
  },
  {
    label: "Experience",
    description: `Skills.`,
    fields: [
      {
        type: "text",
        name: "title",
        description: "Current Status as a Job Seeker",
        control: "input",
      },
    ],
  },
];

const initValues = {};

const SeekerStepper = () => {
  const [initialValues, setInitialValues] = React.useState(initValues);

  React.useEffect(() => {
    setInitialValues(initValues);
  }, []);

  return (
    <div>
      <ProfileStepper steps={seekerSteps} initialValaues={initialValues} />
    </div>
  );
};

export default SeekerStepper;
