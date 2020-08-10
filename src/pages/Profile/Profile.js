import React, { useContext, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CardWrapper, FormWrapper } from "./Profile.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import moment from "moment";

function Profile() {
  const {
    authState: { profile },
  } = useContext(AuthContext);

  const [initialValues, setInitialValues] = useState({});
  const [initialProfileValues, setInitialProfileValues] = useState({});
  const [initialOrganizationValues, setInitialOrganizationValues] = useState(
    {}
  );

  useEffect(() => {
    if (localStorage.getItem("thedb_auth_profile") !== null) {
      setInitialValues({
        email: localStorage.getItem("thedb_auth_profile") ? profile.email : "",
        first_name: localStorage.getItem("thedb_auth_profile")
          ? profile.first_name
          : "",
        last_name: localStorage.getItem("thedb_auth_profile")
          ? profile.last_name
          : "",
        salary: "",
        description: "",
        experience: [],
        qualifications: [],
      });
      setInitialProfileValues({
        title: "",
        huduma_number: "",
        image: null,
        date_of_birth: new Date(),
        about: "",
        location: "",
        gender: "",
        status: "",
        user: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
      });
      setInitialOrganizationValues({
        name: "",
        description: "",
        website: "https://",
        country: "",
        location: "",
        address: "",
        logo: null,
        user: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    console.log("val8es fdsf ", values);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .post(`${BASE_URL}/accounts/profile/`, values, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
        // successBanner();
      })
      .catch((err) => {
        setSubmitting(false);
        console.log("error", err);

        setErrors(err.response.data);
      });
  };
  const onOrgSubmit = async (values, { setErrors, setSubmitting }) => {
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
      logo: logo[0].path,
      user: profile.id,
    };
    console.log("body values ", typeof body.logo, body.logo);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .post(`${BASE_URL}/organization/`, body, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
        // successBanner();
      })
      .catch((err) => {
        setSubmitting(false);
        console.log("error", err.response.data);
        setErrors(err.response.data);
      });
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
      image: image[0].path,
      date_of_birth: moment(date_of_birth).format("YYYY-MM-DD"),
      about: about,
      location: location,
      gender: gender,
      status: status,
      user: profile.id,
    };
    console.log("val8es fdsf ", body);
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .post(`${BASE_URL}/individual/`, body, tokenConfig())
      .then((res) => {
        setSubmitting(false);
        console.log("res", res.data);
        // successBanner();
      })
      .catch((err) => {
        setSubmitting(false);
        console.log("error", err.response.data);

        setErrors(err.response.data);
      });
  };
  return (
    <CardWrapper>
      <h4>Profile</h4>
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
                  <Button
                    type="submit"
                    size="small"
                    title={formik.isSubmitting ? "Creating Profile... " : "Add"}
                    style={{ fontSize: 15, color: "#fff" }}
                    disabled={!formik.isValid}
                  />
                </Form>
              );
            }}
          </Formik>
        )}
      </FormWrapper>
    </CardWrapper>
  );
}
export default Profile;
