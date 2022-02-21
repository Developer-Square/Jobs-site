import React from "react";
import ProfileStepper from "./ProfileStepper";
import { useHistory } from "react-router-dom";
import { normalizeErrors, IsNotEmpty, showNotification } from "helpers";
import UserContext from "contexts/user/user.provider";
import { maybe } from "misc";
import { TypedEmployerProfileMutation } from "containers/Authentication/mutations";
import ConstantsContext from "contexts/constants/constants.provider";

const EmployerStepper = () => {
  const initValues = {};
  const history = useHistory();
  const [initialValues, setInitialValues] = React.useState(initValues);
  const { setRefetchUser, user, getUser } = React.useContext(UserContext);
  const { industries } = React.useContext(ConstantsContext);
  const [showButton, setShowButton] = React.useState(true);

  const handleButton = (data) => {
    if (data === "focus") {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };

  const employerSteps = [
    {
      label: "Account Settings",
      description: `Help Us understand more about your Company.`,
      fields: [
        {
          type: "file",
          name: "avatar",
          version: "stepper",
          multiple: false,
          description: "Upload Company Picture",
          control: "file",
        },
        {
          control: "input",
          type: "text",
          description: "Company Name",
          name: "company",
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
            employerProfileCreate(
              values,
              employerCreate,
              setErrors,
            );
          }
        }
        return (
          // <FurtherInformation
          //   schoolOptions={schoolOptions}
          //   industries={industries}
          //   courses={courseOptions}
          //   loading={loading}
          //   onEmployerProfileSubmit={
          //     onEmployerProfileSubmit
          //   }
          //   initialValues={schoolInterestsInitialValues}
          //   alert={alert}
          // />

          <ProfileStepper
            onProfileInitialSubmit={onEmployerProfileSubmit}
            onProfileSubmit={onEmployerProfileSubmit}
            isEdit={user?.isEmployer && user?.employer}
            setRefetchUser={setRefetchUser}
            steps={employerSteps}
            initialValaues={initialValues}
            schemaValidation={null}
          />
        );
      }}
    </TypedEmployerProfileMutation>
  );
};

export default EmployerStepper;
