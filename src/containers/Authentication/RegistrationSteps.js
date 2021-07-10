import { Form, Formik } from "formik";
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components'
import { Link } from "react-router-dom";

import { signUpSchema } from "./validation.schema";
import { HelperText } from "./Authentication.style";
import FormikControl from "../FormikContainer/FormikControl"
import Button from "components/Button/Button";
import { TOS } from "constants/routes.constants";


export const SeekerSignUp = ({ initialValues, onSubmit, setSwitchTab, checked, handleChange, loading, history }) => {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="register" noValidate>
            <Spacer>
              <Link to={"/auth"} onClick={() => setSwitchTab('')}>{`<`} Select Different Option </Link>
            </Spacer>

            <FormikControl
              control="phone"
              type="number"
              label="Phone number"
              name="phonenumber"
              icon="ln ln-icon-Mail"
            />
            <FormikControl
              control="input"
              type="text"
              label="Full name"
              name="fullname"
              icon="ln ln-icon-Male"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
              icon="ln ln-icon-Lock-2"
            />
            
            <TermsSection>
            <Checkbox checked={checked} required={true} onChange={handleChange} color="primary" style={{ paddingTop: "17px" }} />

            <HelperText style={{ padding: "20px 0px 10px", width: "200px" }}>
              I agree to the
              <strong
                style={{ color: "#21277f" }}
                onClick={() => history.push(`${TOS}`)}
              >
                Terms &amp; Condtions
              </strong>
            </HelperText>
            </TermsSection>
            

            <Button
              type="submit"
              disabled={!formik.isValid}
              fullwidth
              loading={loading}
              title={loading ? "Signing Up ... " : "Sign Up"}
              style={{ color: "#ffffff" }}
              //   {...(loading && { disabled: true })}
            />
          </Form>
        );
      }}
    </Formik>
  )
}

export const OTPForm = ({switchTabs, loading}) => {
  return (
    <Formik>
      {(formik) => {
        return (
          <Form>
            <Spacer>
              <Link to={"/auth"} onClick={() => switchTabs('', 'back')}>{`<`} Select Different Option </Link>
            </Spacer>
            <FormikControl
              control="input"
              type="number"
              label="OTP Code"
              name="otpcode"
              icon="ln ln-icon-Lock-2"
            />

            <Button
              type="submit"
              // disabled={!formik.isValid}
              fullwidth
              loading={loading}
              title={loading ? "Verifying ... " : "Verify"}
              onClick={() => switchTabs('', 'forward')}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

export const SeekerProfileDetails = ({statusOptions, genderOptions, loading, industries, switchTabs}) => {
  
  return (
    <Formik>
      {(formik) => {
        return (
          <Form>
             <Spacer>
                <Link to={"/auth"} onClick={() => switchTabs('', 'back')}>{`<`} Select Different Option </Link>
              </Spacer>
            <FormikControl
              control="input"
              type="text"
              label="Title"
              placeholder="e.g. Student, Eng, Mr etc"
              name="title"
            />
            <FormikControl
              control="input"
              type="number"
              label="ID Number"
              placeholder="ID Number"
              name="idNumber"
            />

            <FormikControl
              control="select"
              label="Status"
              name="status"
              style={{ margin: 0 }}
              options={statusOptions}
              defaultValue={{
                value: "",
                label: "Select Options",
              }}
            />
              <FormikControl
              control="select"
              label="Gender"
              name="gender"
              style={{ margin: 0 }}
              options={genderOptions}
              defaultValue={{ value: "", label: "Select Gender" }}
            />
            <FormikControl
              control="input"
              type="text"
              label="Current Residence (County, Place)"
              name="location"
              placeholder="e.g. Nairobi, Kasarani - Corner"
            />
            <FormikControl
              control="select"
              label="Interests"
              name="industries"
              style={{ margin: 0 }}
              options={industries}
              isMulti={true}
            />
            <FormikControl
              control="textarea"
              label="Additional Info"
              name="description"
              rte={true}
              fullWidth
            />
            <Button
              type="submit"
              disabled={!formik.isValid}
              fullwidth
              loading={loading}
              title={loading ? "Saving... " : "Complete"}
              className="button margin-top-15"
            />
          </Form>
         )
      }}
    </Formik>
  )
}

const TermsSection = styled.div`
  display: flex;
  justify-content: center;
`

const Spacer = styled.div`
  margin: 15px 0;
`