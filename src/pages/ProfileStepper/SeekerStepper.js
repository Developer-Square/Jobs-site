import React from "react";
import * as Yup from "yup";
import * as schema from "common/yupFieldValidation";
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
  SOCIAL_ITEM_CREATE,
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

const GPA = [
  { label: "A+    [% - 97-100,    scale - 4.0]", value: "A+" },
  { label: "A     [% - 93-96,     scale - 4.0]", value: "A" },
  { label: "A-    [% - 90-92,     scale - 3.7]", value: "A-" },
  { label: "B+    [% - 87-89,     scale - 3.3]", value: "B+" },
  { label: "B     [% - 83-86,     scale - 3.0]", value: "B" },
  { label: "B-    [% - 80-82,     scale - 2.7]", value: "B-" },
  { label: "C+    [% - 77-79,     scale - 2.3]", value: "C+" },
  { label: "C     [% - 73-76,     scale - 2.0]", value: "C" },
  { label: "C-    [% - 70-72,     scale - 1.7]", value: "C-" },
  { label: "D+    [% - 67-69,     scale - 1.3]", value: "D+" },
  { label: "D     [% - 65-66,     scale - 1.0]", value: "D" },
  { label: "E/F   [% - Below 65,  scale - 0.0]", value: "E/F" },
];
const socials = [
  {
    label: (
      <div>
        <i className="fa fa-facebook-square" /> facebook
      </div>
    ),
    value: "https://www.facebook.com/",
  },
  {
    label: (
      <div>
        <i className="fa fa-twitter-square" /> twitter
      </div>
    ),
    value: "https://www.twitter.com/",
  },
  {
    label: (
      <div>
        <i className="fa fa-instagram" /> instagram
      </div>
    ),
    value: "https://www.instagram.com/",
  },
  {
    label: (
      <div>
        <i className="fa fa-linkedin-square" /> linkedin
      </div>
    ),
    value: "https://www.linkedin.com/",
  },
  {
    label: (
      <div>
        <i className="fa fa-github-square" /> github
      </div>
    ),
    value: "https://www.github.com/",
  },
  {
    label: (
      <div>
        <i className="fa fa-tiktok" /> tiktok
      </div>
    ),
    value: "https://www.tiktok.com/",
  },
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
          socials: false,
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
          socials: false,
        },
      });
    },
  });
  const [createSocial] = useMutation(SOCIAL_ITEM_CREATE, {
    onCompleted: (data) => {
      // after this I've to send another req
      console.log(data);
      updateSeekerProfile({
        variables: {
          id: user?.seeker?.profileCompletion?.id,
          education: true,
          settings: true,
          skills: true,
          experience: true,
          socials: true,
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
          socials: false,
        },
      });
    },
  });

  const seekerCreateSubmit = (values) => {
    console.log("inafika", values);
    values.industries = values.industries.map((industry) => industry.value);
    values.nationality = values.nationality.value;
    values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD");

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

    for (let k = 0; k < values.Education.length; k++) {
      let e = values.Education[k];
      e.institution = e?.institution?.label || e?.institution;
      e.course = e?.course?.label || e?.institution;
      e.gpa = e?.gpa?.label || e?.gpa;

      console.log("all the edu values", e);
      createEducation({
        variables: {
          ...e,
          degree: "Bachelor's Degree",
          owner: user?.seeker?.id,
        },
      });
    }
  };
  const socialCreateSubmit = (values) => {
    console.log("inafika", values);

    function parseUsername(url) {
      let output = url;
      let matches;
      console.log(url);

      // Parse username
      matches = url.match(
        /(?:https?:\/\/)?(?:www.)?(?:twitter|medium|facebook|vimeo|instagram|github|tiktok|linkedin)(?:.com\/)?([@a-zA-Z0-9-_]+)/im,
      );
      console.log("matches, ", matches);

      // Set output
      output = matches.length ? matches[1] : output;

      return output;
    }

    for (let k = 0; k < values.Social.length; k++) {
      let e = values.Social[k];
      e.username = parseUsername(e.link);
      e.link = e?.network?.value || e?.network;
      e.network = e?.network?.value?.split(".")[1];

      console.log("all the social values", e);
      createSocial({
        variables: {
          ...e,
          owner: user?.id,
        },
      });
    }
  };

  const experienceCreateSubmit = (values) => {
    for (let j = 0; j < values?.Experience.length; j++) {
      const val = values?.Experience[j];
      console.log("all the seeker values", val);
      createWork({ variables: { ...val, owner: user?.seeker?.id } });
    }
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
      useFieldArray: false,
      mutation: seekerCreateSubmit,
      blankValues: {
        title: "",
        location: "",
        gender: "",
        status: "",
        industries: null,
        nationality: null,
        description: "",
        idNumber: 0,
        dateOfBirth: new Date(),
      },
      schema: Yup.object().shape({
        title: schema.requiredString,
        location: schema.requiredString,
        gender: schema.requiredString,
        status: schema.requiredString,
        industries: schema.select,
        nationality: schema.select,
        description: schema.requiredString,
        idNumber: schema.id_number,
        dateOfBirth: schema.date_of_birth,
      }),
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
      useFieldArray: true,
      blankValues: {
        institution: "",
        fieldOfStudy: "",
        level: "",
        schoolStart: "",
        schoolEnd: "",
        gpa: "",
        degree: "Bachelor's Degree",
      },
      schema: Yup.object().shape({
        institution: schema.select,
        fieldOfStudy: schema.select,
        level: schema.requiredString,
        schoolStart: schema.date,
        schoolEnd: schema.date,
        gpa: schema.select,
      }),
      headerField: "institution",
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
          component: (name = "fieldOfStudy") => (
            <CoursesSearch label="Field Of Study" name={name} />
          ),
        },
        {
          name: "level",
          description: "Selet EducationL Level",
          control: "mui-radio",
          options: educationLevel,
        },
        {
          control: "select",
          label: "GPA",
          name: "gpa",
          hideButton: () => {},
          style: { margin: 0 },
          options: GPA,
          description: "Choose your GPA",
          defaultValue: { value: "", label: "Select Grade" },
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
      blankValues: {
        skills: [],
      },
      schema: Yup.object({
        skills: Yup.array()
          .of(schema.select)
          .min(1, "Must have at least one entry"),
      }),
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
      useFieldArray: true,
      blankValues: {
        company: "",
        website: "",
        position: "",
        workStart: "",
        workEnd: "",
        achievements: "",
        descriptionPlaintext: "",
      },
      schema: Yup.object().shape({
        company: schema.requiredString,
        website: schema.website,
        position: schema.requiredString,
        workStart: schema.date,
        workEnd: schema.date,
        achievements: schema.requiredString,
        descriptionPlaintext: schema.requiredString,
      }),
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
    {
      label: "Social",
      description: "Social",
      mutation: socialCreateSubmit,
      useFieldArray: true,
      blankValues: {
        network: "",
        link: null,
      },
      schema: Yup.object().shape({
        network: schema.mixedSelect,
        link: schema.website,
      }),
      headerField: "network",
      fields: [
        {
          control: "select",
          label: "Network",
          name: "network",
          hideButton: () => {},
          style: { margin: 0 },
          options: socials,
          description: "Choose Network",
          defaultValue: { value: "", label: "Select Network" },
        },
        {
          name: "link",
          description: "Your Social Media link",
          placeholder: "https://www.linkedin.com/in/john-doe-123/",
          control: "input",
          type: "text",
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
