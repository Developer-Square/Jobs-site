import * as Yup from "yup";
import * as msg from "./schema.messages";

const email = Yup.string()
  .min(3, msg.emailNotLongEnough)
  .max(100)
  .email(msg.invalidEmail)
  .required(msg.emailRequired);
const username = Yup.string()
  .min(3, msg.nameNotLongEnough)
  .max(100)
  .required(msg.fieldRequired);

export const baseProfileSchema = Yup.object().shape({
  email: email,
  username: username,
});
