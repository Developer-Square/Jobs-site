import React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import ProfileStepper from "./ProfileStepper";
import { useHistory } from "react-router-dom";
import { normalizeErrors, IsNotEmpty, showNotification } from "helpers";
import UserContext from "contexts/user/user.provider";
import { maybe } from "misc";
import { TypedEmployerProfileMutation } from "containers/Authentication/mutations";
import ConstantsContext from "contexts/constants/constants.provider";
import {
  EMPLOYER_PROFILE_MUTATION,
  EMPLOYER_PROFILE_COMPLETION,
  AVATAR_UPDATE_MUTATION,
} from "graphql/mutations";
import { handleAvatarUpdate } from "utils";

const EmployerStepper = () => {
  const initValues = {};
  const history = useHistory();
  const alert = useAlert();
  const [initialValues, setInitialValues] = React.useState(initValues);
  const { setRefetchUser, user, getUser, userLoading, userData } =
    React.useContext(UserContext);
  const { industries, workForce } = React.useContext(ConstantsContext);
  const [showButton, setShowButton] = React.useState(true);

  console.log(workForce);

  const handleButton = (data) => {
    if (data === "focus") {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const [updateEmployerProfile] = useMutation(EMPLOYER_PROFILE_COMPLETION, {
    onCompleted: (data) => {
      setRefetchUser((prev) => !prev);
    },
  });
  const [updateAvatar] = useMutation(AVATAR_UPDATE_MUTATION);
  const [
    createEmployer,
    { data: employerData, loading: employerLoading, error: employerError },
  ] = useMutation(EMPLOYER_PROFILE_MUTATION, {
    onCompleted: (data) => {
      // after this I've to send another req
      setRefetchUser((prev) => !prev);
    },
  });
  const employerCreateSubmit = (values) => {
    console.log("inafika", values);
    values.industries = values.industries.map((industry) => industry.value);

    console.log("all the employer values", values);
    if (IsNotEmpty(values.industries)) {
      createEmployer({ variables: { ...values } });
    }
    return { employerData, employerLoading, employerError };
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

  const employerSteps = [
    {
      label: "Account Settings",
      description: `Help Us understand more about your Company.`,
      mutation: employerCreateSubmit,
      fields: [
        {
          type: "file",
          name: "avatar",
          version: "stepper",
          multiple: false,
          description: "Upload Company Picture",
          onChangeCallback: handleAvatarChange,
          control: "file",
        },
        {
          control: "input",
          type: "text",
          description: "Company Name",
          name: "company",
        },
        {
          control: "input",
          type: "number",
          description: "Company Registration No.",
          name: "regNo",
        },
        {
          control: "phone",
          type: "phone",
          description: "Company Phone No.",
          placeholder: "e.g. +254 722-123456",
          name: "phone",
        },
        {
          control: "input",
          type: "text",
          description: "Website URL",
          placeholder: "e.g. https://thedatabase.co.ke",
          name: "website",
        },
        {
          name: "workForce",
          description: "Company's WorkForce",
          control: "mui-radio",
          options: workForce,
        },
        {
          control: "location",
          type: "text",
          description: "Location",
          name: "location",
        },
        {
          control: "select",
          options: industries,
          showButton: showButton,
          hideButton: (data) => handleButton(data),
          description: "Industries",
          name: "industries",
          isMulti: true,
          id: "basic-multi-select",
          classNamePrefix: "select",
        },
        {
          name: "lookingFor",
          description: "Key Traits",
          placeholder: "What you're looking for in an employee",
          control: "textarea",
          rte: false,
        },
        {
          name: "description",
          description: "About the company",
          control: "textarea",
          rte: true,
          fullWidth: true,
        },
      ],
    },
  ];

  React.useEffect(() => {
    setInitialValues(initValues);
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const employerProfileCreate = (values, employerCreate, setErrors) => {
    let country;
    const data = values.location.split(",");

    // Check if the user provided a county as the second arguement.
    if (data[1]) {
      // Perform a slice to get rid of the whitespace infront of the
      // country string.
      country = data[1].slice(1);
    } else {
      country = data[0];
    }

    const industries = values.industries.reduce((arr, b) => {
      arr.push(b.value);
      return arr;
    }, []);

    employerCreate({
      variables: {
        country,
        industries,
        location: values.location,
        name: values.company,
      },
    }).then(({ data }) => {
      if (data) {
        if (data.employerCreate) {
          history.push("/dashboard/billing");
          setRefetchUser();

          if (!data.employerCreate.success) {
            setErrors(
              normalizeErrors(maybe(() => data.employerCreate.errors, [])),
            );
          }
        }
      }
    });
  };

  if (!industries || !workForce || !user) return <div>To Load</div>;

  if (userLoading) return <>Loading...</>;

  return (
    <TypedEmployerProfileMutation
      onCompleted={(data, errors) =>
        showNotification(
          data.employerCreate,
          errors,
          alert,
          "accountErrors",
          "Profile Created",
        )
      }
    >
      {(employerCreate, { loading }) => {
        function onEmployerProfileSubmit(values, { setErrors }) {
          if (IsNotEmpty(values)) {
            employerProfileCreate(values, employerCreate, setErrors);
          }
        }
        return (
          <ProfileStepper
            onProfileInitialSubmit={onEmployerProfileSubmit}
            onProfileSubmit={onEmployerProfileSubmit}
            isEdit={userData?.me?.isEmployer && user?.employer}
            setRefetchUser={setRefetchUser}
            steps={employerSteps}
            initialValaues={initialValues}
            schemaValidation={null}
            sets={userData?.me?.employer?.profileCompletion}
          />
        );
      }}
    </TypedEmployerProfileMutation>
  );
};

export default EmployerStepper;
