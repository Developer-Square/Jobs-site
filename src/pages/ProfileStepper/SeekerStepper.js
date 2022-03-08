import React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import ProfileStepper from "./ProfileStepper";
import { useHistory } from "react-router-dom";
import { normalizeErrors, IsNotEmpty } from "helpers";
import UserContext from "contexts/user/user.provider";
import { maybe } from "misc";
import { showSeekerProfileNotification } from "utils";
import { TypedSeekerProfileMutation } from "containers/Authentication/mutations";
import ConstantsContext from "contexts/constants/constants.provider";
import CoursesSearch from "components/CoursesSearch/CoursesSearch";
import {
  SEEKER_PROFILE_MUTATION,
  SEEKER_PROFILE_COMPLETION,
  SKILL_ITEM_CREATE,
  AVATAR_UPDATE_MUTATION,
  EDUCATION_ITEM_CREATE,
  WORK_ITEM_CREATE,
} from "graphql/mutations";
import { handleAvatarUpdate } from "utils";
import moment from "moment";

const personaTitles = [
  { label: "Student", value: "Student" },
  { label: "Sir", value: "Sir" },
  { label: "Ma'am", value: "Ma'am" },
  { label: "Madam", value: "Madam" },
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },
  { label: "Ms", value: "Ms" },
  { label: "Miss", value: "Miss" },
];

