import * as Yup from "yup";
import * as schema from "common/yupFieldValidation";

export const vacancySchema = Yup.object().shape({
  title: schema.requiredString,
  jobType: schema.select,
  minQualification: schema.select,
  yearsOfExp: schema.select,
  salary: schema.number,
  location: schema.requiredString,
  description: schema.requiredString,
  positions: schema.number,
  payRate: schema.select,
  industry: schema.select,
  closingDate: schema.date,
  applicationUrl: schema.website,
});
