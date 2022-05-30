import * as Yup from "yup";
import * as msg from "./validationMessages";
import moment from "moment";

export const email = Yup.string()
  .min(3, msg.emailNotLongEnough)
  .max(100)
  .email(msg.invalidEmail)
  .required(msg.emailRequired);
export const emailNotRequired = Yup.string()
  .min(3, msg.emailNotLongEnough)
  .max(100)
  .email(msg.invalidEmail);

export const username = Yup.string()
  .min(3, msg.nameNotLongEnough)
  .max(100)
  .required(msg.fieldRequired);

export const requiredString = Yup.string().required(msg.fieldRequired);
export const requiredObject = Yup.object().shape({});

export const website = Yup.string().url(msg.validURL, { allowLocal: true });

export const date_of_birth = Yup.date()
  .test("Date of Birth", "Should be greather than 18", function (value) {
    return moment().diff(moment(value), "years") >= 18;
  })
  .required("Required")
  .nullable();
export const date = Yup.date().required(msg.fieldRequired).nullable();

export const id_number = Yup.number()
  .max(2147483647, "Id Number too long")
  .min(10101010, "Id Number is invalid")
  .required("Required");

export const number = Yup.number().required(msg.fieldRequired);

export const select = Yup.object({
  value: requiredString,
  label: requiredString || requiredObject,
});
export const mixedSelect = Yup.object({
  value: requiredString,
  label: Yup.mixed(),
});

export const mobile = Yup.string()
  .max(15, "Phone Number too long")
  .min(12, "Phone Number is invalid")
  .required("Phone Number is Required");

export const baseProfileSchema = Yup.object().shape({
  firstName: username,
  lastName: username,
});

export const requiredIndustries = Yup.array().required(
  "select at least one industry",
);