const SeekerStepper = () => {
  const initValues = {};
  const history = useHistory();
  const alert = useAlert();
  const [initialValues, setInitialValues] = React.useState(initValues);
  const { setRefetchUser, userLoading, user, getUser, userData } =
    React.useContext(UserContext);
  const {
    seekerGender,
    seekerStatus,
    seekerNationality,
    educationLevel,
    institutions,
    industries,
    skills,
  } = React.useContext(ConstantsContext);
  const [updateAvatar] = useMutation(AVATAR_UPDATE_MUTATION);

  const [updateSeekerProfile] = useMutation(SEEKER_PROFILE_COMPLETION, {
    onCompleted: (data) => {
      setRefetchUser((prev) => !prev);
    },
  });

  const [
    createSeeker,
    { data: seekerData, loading: seekerLoading, error: seekerError },
  ] = useMutation(SEEKER_PROFILE_MUTATION, {
    onCompleted: (data) => {
      // after this I've to send another req
      setRefetchUser((prev) => !prev);
    },
  });
  const [createSkills] = useMutation(SKILL_ITEM_CREATE, {
    onCompleted: (data) => {
      // after this I've to send another req
      updateSeekerProfile({
        variables: {
          id: user?.seeker?.profileCompletion?.id,
          skills: true,
          education: true,
          settings: true,
          experience: false,
        },
      });
    },
  });
  const [createEducation] = useMutation(EDUCATION_ITEM_CREATE, {
    onCompleted: (data) => {
      // after this I've to send another req
      updateSeekerProfile({
        variables: {
          id: user?.seeker?.profileCompletion?.id,
          education: true,
          settings: true,
          skills: false,
          experience: false,
        },
      });
    },
  });
  const [createWork] = useMutation(WORK_ITEM_CREATE, {
    onCompleted: (data) => {
      // after this I've to send another req
      updateSeekerProfile({
        variables: {
          id: user?.seeker?.profileCompletion?.id,
          experience: true,
          skills: true,
          education: true,
          settings: true,
        },
      });
    },
  });
  const seekerCreateSubmit = (values) => {
    console.log("inafika", values);
    values.industries = values.industries.map((industry) => industry.value);
    values.nationality = values.nationality.value;
    values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD");
    // values.mobile = user.phone;
    // const g = new Date(values.dateOfBirth).getDate();
    // values.dateOfBirth = new Date(values.dateOfBirth).getDate();

    console.log("all the seeker values", values);
    if (IsNotEmpty(values.industries)) {
      createSeeker({ variables: { ...values, mobile: user?.phone } });
    }
    return { seekerData, seekerLoading, seekerError };
  };

  const seekerUpdateSubmit = (values) => {
    console.log("inafika", values);
    if (IsNotEmpty(values.skills)) {
      for (let i = 0; i < values.skills.length; i++) {
        const element = values.skills[i];
        createSkills({
          variables: {
            name: element.label,
            proficiency: "Intermediate",
            level: "Intermediate",
            owner: user?.seeker?.id,
          },
        });
      }
    }
  };

  const educationCreateSubmit = (values) => {
    console.log("inafika", values);
    values.institution = values?.institution?.label || values?.institution;
    values.course = values?.course?.label || values?.institution;

    console.log(user);
    // values.schoolStart = new Date(values.schoolStart).getDate();
    // values.schoolEnd = new Date(values.schoolEnd).getDate();
    console.log("all the seeker values", values);
    createEducation({
      variables: {
        ...values,
        degree: "Bachelor's Degree",
        owner: user?.seeker?.id,
      },
    });
  };

  const experienceCreateSubmit = (values) => {
    console.log("inafika", values);
    // values.workStart = new Date(values.workStart).getDate();
    // values.workEnd = new Date(values.workEnd).getDate();
    console.log("all the seeker values", values);
    createWork({ variables: { ...values, owner: user?.seeker?.id } });
  };
  const handleAvatarChange = (file) => {
    for (let i = 0; i < file.length; i++) {
      const f = file[i];
      updateAvatar({
        variables: { image: f },
      })
        .then((res) => {
          handleAvatarUpdate(res.data, null, alert);
        })
        .catch((err) => console.log(err));
    }
  };

  const seekerSteps = [
    {
      label: "Account Settings",
      description: `Help Us understand more about you.`,
      mutation: seekerCreateSubmit,
      fields: [
        {
          type: "file",
          name: "avatar",
          version: "stepper",
          multiple: false,
          description: "Upload a profile Picture",
          onChangeCallback: handleAvatarChange,
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
        {
          control: "location",
          type: "text",
          description: "Location",
          name: "location",
        },
        {
          control: "select",
          label: "Nationality",
          name: "nationality",
          hideButton: () => {},
          style: { margin: 0 },
          options: seekerNationality,
          description: "Choose your Nationality",
          defaultValue: { value: "", label: "Select Nationality" },
        },
        {
          control: "select",
          label: "Industry Interests",
          isMulti: true,
          name: "industries",
          hideButton: () => {},
          style: { margin: 0 },
          options: industries,
          description: "Choose your Industries",
        },
        {
          name: "linkedin",
          description: "Your LinkedIn Profile",
          placeholder: "https://www.linkedin.com/in/john-doe-112",
          control: "input",
          type: "text",
        },
        {
          name: "description",
          description: "About Yourself",
          control: "textarea",
          rte: true,
          fullWidth: true,
        },
      ],
    },
    {
      label: "Education",
      description: "Education",
      mutation: educationCreateSubmit,
      useFieldArray: false,
      blankValues: {
        institution: "",
        fieldOfStudy: "",
        level: "",
        schoolStart: "",
        schoolEnd: "",
        gpa: 0,
        degree: "Bachelor's Degree",
      },
      fields: [
        {
          control: "select",
          label: "Institution",
          name: "institution",
          hideButton: () => {},
          style: { margin: 0 },
          options: institutions,
          description: "Choose your Institution",
          defaultValue: { value: "", label: "Select Institution" },
        },
        {
          name: "fieldOfStudy",
          type: "custom",
          description: "Select the course studied",
          Component: (
            <CoursesSearch label="Field Of Study" name="fieldOfStudy" />
          ),
        },
        {
          name: "level",
          description: "Selet EducationL Level",
          control: "mui-radio",
          options: educationLevel,
        },
        {
          name: "gpa",
          description: "Your GPA",
          control: "input",
          type: "text",
        },
        {
          name: "schoolStart",
          control: "date",
          description: "Course Start Date",
        },
        {
          name: "schoolEnd",
          control: "date",
          description: "Course End Date",
        },
      ],
    },
    {
      label: "Skills",
      description: `Skills.`,
      mutation: seekerUpdateSubmit,
      fields: [
        {
          control: "select",
          label: "Skills",
          isMulti: true,
          name: "skills",
          hideButton: () => {},
          style: { margin: 0 },
          options: skills,
          description: "Choose your Skills",
        },
      ],
    },
    {
      label: "Experience",
      description: `Experience.`,
      mutation: experienceCreateSubmit,
      useFieldArray: false,
      blankValues: {
        company: "",
        website: "",
        position: "",
        workStart: "",
        workEnd: "",
        achievements: "",
        descriptionPlaintext: "",
      },
      fields: [
        {
          name: "company",
          description: "Company Name",
          control: "input",
        },
        {
          name: "website",
          description: "Company Website",
          placeholder: "https://",
          control: "input",
          type: "text",
        },
        {
          name: "position",
          description: "Position",
          control: "input",
        },
        {
          name: "workStart",
          control: "date",
          description: "Start Date",
        },
        {
          name: "workEnd",
          control: "date",
          description: "End Date",
        },
        {
          name: "descriptionPlaintext",
          description: "Description of the work",
          control: "textarea",
          rte: false,
        },
        {
          name: "achievements",
          description: "Acheivements During said period",
          control: "textarea",
          rte: false,
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
  if (
    !seekerGender ||
    !seekerStatus ||
    !seekerNationality ||
    !educationLevel ||
    !institutions ||
    !skills
  )
    return <div>To Load</div>;

  if (userLoading) return <>Loading...</>;

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
            isEdit={userData?.me?.isSeeker && user?.seeker}
            setRefetchUser={setRefetchUser}
            steps={seekerSteps}
            initialValaues={initialValues}
            sets={userData?.me?.seeker?.profileCompletion}
          />
        );
      }}
    </TypedSeekerProfileMutation>
  );
};

export default SeekerStepper;
