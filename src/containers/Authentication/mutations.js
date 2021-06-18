import { TypedMutation } from "core/mutations";
import gql from "graphql-tag";

export const PASSWORD_CHANGE = gql`
  mutation PasswordChange(
    $oldPassword: String!
    $newPassword1: String!
    $newPassword2: String!
  ) {
    passwordChange(
      input: {
        oldPassword: $oldPassword
        newPassword1: $newPassword1
        newPassword2: $newPassword2
      }
    ) {
      success
      errors
      token
      refreshToken
    }
  }
`;

export const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation SendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(input: { email: $email }) {
      success
      errors
    }
  }
`;

export const PASSWORD_RESET = gql`
  mutation ResetPassword(
    $token: String!
    $newPassword1: String!
    $newPassword2: String!
  ) {
    passwordReset(
      input: {
        token: $token
        newPassword1: $newPassword1
        newPassword2: $newPassword2
      }
    ) {
      success
      errors
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    tokenAuth(input: { email: $email, password: $password }) {
      refreshToken
      success
      errors
      unarchiving
      token
      user {
        id
        email
        username
        isVerified
        verified
        fullName
        isStaff
        isActive
        isIndividual
        isBusiness
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation RegisterAccount(
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      input: {
        email: $email
        username: $username
        password1: $password1
        password2: $password2
      }
    ) {
      success
      errors
      token
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyAccount($token: String!) {
    verifyAccount(input: { token: $token }) {
      success
      errors
    }
  }
`;

export const RESEND_ACTIVATION_EMAIL_MUTATION = gql`
  mutation ResendActivationEmail($email: String!) {
    resendActivationEmail(input: { email: $email }) {
      success
      errors
    }
  }
`;

export const TypedAccountLoginMutation = TypedMutation(LOGIN_MUTATION);
export const TypedAccountRegistrationMutation = TypedMutation(SIGNUP_MUTATION);
export const TypedPasswordResetEmailMutation = TypedMutation(
  SEND_PASSWORD_RESET_EMAIL
);
export const TypedPasswordChangeMutation = TypedMutation(PASSWORD_CHANGE);
export const TypedPasswordResetMutation = TypedMutation(PASSWORD_RESET);
export const TypedVerifyEmailMutation = TypedMutation(VERIFY_EMAIL_MUTATION);
