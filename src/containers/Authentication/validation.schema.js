import * as Yup from "yup";
import * as msg from "./common";
import { requiredIndustries, select } from "common/yupFieldValidation";

const password = Yup.string()
  .min(8, msg.passwordNotLongEnough)
  .matches(/^.*[a-zA-Z].*$/, msg.mustContainLetter)
  .matches(/^.*\d.*$/, msg.mustContainNumber)
  .max(100)
  .required(msg.fieldRequired);
const passwordConfirm = (pass) => {
  return Yup.string()
    .oneOf([Yup.ref(pass), null], msg.passwordDoNotMatch)
    .required(msg.fieldRequired);
};
const weakPassword = Yup.string().min(1, msg.passwordNotLongEnough);

const email = Yup.string()
  .min(3, msg.emailNotLongEnough)
  .max(100)
  .email(msg.invalidEmail)
  .required(msg.fieldRequired);

const fullname = Yup.string()
  .min(5, msg.fullNameNotLongEnough)
  .max(100)
  .required(msg.fieldRequired);

const OTP = Yup.string()
  .min(6, msg.OTPCodeExactLength)
  .max(6, msg.OTPCodeExactLength)
  .required(msg.fieldRequired);

const phonenumber = Yup.string()
  .min(12, msg.phoneNumberNotLongEnough)
  .required(msg.fieldRequired);

const industries = Yup.array().test({
  message: msg.fieldRequired,
  test: (arr) => arr.length > 0,
});

const companyName = Yup.string().required(msg.fieldRequired);
const location = Yup.string().required(msg.fieldRequired);
const terms = Yup.boolean().oneOf([true], "Must accept terms and conditions");

export const phoneNumberSchema = Yup.object().shape({
  phone: phonenumber,
});

export const signUpSchema = Yup.object().shape({
  email: email,
  fullName: fullname,
  phone: phonenumber,
  password1: password,
  password2: passwordConfirm("password1"),
  terms: terms,
});

export const OTPVerficationSchema = Yup.object().shape({
  otpcode: OTP,
});

export const furtherInformationSchema = Yup.object().shape({
  industries: requiredIndustries,
  school: select,
  course: select,
});

export const bioSchema = Yup.object().shape({
  company: companyName,
  location: location,
  industries: industries,
});

export const loginSchema = Yup.object().shape({
  email: email,
  password: weakPassword,
});
export const passwordResetEmailSchema = Yup.object().shape({
  email: email,
});
export const emailActivationSchema = Yup.object().shape({
  email: email,
});

export const passwordResetSchema = Yup.object({
  newPassword1: password,
  newPassword2: passwordConfirm("newPassword1"),
});
export const passwordChangeSchema = Yup.object({
  oldPassword: password,
  newPassword1: password,
  newPassword2: passwordConfirm("newPassword1"),
});
