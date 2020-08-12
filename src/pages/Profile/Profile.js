import React, { useContext, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { CardWrapper, FormWrapper } from "./Profile.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig, addObjectToLocalStorageObject } from "helpers";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import LogoImage from "image/thedb.png";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import Loader from "components/Loader/Loader";
import Error500 from "components/Error/Error500";
import {} from "helpers";

function Profile() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const [initialValues] = useState({
    email: localStorage.getItem("thedb_auth_profile") ? profile.email : "",
    first_name: localStorage.getItem("thedb_auth_profile")
      ? profile.full_name.split(" ")[0]
      : "",
    last_name: localStorage.getItem("thedb_auth_profile")
      ? profile.full_name.split(" ")[1]
      : "",
    full_name: localStorage.getItem("thedb_auth_profile")
      ? profile.full_name
      : "",
    salary: "",
    description: "",
    experience: [],
    qualifications: [],
  });
  const [initialProfileValues] = useState({
    title: "",
    huduma_number: "",
    image: LogoImage,
    date_of_birth: new Date(),
    about: "",
    location: "",
    gender: "",
    status: "",
    user: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
  });
  const [initialOrganizationValues] = useState({
    name: "",
    description: "",
    website: "https://",
    country: "",
    location: "",
    address: "",
    logo: LogoImage,
    user: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
  });

  const genderOptions = [
    { value: "", key: "Select Gender" },
    { value: "male", key: "Male" },
    { value: "female", key: "Female" },
  ];
  const statusOptions = [
    { value: "", key: "Select Options" },
    { value: "Open", key: "Open for offers" },
    { value: "Busy", key: "Busy" },
    { value: "Looking", key: "Actively looking" },
  ];

  const emailNotLongEnough = "email must be at least 3 characters";
  const emailRequired = "Please enter an email address";
  const invalidEmail = "email must be a valid email";

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string()
      .min(3, emailNotLongEnough)
      .max(100)
      .email(invalidEmail)
      .required(emailRequired),
  });
  const profileValidationSchema = Yup.object({
    title: Yup.string().required("Required"),
    // user: Yup.number().required("Required"),
    status: Yup.string().required("Required"),
    about: Yup.string().required("Required"),
    // image: Yup.mixed().required("Required"),
    huduma_number: Yup.string().required("Required"),
    date_of_birth: Yup.date()
      .test("Date of Birth", "Should be greather than 18", function (value) {
        return moment().diff(moment(value), "years") >= 18;
      })
      .required("Required")
      .nullable(),
  });
  const organizationValidationSchema = Yup.object({
    name: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    logo: Yup.mixed().required("Required"),
    website: Yup.string().url("Please enter a valid URL, http:// or https://", {
      allowLocal: true,
    }),
  });
  const handleModal = (text, subtext) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => EmailVerificationModal(text, subtext),
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  const onSubmit = (values, { setErrors, setSubmitting }) => {
    const {
      email,
      first_name,
      last_name,
      salary,
      description,
      experience,
      qualifications,
    } = values;
    const body = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      full_name: `${first_name}${" "}${last_name}`,
      salary: salary,
      description: description,
      experience: experience,
      qualifications: qualifications,
    };
    setSubmitting(true);
    setLoading(true);
    try {
      axios
        .post(`${BASE_URL}/accounts/profile/`, body, tokenConfig())
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          addObjectToLocalStorageObject("thedb_auth_profile", res.data);
          handleModal("Profile Edited Successfully", "");
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status > 199 && err.response.status < 300) {
            setErrors(err.response.data);
          } else {
            setError(err);
          }
          console.log(err.response.status);
          setSubmitting(false);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
    }
  };
  const onOrgSubmit = (type, values, { setErrors, setSubmitting }) => {
    const {
      name,
      description,
      logo,
      address,
      country,
      location,
      website,
    } = values;

    const body = {
      name: name,
      description: description,
      website: website,
      country: country,
      location: location,
      address: address,
      logo: logo.preview,
      user: profile.id,
    };
    console.log("body values ", typeof logo.preview, logo.preview);
    setSubmitting(true);
    setLoading(true);
    try {
      axios
        .post(`${BASE_URL}/organization/`, body, tokenConfig())
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal("Profile Created Successfully", "");
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.data) {
            setErrors(err.response.data);
          }
          setSubmitting(false);
          setError(err);
          setLoading(false);
        });
      axios
        .post(`${BASE_URL}/${type}/`, body, tokenConfig())
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal(`${type} Profile Created Successfully`, "");
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status > 199 && err.response.status < 300) {
            setErrors(err.response.data);
          } else {
            setError(err);
          }
          console.log(err.response.status);
          setSubmitting(false);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
    }
  };
  const onAddSubmit = async (values, { setErrors, setSubmitting }) => {
    const {
      title,
      huduma_number,
      image,
      date_of_birth,
      about,
      location,
      gender,
      status,
    } = values;
    const body = {
      title: title,
      huduma_number: huduma_number,
      image: image.preview,
      date_of_birth: moment(date_of_birth).format("YYYY-MM-DD"),
      about: about,
      location: location,
      gender: gender,
      status: status,
      user: profile.id,
    };
    console.log("val8es fdsf ", body);
    setSubmitting(true);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      axios
        .post(`${BASE_URL}/individual/`, body, tokenConfig())
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal("Profile Updated Successfully", "");
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status > 199 && err.response.status < 300) {
            setErrors(err.response.data);
          } else {
            setError(err);
          }
          console.log(err.response.status);
          setSubmitting(false);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
    }
  };
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <CardWrapper>
      <h4>Profile</h4>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <FormWrapper>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      type="text"
                      label="First Name"
                      name="first_name"
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label="Last Name"
                      name="last_name"
                    />
                    <FormikControl
                      control="input"
                      type="email"
                      label="Email"
                      name="email"
                      onClick={() => handleModal("", "Sorry, cant edit email")}
                      disabled={true}
                      readonly
                    />
                    <Button
                      type="submit"
                      size="small"
                      title={formik.isSubmitting ? "Changing... " : "Change"}
                      style={{ fontSize: 15, color: "#fff" }}
                      disabled={!formik.isValid}
                    />
                  </Form>
                );
              }}
            </Formik>
          </FormWrapper>
          <h4>Additional Details</h4>
          <FormWrapper>
            {profile.is_individual ? (
              <Formik
                initialValues={initialProfileValues}
                validationSchema={profileValidationSchema}
                onSubmit={onAddSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Title"
                        name="title"
                      />

                      <FormikControl
                        control="input"
                        type="text"
                        label="Huduma Number"
                        name="huduma_number"
                      />
                      <FormikControl
                        control="date"
                        label="Birth Date"
                        name="date_of_birth"
                      />
                      <FormikControl
                        control="select"
                        label="Gender"
                        name="gender"
                        options={genderOptions}
                      />
                      <FormikControl
                        control="select"
                        label="Status"
                        name="status"
                        options={statusOptions}
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Current Residence"
                        name="location"
                      />
                      <FormikControl
                        control="textarea"
                        label="Additional Info"
                        name="about"
                      />
                      <FormikControl
                        control="input"
                        type="file"
                        setFieldValue={formik.setFieldValue}
                        value={formik.values.image}
                        label="Profile Image"
                        name="image"
                      />
                      <Button
                        type="submit"
                        size="small"
                        title={formik.isSubmitting ? "Adding... " : "Add"}
                        style={{ fontSize: 15, color: "#fff" }}
                        disabled={!formik.isValid}
                      />
                    </Form>
                  );
                }}
              </Formik>
            ) : (
              <Formik
                initialValues={initialOrganizationValues}
                validationSchema={organizationValidationSchema}
                onSubmit={onOrgSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Organization Name"
                        name="name"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Website Domain"
                        name="website"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Country"
                        name="country"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Current Office Location"
                        name="location"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Company Address"
                        name="address"
                      />
                      <FormikControl
                        control="textarea"
                        label="About Company Info"
                        name="description"
                      />
                      <FormikControl
                        control="input"
                        type="file"
                        setFieldValue={formik.setFieldValue}
                        value={formik.values.logo}
                        label="Company Logo"
                        name="logo"
                      />
                      {/* <Field type="file" name="logo" id="logo" value={null} /> */}
                      <Button
                        type="submit"
                        size="small"
                        title={
                          formik.isSubmitting ? "Creating Profile... " : "Add"
                        }
                        style={{ fontSize: 15, color: "#fff" }}
                        disabled={!formik.isValid}
                      />
                    </Form>
                  );
                }}
              </Formik>
            )}
          </FormWrapper>
        </>
      )}
    </CardWrapper>
  );
}
export default Profile;
