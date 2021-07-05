import * as Yup from "yup";
import * as msg from "./common";
import moment from "moment";

export const email = Yup.string()
  .min(3, msg.emailNotLongEnough)
  .max(100)
  .email(msg.invalidEmail)
  .required(msg.emailRequired);

export const username = Yup.string()
  .min(3, msg.nameNotLongEnough)
  .max(100)
  .required(msg.fieldRequired);

export const requiredString = Yup.string().required(msg.fieldRequired);

export const website = Yup.string().url(
  "Please enter a valid URL, http:// or https://",
  { allowLocal: true },
);

export const date_of_birth = Yup.date()
  .test("Date of Birth", "Should be greather than 18", function (value) {
    return moment().diff(moment(value), "years") >= 18;
  })
  .required("Required")
  .nullable();

export const id_number = Yup.number()
  .max(2147483647, "Id Number too long")
  .min(10101010, "Id Number is invalid")
  .required("Required");

export const select = Yup.object({
  value: requiredString,
  label: requiredString,
});

export const mobile = Yup.string()
  .max(15, "Phone Number too long")
  .min(12, "Phone Number is invalid")
  .required("Phone Number is Required");

export const baseProfileSchema = Yup.object().shape({
  firstName: username,
  lastName: username,
});

export const seekerProfileSchema = Yup.object().shape({
  title: requiredString,
  status: select,
  description: requiredString,
  idNumber: id_number,
  // mobile: mobile,
  // dateOfBirth: date_of_birth,
});

export const employerProfileSchema = Yup.object().shape({
  name: requiredString,
  location: requiredString,
  address: requiredString,
  mobile: mobile,
  website: website,
  workForce: requiredString,
  lookingFor: requiredString,
  regNo: requiredString,
});

export const institutionProfileSchema = Yup.object().shape({
  name: requiredString,
  location: requiredString,
  address: requiredString,
  mobile: mobile,
  website: website,
  institutionCount: requiredString,
  regNo: requiredString,
});
