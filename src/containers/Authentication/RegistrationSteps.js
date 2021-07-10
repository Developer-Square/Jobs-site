import { Form, Formik } from "formik";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { signUpSchema } from "./validation.schema";
import { HelperText } from "./Authentication.style";
import FormikControl from "../FormikContainer/FormikControl"
import Button from "components/Button/Button";
import { TOS } from "constants/routes.constants";
import { Typography } from "@material-ui/core";


export const SeekerSignUp = ({ initialValues, onSubmit, setSwitchTab, checked, handleChange, loading, history, fillFields }) => {

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
              <div>
                <FormikControl 
                  control="single-checkbox" 
                  value="terms"
                  checked={checked} 
                  onChange={handleChange} 
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
              <Link to={"/auth"} onClick={() => switchTabs('', 'back')}>{`<`} Go to previous tab </Link>
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
              disabled={!formik.isValid}
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

export const SeekerProfileDetails = ({ loading, switchTabs}) => {
  return (
    <Formik>
      {(formik) => {
        return (
          <Form>
             <Spacer>
                <Link to={"/auth"} onClick={() => switchTabs('', 'back')}>{`<`} Go to previous tab </Link>
              </Spacer>

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

export const FurtherInformation = ({ switchTabs, loading, schoolOptions, interests }) => {
  return (
    <Formik>
      {(formik) => {
        return (
          <Form>
            <Spacer>
              <Link to={"/auth"} onClick={() => switchTabs('', 'back')}>{`<`} Go to previous tab </Link>
            </Spacer>
            <FormikControl
              control="select"
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
              control="react-select"
              options={interests}
              label="Interests"
              name="interests"
              isMulti
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
              onClick={() => switchTabs('', 'forward')}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

export const Billing = () => {
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
      <Title>Choose your tier: </Title>
      <PricingTier>
        {options.map((option, index) => (
          <div>
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