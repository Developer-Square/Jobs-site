import React, {useEffect} from 'react';
import { Form, Formik } from "formik";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { signUpSchema, OTPVerficationSchema, furtherInformationSchema } from "./validation.schema";
import { HelperText } from "./Authentication.style";
import FormikControl from "../FormikContainer/FormikControl"
import Button from "components/Button/Button";
import { TOS } from "constants/routes.constants";
import { Typography } from "@material-ui/core";


export const SignUp = ({ initialValues, onSubmit, setSwitchTab, checked, handleChange, loading, history, fillFields }) => {

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

            {/* Email validation not working */}
            <FormikControl
              control="input"
              type="text"
              label="Email"
              name="email"
              icon="ln ln-icon-Mail"
            />
            <FormikControl
              control="phone"
              type="number"
              label="Phone number"
              name="phone"
              icon="ln ln-icon-Mail"
            />
            <FormikControl
              control="input"
              type="text"
              label="Full name"
              name="username"
              icon="ln ln-icon-Male"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password1"
              icon="ln ln-icon-Lock-2"
            />
            <FormikControl
              control="input"
              type="password"
              label="Confirm Password"
              name="password2"
              icon="ln ln-icon-Lock-2"
            />

            <TermsSection>
              <div>
                <FormikControl 
                  control="single-checkbox" 
                  name="terms"
                  checked={false} 
                  color="primary" 
                  style={{ marginTop: "16px" }}
                />
              </div>

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
            
            <Spacer marginTopBottom="17px 0" />

            <Button
              type="submit"
              // disabled={!formik.isValid}
              fullwidth
              loading={loading}
              title={loading ? "Signing Up ... " : "Sign Up"}
              style={{ color: "#ffffff" }}
            />
          </Form>
        );
      }}
    </Formik>
  )
}

export const OTPForm = ({loading, initialValues, onSubmit, onSignInSubmit, alert, resendRequest}) => {
  const [smsResend, setSmsResend] = React.useState(false);

  useEffect(() => {
    // Disable the resend sms link when a request to
    // send the otp code has been sent.
    if (resendRequest) {
      setSmsResend(true);
      alert.show(
        {
          title: 'OTP code has been resent, check your phone',
        },
        { type: 'success', timeout: 5000 },
      )
    }
    // eslint-disable-next-line
  }, [resendRequest])

  const resendSms = () => {
    let values = localStorage.getItem('registerValues');
    values = JSON.parse(values);
    onSignInSubmit(values.phone, true);
  }

  return (
    <Formik initialValues={initialValues} validationSchema={OTPVerficationSchema} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Form noValidate>
            <FormikControl
              control="input"
              type="number"
              label="OTP Code"
              name="otpcode"
              icon="ln ln-icon-Lock-2"
            />

            <Spacer>
              <p>Didn't receive the code? <Resend smsResend={smsResend} onClick={resendSms}>Resend</Resend></p>
            </Spacer>

            <Button
              type="submit"
              disabled={!formik.isValid}
              fullwidth
              loading={loading}
              title={loading ? "Verifying ... " : "Verify"}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

export const FurtherInformation = ({ switchTabs, loading, schoolOptions, interests, initialValues, onSeekerProfileSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={furtherInformationSchema} onSubmit={onSeekerProfileSubmit}>
      {(formik) => {
        return (
          <Form>
            <Spacer>
              <Link to={"/auth"} onClick={() => switchTabs('', 'back')}>{`<`} Go to previous tab </Link>
            </Spacer>
            <FormikControl
              control="create-select"
              options={schoolOptions}
              label="Institution/School"
              name="school"
              icon="ln ln-icon-Lock-2"
            />

            <FormikControl
              control="input"
              type="text"
              label="Course"
              name="course"
              icon="ln ln-icon-Lock-2"
            />

            <FormikControl
              control="select"
              isMulti
              options={interests}
              label="Interests"
              name="interests"
              className="basic-multi-select"
              classNamePrefix="select"
              icon="ln ln-icon-Lock-2"
            />
            {/* This is here as the dropdown appears behind the submit button
            hence we need to add some extra space */}
            <Spacer marginTopBottom="100px 0" />

            <Button
              type="submit"
              disabled={!formik.isValid}
              fullwidth
              loading={loading}
              title={loading ? "Saving ... " : "Save"}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

export const Billing = ({ switchTabs }) => {
  const useStyles = makeStyles({
    root: {
      minWidth: 235,
      marginRight: 10,
      minHeight: 150,
      cursor: "pointer",
    }
  })

  const classNames = useStyles()

  const options = [
    {tier: "Basic", title: "Explore"},
    {tier: "Standard", title: "Get Started"},
    {tier: "Premium", title: "Get Started"},
  ]
  return (
    <>
      <Spacer>
        <Link to={"/auth"} onClick={() => switchTabs('', 'back')}>{`<`} Go to previous tab </Link>
      </Spacer>
      <Title>Choose your tier: </Title>
      <PricingTier>
        {options.map((option, index) => (
          <div key={index}>
          {/* Add action to take them to dashboard */}
            <Card key={index} onClick={() => {}} className={classNames.root}>
              <CardContent>
                <Typography variant="h5">
                  {option.tier}
                </Typography>
              </CardContent>
            </Card>
            <Title>{option.title}</Title>
          </div>
        ))}

      </PricingTier>
    </>
  )
}

const Resend = styled.div`
  display: inline-block;
  color: ${ props => props.smsResend ? 'rgba(0, 0, 0, 0.38)' : '#21277f'};
  font-weight: bold;
  pointer-events: ${props => props.smsResend ? 'none': 'all'};
  cursor: pointer;
`

const TermsSection = styled.div`
  display: flex;
  justify-content: center;
`

const Spacer = styled.div`
  margin: ${props => props.marginTopBottom ? props.marginTopBottom : "15px 0"};
`

const PricingTier = styled.div`
  display: flex;
`

const Title = styled.p`
  margin: 12px 0;
  font-size: 15px;
  text-decoration: none;
  color: black;
  cursor: pointer;
`