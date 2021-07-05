import React from "react";
import { useAlert } from "react-alert";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import { maybe } from "core/utils";
import { TypedSeekerProfileMutation } from "./mutations";
import Button from "components/Button/Button";
import { normalizeErrors } from "helpers";
import { seekerProfileSchema } from "./validation.schema";
import { useQuery } from "react-apollo";
import { GET_INDUSTRIES } from "common/queries";
import Loader from "components/Loader/Loader";
import { AuthContext } from "contexts/auth/auth.context";
import UserContext from "contexts/user/user.provider";

const SeekerProfile = () => {
  const alert = useAlert();
  const { user } = React.useContext(UserContext);
  const {
    authState: { profile },
  } = React.useContext(AuthContext);
  const [industries, setIndustries] = React.useState([]);
  const [initialValues, setInitialValues] = React.useState();
  const { data, loading } = useQuery(GET_INDUSTRIES);
  console.log(user);
  React.useEffect(() => {
    if (user?.seeker) {
      setInitialValues(user.seeker);
    } else {
      setInitialValues({
        title: "",
        idNumber: "",
        // dateOfBirth: new Date(2003, 1, 1),
        description: "",
        location: "",
        gender: { value: "", label: "Select Gender" },
        mobile: "",
        status: { value: "", label: "Select Options" },
        industries: [],
        user: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ];
  const statusOptions = [
    { value: "OPEN", label: "Open to offers" },
    { value: "BUSY", label: "Busy" },
    { value: "LOOKING", label: "Actively looking" },
  ];

  const showNotification = (data, errors, alert) => {
    console.log(errors);
    if (errors) {
      console.log("Server Error kwa login", errors[0].message);
      return errors[0].message;
    }

    const successful = maybe(() => data.seekerCreate.success);

    if (successful) {
      alert.show(
        {
          title: "Profile Created",
        },
        { type: "success", timeout: 5000 },
      );
    } else {
      const err = maybe(() => data.seekerCreate.errors, []);

      if (err) {
        const nonFieldErr = normalizeErrors(
          maybe(() => data.seekerCreate.errors, []),
        );
        alert.show(
          {
            title: nonFieldErr?.nonFieldErrors,
          },
          { type: "error", timeout: 5000 },
        );
      }
    }
  };
  if (data && industries.length === 0) {
    const cleanedData = data.allIndustries.reduce((arr, b) => {
      arr.push({
        value: b.id,
        label: b.name,
      });
      return arr;
    }, []);
    setIndustries(cleanedData);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <TypedSeekerProfileMutation
      onCompleted={(data, errors) => showNotification(data, errors, alert)}
    >
      {(seekerCreate, { loading }) => {
        function onSubmit(values, { setErrors, setSubmitting }) {
          console.log(values);
          const gender = values.gender.value;
          const status = values.status.value;
          const industries = values.industries.reduce((arr, b) => {
            arr.push(b.value);
            return arr;
          }, []);
          seekerCreate({
            variables: {
              ...values,
              gender: gender,
              status: status,
              industries: industries,
            },
          }).then(({ data }) => {
            console.log(data);
            if (data) {
              if (data.seekerCreate) {
                if (!data.seekerCreate.success) {
                  setErrors(
                    normalizeErrors(maybe(() => data.seekerCreate.errors, [])),
                  );
                }
              }
            }
          });
        }

        return (
          <Formik
            initialValues={initialValues}
            validationSchema={seekerProfileSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              console.log(formik.values);
              return (
                <Form>
                  <div className="dashboard-list-box margin-top-30">
                    <h4>Profile Details</h4>
                    <div className="dashboard-list-box-content">
                      <div className="submit-page">
                        <div className="form grid grid-cols-2 gap-6">
                          <FormikControl
                            control="input"
                            type="text"
                            label="Title"
                            placeholder="e.g. Student, Eng, Mr etc"
                            name="title"
                          />
                          <FormikControl
                            control="input"
                            type="number"
                            label="ID Number"
                            placeholder="ID Number"
                            name="idNumber"
                          />
                        </div>
                        <div className="form grid grid-cols-2 gap-6">
                          <FormikControl
                            control="select"
                            label="Status"
                            name="status"
                            style={{ margin: 0 }}
                            options={statusOptions}
                            defaultValue={{
                              value: "",
                              label: "Select Options",
                            }}
                          />
                          <FormikControl
                            control="select"
                            label="Gender"
                            name="gender"
                            style={{ margin: 0 }}
                            options={genderOptions}
                            defaultValue={{ value: "", label: "Select Gender" }}
                          />
                        </div>
                        <div className="form">
                          <FormikControl
                            control="phone"
                            type="phone"
                            label="Phone Number"
                            placeholder="e.g. +254 722-123123"
                            name="mobile"
                          />
                        </div>
                        <div className="form">
                          <FormikControl
                            control="input"
                            type="text"
                            label="Current Residence (County, Place)"
                            name="location"
                            placeholder="e.g. Nairobi, Kasarani - Corner"
                          />
                        </div>
                        {/* <div className="form">
                          <FormikControl
                            control="date"
                            label="Birth Date"
                            name="dateOfBirth"
                            maxDate={new Date(2003, 1, 1)}
                          />
                        </div> */}
                        <div className="form" style={{ width: "100%" }}>
                          <FormikControl
                            control="select"
                            label="Interests"
                            name="industries"
                            style={{ margin: 0 }}
                            options={industries}
                            isMulti={true}
                          />
                        </div>
                        <div className="form" style={{ width: "100%" }}>
                          <FormikControl
                            control="textarea"
                            label="Additional Info"
                            name="description"
                            rte={true}
                            fullWidth
                          />
                        </div>
                        <div className="form" style={{ width: "100%" }}>
                          <Button
                            type="submit"
                            disabled={!formik.isValid}
                            fullwidth
                            loading={loading}
                            title={loading ? "Saving... " : "Save"}
                            className="button margin-top-15"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        );
      }}
    </TypedSeekerProfileMutation>
  );
};

export default SeekerProfile;
