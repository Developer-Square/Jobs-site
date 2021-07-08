import * as Yup from "yup";
import * as schema from "common/yupFieldValidation";

export const baseProfileSchema = Yup.object().shape({
  firstName: schema.username,
  lastName: schema.username,
});

export const seekerProfileSchema = Yup.object().shape({
  title: schema.requiredString,
  status: schema.select,
  description: schema.requiredString,
  idNumber: schema.id_number,
  // mobile: mobile,
  // dateOfBirth: schema.date_of_birth,
});

export const employerProfileSchema = Yup.object().shape({
  name: schema.requiredString,
  location: schema.requiredString,
  description: schema.requiredString,
  // mobile: schema.mobile,
  website: schema.website,
  workForce: schema.select,
  lookingFor: schema.requiredString,
  country: schema.requiredString,
  regNo: schema.requiredString,
});

export const institutionProfileSchema = Yup.object().shape({
  studentCount: schema.select,
  description: schema.requiredString,
  name: schema.requiredString,
  // mobile: schema.mobile,
  location: schema.requiredString,
  country: schema.requiredString,
  website: schema.website,
  regNo: schema.requiredString,
});
