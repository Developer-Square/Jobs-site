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
        avatar
        username
        verified
        firstName
        lastName
        isStaff
        isActive
        isSeeker
        isEmployer
        isInstitution
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation RegisterAccount(
    $email: String!
    $username: String!
    $fullName: String!
    $password1: String!
    $password2: String!
    $phone: String!
    $isEmployer: Boolean!
    $isSeeker: Boolean!
    $isInstitution: Boolean!
  ) {
    register(
      input: {
        email: $email
        username: $username
        fullName: $fullName
        password1: $password1
        password2: $password2
        phone: $phone
        isEmployer: $isEmployer
        isSeeker: $isSeeker
        isInstitution: $isInstitution
      }
    ) {
      success
      errors
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

export const GET_TOKEN_MUTATION = gql`
  mutation RefreshTokenMutation($refreshToken: String!) {
    refreshToken(input: { refreshToken: $refreshToken }) {
      errors
      success
      refreshToken
      token
      payload
    }
  }
`;

export const CREATE_EMPLOYER = gql`
  mutation EmployerCreate(
    $name: String
    $country: String
    $location: String
    $industries: [ID]
  ) {
    employerCreate(
      input: {
        name: $name
        country: $country
        location: $location
        industries: $industries
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      employer {
        ...Employer
      }
    }
  }
`;

export const SEEKER_PROFILE_MUTATION = gql`
  mutation SeekerCreate(
    $institution: ID
    $course: ID
    $industries: [ID]!
    $interests: [ID]
    $skills: [ID]
  ) {
    seekerCreate(
      input: {
        industries: $industries
        course: $course
        institution: $institution
        interests: $interests
        skills: $skills
      }
    ) {
      success
      errors {
        field
        message
      }
    }
  }
`;

export const accountErrorFragment = gql`
  fragment AccountErrorFragment on AccountError {
    code
    field
  }
`;

const AVATAR_UPDATE_MUTATION = gql`
  ${accountErrorFragment}
  mutation AvatarUpdate($image: BaseUpload!) {
    userAvatarUpdate(image: $image) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
      success
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;

export const EMPLOYER_PROFILE_MUTATION = gql`
  mutation EmployerCreate($name: String, $country: String, $location: String) {
    employerCreate(
      input: { name: $name, country: $country, location: $location }
    ) {
      __typename
      success
      errors {
        field
        message
      }
    }
  }
`;

export const CREATE_SELECTABLE_INSTITUTION = gql`
  mutation CreateInstitution(
    $name: String!
    $chatroom: String!
    $text: String!
  ) {
    createSelectableInstitution(
      input: { name: $name, chatroom: $chatroom, text: $text }
    ) {
      success
      vacancyErrors {
        message
        code
      }
    }
  }
`;

export const MAKE_PAYMENT = gql`
  mutation onlinePayment(
    $billingPhone: String
    $amount: PositiveDecimal
    $planId: ID!
  ) {
    makePayment(
      planId: $planId
      input: { billingPhone: $billingPhone, amount: $amount }
    ) {
      success
      onlineCheckout {
        id
        phone
        amount
        isPaybill
        checkoutRequestId
        planId
        accountReference
        transactionDescription
        customerMessage
        merchantRequestId
        responseCode
        responseDescription
        dateAdded
      }
    }
  }
`;

export const TypedMakePayment = TypedMutation(MAKE_PAYMENT);

export const TypedEmployerProfileMutation = TypedMutation(
  EMPLOYER_PROFILE_MUTATION,
);
export const TypedAccountLoginMutation = TypedMutation(LOGIN_MUTATION);
export const TypedAccountRegistrationMutation = TypedMutation(SIGNUP_MUTATION);
export const TypedPasswordResetEmailMutation = TypedMutation(
  SEND_PASSWORD_RESET_EMAIL,
);
export const TypedPasswordChangeMutation = TypedMutation(PASSWORD_CHANGE);
export const TypedPasswordResetMutation = TypedMutation(PASSWORD_RESET);
export const TypedVerifyEmailMutation = TypedMutation(VERIFY_EMAIL_MUTATION);
export const TypedResendAactivationEmailMutation = TypedMutation(
  RESEND_ACTIVATION_EMAIL_MUTATION,
);
export const TypedCreateEmployerMutation = TypedMutation(CREATE_EMPLOYER);
export const TypedAvatarUpdateMutation = TypedMutation(AVATAR_UPDATE_MUTATION);
export const TypedSeekerProfileMutation = TypedMutation(
  SEEKER_PROFILE_MUTATION,
);
export const TypedCreateSelectableInstitutionMutation = TypedMutation(
  CREATE_SELECTABLE_INSTITUTION,
);
