import * as Yup from "yup";
import * as msg from "./common";

const email = Yup.string()
  .min(3, msg.emailNotLongEnough)
  .max(100)
  .email(msg.invalidEmail)
  .required(msg.emailRequired);
const username = Yup.string()
  .min(3, msg.nameNotLongEnough)
  .max(100)
  .required(msg.fieldRequired);

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

const fullname = Yup.string()
  .min(5, msg.fullNameNotLongEnough)
  .max(100)
  .required(msg.fieldRequired);

const phonenumber = Yup.string()
  .min(15, msg.phoneNumberNotLongEnough)
  .max(16)
  .required(msg.fieldRequired);

export const registerSchema = Yup.object().shape({
  email: email,
  username: username,
  password1: password,
  password2: passwordConfirm("password1"),
});

export const signUpSchema = Yup.object().shape({
  fullname: fullname,
  // phonenumber: phonenumber,
  password: password
})

export const loginSchema = Yup.object().shape({
  email: email,
  password: password,
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
