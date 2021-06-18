/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState, useEffect, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { CardWrapper, FormWrapper } from "./Profile.style";
import FormikControl from "containers/FormikContainer/FormikControl";
import { useStickyDispatch } from "contexts/app/app.provider";
import { useAppState } from "contexts/app/app.provider";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import {
  formTokenConfig,
  tokenConfig,
  addObjectToLocalStorageObject,
} from "helpers";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import LogoImage from "image/thedb.png";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import Loader from "components/Loader/Loader";
import Error500 from "components/Error/Error500";
import ProfileView from "./ProfileView";
import { Br } from "styles/pages.style";

function Profile() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [initialValues, setInitialValues] = useState();
  const [initialProfileValues, setInitialProfileValues] = useState();
  const [initialOrganizationValues, setInitialOrganizationValues] = useState();
  const [editting, setEditting] = useState(false);
  const useDispatch = useStickyDispatch();
  const setView = useCallback(
    () => useDispatch({ type: "VIEW" }),
    [useDispatch]
  );
  const setEdit = useCallback(
    () => useDispatch({ type: "EDIT" }),
    [useDispatch]
  );
  const currentForm = useAppState("currentForm");
  const isEdit = currentForm === "edit";
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setView();
    setTimeout(() => {
      if (
        JSON.parse(localStorage.getItem("thedb_auth_profile"))["is_individual"]
      ) {
        try {
          axios
            .get(`${BASE_URL}/individual/`, tokenConfig())
            .then((res) => {
              console.log("res", res.data);
              const individual = res.data.results.filter(
                (filteredIndividual) => filteredIndividual.user === profile.id
              );
              if (individual.length > 0) {
                addObjectToLocalStorageObject(
                  "thedb_individual_profile",
                  individual[0]
                );
                setEditting(true);
              } else {
                setEdit();
              }
              setLoading(false);
            })
            .catch((err) => {
              setError(err);
              console.log("frererefrr", err);
            });
        } catch (error) {
          setError(error);
        }
      } else {
        try {
          axios
            .get(`${BASE_URL}/organization/`, tokenConfig())
            .then((res) => {
              console.log("res", res.data);
              const organization = res.data.results.filter(
                (filteredCompany) => filteredCompany.user === profile.id
              );
              if (organization.length > 0) {
                addObjectToLocalStorageObject(
                  "thedb_org_profile",
                  organization[0]
                );
                setEditting(true);
              } else {
                setEdit();
              }
              setLoading(false);
            })
            .catch((err) => {
              setError(err);
            });
        } catch (error) {
          setError(error);
        }
      }
      setInitialValues({
        email: localStorage.getItem("thedb_auth_profile") ? profile.email : "",
        first_name: localStorage.getItem("thedb_auth_profile")
          ? profile.first_name
          : "",
        last_name: localStorage.getItem("thedb_auth_profile")
          ? profile.last_name
          : "",
        full_name: localStorage.getItem("thedb_auth_profile")
          ? profile.full_name
          : "",
        salary: "",
        description: "",
        experience: [],
        qualifications: [],
      });
      if (localStorage.getItem("thedb_individual_profile")) {
        setInitialProfileValues(
          JSON.parse(localStorage.getItem("thedb_individual_profile"))
        );
        console.log(
          "individual initial values",
          JSON.parse(localStorage.getItem("thedb_individual_profile"))
        );
      } else {
        setInitialProfileValues({
          title: "",
          id_number: "",
          image: LogoImage,
          date_of_birth: new Date(1999, 1, 1),
          about: "",
          location: "",
          gender: "",
          mobile: "",
          status: "",
          facebook: "",
          twitter: "",
          instagram: "",
          user: localStorage.getItem("thedb_auth_profile") ? profile.id : "",
        });
      }
      if (localStorage.getItem("thedb_org_profile")) {
        setInitialOrganizationValues(
          JSON.parse(localStorage.getItem("thedb_org_profile"))
        );
      } else {
        setInitialOrganizationValues({
          name: "",
          description: "",
          website: "https://",
          country: "",
          location: "",
          address: "",
          mobile: "",
          logo: "LogoImage",
          user: profile.id,
        });
      }
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const genderOptions = [
    { value: "", key: "Select Gender" },
    { value: "male", key: "Male" },
    { value: "female", key: "Female" },
  ];
  const statusOptions = [
    { value: "", key: "Select Options" },
    { value: "Open", key: "Open to offers" },
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
    status: Yup.string().required("Required"),
    about: Yup.string().required("Required"),
    // image: Yup.mixed().required("Required"),
    id_number: Yup.number()
      .max(2147483647, "Id Number too long")
      .min(10101010, "Id Number is invalid")
      .required("Required"),
    mobile: Yup.string()
      .max(15, "Phone Number too long")
      .min(12, "Phone Number is invalid")
      .required("Phone Number is Required"),
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
    mobile: Yup.string()
      .max(15, "Phone Number too long")
      .min(12, "Phone Number is invalid")
      .required("Phone Number is Required"),
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
          handleModal("Profile Edited Successfully ✔", "");
          setLoading(false);
        })
        .catch((err) => {
          if (err.response) {
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
  const onOrgSubmit = (values, { setErrors, setSubmitting }) => {
    const {
      name,
      description,
      logo,
      address,
      mobile,
      country,
      location,
      website,
    } = values;
    let formData = new FormData();
    console.log("type of image", typeof logo);
    if (typeof logo !== "string" || typeof logo !== undefined) {
      formData.append("logo", logo[0]);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("country", country);
    formData.append("location", location);
    formData.append("address", address);
    formData.append("mobile", mobile.replace(/[*?^${}()]|[-]|[ ]/g, ""));
    formData.append("user", profile.id);
    console.log("body values ", formData, values);
    setSubmitting(true);
    setLoading(true);
    try {
      axios
        .post(`${BASE_URL}/organization/`, formData, formTokenConfig())
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal("Profile Created Successfully ✔", "");
          addObjectToLocalStorageObject("thedb_org_profile", res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("res errors", err.response.data);
          if (err.response) {
            if (err.response.data.user) {
              if (err.response.data.user[0] === "This field must be unique.") {
                handleModal(
                  "You Already registered a company under your account",
                  `(Only one organization can be registered under an account)`
                );
              } else {
                setErrors(err.response.data);
              }
            }
            setErrors(err.response.data);
          } else {
            setError(err);
          }
          console.log(err.response.data);
          setSubmitting(false);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
    }
  };
  const onOrgChangeSubmit = (values, { setErrors, setSubmitting }) => {
    const {
      name,
      description,
      logo,
      mobile,
      address,
      country,
      location,
      website,
      facebook,
      twitter,
      instagram,
    } = values;
    let formData = new FormData();
    console.log("type of image", typeof logo);
    if (typeof logo !== "string" || typeof logo !== undefined) {
      formData.append("logo", logo[0]);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("country", country);
    formData.append("location", location);
    formData.append("address", address);
    formData.append("mobile", mobile.replace(/[*?^${}()]|[-]|[ ]/g, ""));
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);
    formData.append("user", profile.id);
    console.log("body values ", ...formData, logo);
    setSubmitting(true);
    setLoading(true);
    try {
      axios
        .put(
          `${BASE_URL}/organization/${
            JSON.parse(localStorage.getItem("thedb_org_profile"))["id"]
          }/`,
          formData,
          formTokenConfig()
        )
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal("Profile Created Successfully ✔", "");
          addObjectToLocalStorageObject("thedb_org_profile", res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("res errors", err.response.data);
          if (err.response) {
            if (err.response.data.user) {
              if (err.response.data.user[0] === "This field must be unique.") {
                handleModal(
                  "You Already registered a company under your account",
                  `(Only one organization can be registered under an account)`
                );
              } else {
                setErrors(err.response.data);
              }
            }
            setErrors(err.response.data);
          } else {
            setError(err);
          }
          console.log(err.response.data);
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
      id_number,
      image,
      date_of_birth,
      about,
      location,
      gender,
      mobile,
      status,
      facebook,
      twitter,
      instagram,
    } = values;
    let formData = new FormData();
    if (typeof image !== "string") {
      formData.append("image", image[0]);
    }
    formData.append("user", profile.id);
    formData.append("title", title);
    formData.append("id_number", id_number);
    formData.append(
      "date_of_birth",
      moment(date_of_birth).format("YYYY-MM-DD")
    );
    formData.append("about", about);
    formData.append("location", location);
    formData.append("gender", gender);
    formData.append("mobile", mobile.replace(/[*?^${}()]|[-]|[ ]/g, ""));
    formData.append("status", status);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);
    console.log("val8es fdsf ", ...formData, image);
    setSubmitting(true);
    try {
      axios
        .post(`${BASE_URL}/individual/`, formData, formTokenConfig())
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal("Profile Updated Successfully ✔", "");
          addObjectToLocalStorageObject("thedb_individual_profile", res.data);
        })
        .catch((err) => {
          if (err.response) {
            setErrors(err.response.data);
            console.log("errors za data");
          } else {
            setError(err);
            console.log("errors general");
          }
          console.log(err.response.data);
          setSubmitting(false);
        });
    } catch (error) {
      setError(error);
    }
  };
  const onChangeSubmit = async (values, { setErrors, setSubmitting }) => {
    const {
      title,
      id_number,
      image,
      date_of_birth,
      about,
      location,
      gender,
      mobile,
      status,
      facebook,
      twitter,
      instagram,
    } = values;

    let formData = new FormData();
    console.log("type of image", typeof image);
    if (typeof image !== "string") {
      formData.append("image", image[0]);
    }
    formData.append("user", profile.id);
    formData.append("title", title);
    formData.append("id_number", id_number);
    formData.append(
      "date_of_birth",
      moment(date_of_birth).format("YYYY-MM-DD")
    );
    formData.append("about", about);
    formData.append("location", location);
    formData.append("gender", gender);
    formData.append("status", status);
    formData.append("mobile", mobile.replace(/[*?^${}()]|[-]|[ ]/g, ""));
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);
    console.log("val8es fdsf ", ...formData, image);
    setSubmitting(true);
    try {
      axios
        .put(
          `${BASE_URL}/individual/${
            JSON.parse(localStorage.getItem("thedb_individual_profile"))["id"]
          }/`,
          formData,
          formTokenConfig()
        )
        .then((res) => {
          setSubmitting(false);
          console.log("res", res.data);
          handleModal("Profile Updated Successfully ✔", "");
          addObjectToLocalStorageObject("thedb_individual_profile", res.data);
        })
        .catch((err) => {
          if (err.response) {
            setErrors(err.response.data);
            console.log("errors za data");
          } else {
            setError(err);
            console.log("errors general");
          }
          console.log(err.response.data);
          setSubmitting(false);
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
      <h4>
        Profile{" "}
        <Button
          onClick={isEdit ? setView : setEdit}
          size="small"
          title={isEdit ? `View Profile` : `Edit Profile`}
          style={{
            fontSize: 15,
            color: "#21277f",
            backgroundColor: "#e6c018",
            float: "right",
          }}
        />
      </h4>
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentForm === "edit" && (
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
                          onClick={
                            profile.is_verified
                              ? () =>
                                  handleModal(
                                    "Oops!",
                                    "Sorry, cant edit email after verification"
                                  )
                              : null
                          }
                          readOnly={profile.is_verified ? true : false}
                        />
                        <Br />
                        <Button
                          type="submit"
                          size="small"
                          title={
                            formik.isSubmitting ? "Changing... " : "Change"
                          }
                          style={{ fontSize: 15, color: "#fff" }}
                          disabled={!formik.isValid}
                        />
                      </Form>
                    );
                  }}
                </Formik>
              </FormWrapper>
              <h4>Additional Details</h4>
              {profile.is_individual ? (
                <FormWrapper>
                  <Formik
                    initialValues={initialProfileValues}
                    validationSchema={profileValidationSchema}
                    onSubmit={editting ? onChangeSubmit : onAddSubmit}
                  >
                    {(formik) => {
                      return (
                        <Form>
                          <FormikControl
                            control="input"
                            type="text"
                            label="Title"
                            placeholder="e.g. Student, Eng, Mr etc"
                            name="title"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="ID Number"
                            name="id_number"
                          />
                          <FormikControl
                            control="input"
                            type="phone"
                            label="Phone Number"
                            placeholder="e.g. +254 722-123123"
                            name="mobile"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Facebook Username"
                            placeholder="e.g. first_last"
                            name="facebook"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Twitter Handle"
                            placeholder="e.g. yourhandle"
                            name="twitter"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Instagram Handle"
                            placeholder="e.g. yourhandle"
                            name="instagram"
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
                            label="Current Residence (County, Place)"
                            name="location"
                            placeholder="e.g. Nairobi, Kasarani - Corner"
                          />
                          <FormikControl
                            control="textarea"
                            label="Additional Info"
                            name="about"
                            rte={true}
                          />
                          <FormikControl
                            control="input"
                            type="file"
                            setFieldValue={formik.setFieldValue}
                            // value={formik.values.image}
                            placeholder="Tell us more about yourself, include your skills too"
                            label="Profile Image"
                            name="image"
                          />
                          {/* <Field type="file" name="image" id="image" value={null} /> */}
                          <Button
                            type="submit"
                            size="small"
                            title={formik.isSubmitting ? "Adding... " : "Done"}
                            style={{ fontSize: 15, color: "#fff" }}
                            disabled={!formik.isValid}
                          />
                        </Form>
                      );
                    }}
                  </Formik>
                </FormWrapper>
              ) : (
                <FormWrapper>
                  <Formik
                    initialValues={initialOrganizationValues}
                    validationSchema={organizationValidationSchema}
                    onSubmit={editting ? onOrgChangeSubmit : onOrgSubmit}
                  >
                    {(formik) => {
                      return (
                        <Form>
                          <FormikControl
                            control="input"
                            type="text"
                            label="Organization Name"
                            placeholder="e.g. Safaricom PLC"
                            name="name"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Website Domain (Optional)"
                            placeholder="e.g. Safaricom PLC"
                            name="website"
                          />
                          <FormikControl
                            control="input"
                            type="phone"
                            label="Contact Person Mobile"
                            name="mobile"
                            placeholder="e.g. +254 722-123123"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Facebook Username"
                            placeholder="e.g. first_last"
                            name="facebook"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Twitter Handle"
                            placeholder="e.g. yourhandle"
                            name="twitter"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Instagram Handle"
                            placeholder="e.g. yourhandle"
                            name="instagram"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Country"
                            placeholder="e.g. Kenya"
                            name="country"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Current Office Location"
                            placeholder="e.g. Nairobi CBD"
                            name="location"
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Company Address"
                            placeholder="e.g. P.O. Box 12345, 00200"
                            name="address"
                          />
                          <FormikControl
                            control="textarea"
                            label="About Company"
                            placeholder="Tell us more about your organization... (Company's Industry, No. of Employees, Vision and mission)"
                            name="description"
                            rte={true}
                          />
                          <FormikControl
                            control="input"
                            type="file"
                            setFieldValue={formik.setFieldValue}
                            // value={formik.values.logo}
                            label="Company Logo"
                            name="logo"
                          />
                          {/* <Field type="file" name="logo" id="logo" value={null} /> */}
                          <Button
                            type="submit"
                            size="small"
                            title={
                              formik.isSubmitting
                                ? "Creating Profile... "
                                : "Done"
                            }
                            style={{ fontSize: 15, color: "#fff" }}
                            disabled={!formik.isValid}
                          />
                        </Form>
                      );
                    }}
                  </Formik>
                </FormWrapper>
              )}
            </>
          )}
          {currentForm === "view" && <ProfileView profileID={profile.id} />}
        </>
      )}
    </CardWrapper>
  );
}
export default Profile;
