import React from "react";
import ProfileStepper from "./ProfileStepper";
import { useHistory } from "react-router-dom";
import { normalizeErrors, IsNotEmpty } from "helpers";
import UserContext from "contexts/user/user.provider";
import { maybe } from "misc";
import { showSeekerProfileNotification } from "utils";
import { TypedSeekerProfileMutation } from "containers/Authentication/mutations";
import ConstantsContext from "contexts/constants/constants.provider";

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

const SeekerStepper = () => {
  const initValues = {};
  const history = useHistory();
  const [initialValues, setInitialValues] = React.useState(initValues);
  const { setRefetchUser, user, getUser } = React.useContext(UserContext);
  const { seekerGender, seekerStatus } = React.useContext(ConstantsContext);

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
          description: "Current Title",
          control: "mui-radio",
          options: personaTitles,
        },
        {
          name: "idNumber",
          description: "Your ID Number",
          control: "input",
          type: "number",
        },
        {
          name: "dateOfBirth",
          control: "date",
          description: "Date of Birth",
        },
        {
          name: "status",
          description: "Select Current Job Status",
          control: "mui-radio",
          options: seekerStatus,
        },
        {
          name: "gender",
          description: "Selet a Gender",
          control: "mui-radio",
          options: seekerGender,
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

  React.useEffect(() => {
    setInitialValues(initValues);
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seekerProfileCreate = (values, seekerCreate, setErrors) => {
    // const interests = values.interests.reduce((arr, b) => {
    //   arr.push(b.value);
    //   return arr;
    // }, []);
    const industries = values.industries.reduce((arr, b) => {
      arr.push(b.value);
      return arr;
    }, []);
    seekerCreate({
      variables: {
        institution: values.school.value,
        industries: industries,
        interests: [],
        skills: [],
        course: values.course.value,
      },
    }).then(({ data }) => {
      if (data) {
        if (data.seekerCreate) {
          history.push("/dashboard/billing");
          setRefetchUser();

          if (!data.seekerCreate.success) {
            setErrors(
              normalizeErrors(maybe(() => data.seekerCreate.errors, [])),
            );
          }
        }
      }
    });
  };

  return (
    <TypedSeekerProfileMutation
      onCompleted={(data, errors) =>
        showSeekerProfileNotification(data, errors, alert)
      }
    >
      {(seekerCreate, { loading }) => {
        function onSeekerProfileSubmit(values, { setErrors }) {
          if (IsNotEmpty(values.industries)) {
            seekerProfileCreate(values, seekerCreate, setErrors);
          }
        }
        return (
          // <FurtherInformation
          //   schoolOptions={schoolOptions}
          //   industries={industries}
          //   courses={courseOptions}
          //   loading={loading}
          //   onSeekerProfileSubmit={
          //     onSeekerProfileSubmit
          //   }
          //   initialValues={schoolInterestsInitialValues}
          //   alert={alert}
          // />

          <ProfileStepper
            onProfileInitialSubmit={onSeekerProfileSubmit}
            onProfileSubmit={onSeekerProfileSubmit}
            isEdit={user?.isSeeker && user?.seeker}
            setRefetchUser={setRefetchUser}
            steps={seekerSteps}
            initialValaues={initialValues}
          />
        );
      }}
    </TypedSeekerProfileMutation>
  );
};

export default SeekerStepper;
