import { TypedMutation } from "core/mutations";
import gql from "graphql-tag";

export const BASE_PROFILE_MUTATION = gql`
  mutation UpdateAccount($firstName: String!, $lastName: String!) {
    updateAccount(input: { firstName: $fullName, lastName: $lastName }) {
      success
      errors
    }
  }
`;

export const TypedBaseProfileMutation = TypedMutation(BASE_PROFILE_MUTATION);

export const SEEKER_PROFILE_MUTATION = gql`
  mutation SeekerCreate(
    $title: String
    $idNumber: Int
    $dateOfBirth: Date
    $description: JSONString
    $location: String
    $gender: SeekerGender!
    $mobile: String
    $status: SeekerStatus!
    $industries: [ID]!
  ) {
    seekerCreate(
      input: {
        title: $title
        idNumber: $idNumber
        dateOfBirth: $dateOfBirth
        description: $description
        location: $location
        gender: $gender
        mobile: $mobile
        status: $status
        industries: $industries
      }
    ) {
      success
      errors {
        field
        message
      }
      seeker {
        title
        idNumber
        dateOfBirth
        description
        location
        gender
        mobile
        status
        industries(first: 20) {
          edges {
            node {
              name
              id
            }
          }
        }
      }
    }
  }
`;

export const TypedSeekerProfileMutation = TypedMutation(
  SEEKER_PROFILE_MUTATION,
);

export const EMPLOYER_PROFILE_MUTATION = gql`
  mutation UpdateAccount($firstName: String!, $lastName: String!) {
    updateAccount(input: { firstName: $fullName, lastName: $lastName }) {
      success
      errors
    }
  }
`;

export const TypedEmployerProfileMutation = TypedMutation(
  EMPLOYER_PROFILE_MUTATION,
);

export const INSTITUTION_PROFILE_MUTATION = gql`
  mutation UpdateAccount($firstName: String!, $lastName: String!) {
    updateAccount(input: { firstName: $fullName, lastName: $lastName }) {
      success
      errors
    }
  }
`;

export const TypedInstitutionProfileMutation = TypedMutation(
  INSTITUTION_PROFILE_MUTATION,
);

export const accountErrorFragment = gql`
  fragment AccountErrorFragment on AccountError {
    code
    field
  }
`;
const AVATAR_UPDATE_MUTATION = gql`
  ${accountErrorFragment}
  mutation AvatarUpdate($image: Upload!) {
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
export const TypedAvatarUpdateMutation = TypedMutation(AVATAR_UPDATE_MUTATION);
