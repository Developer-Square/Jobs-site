import {
  seekerFragment,
  employerFragment,
  institutionFragment,
} from "graphql/fragments";
import gql from "graphql-tag";

export const BASE_PROFILE_MUTATION = gql`
  mutation UpdateAccount($firstName: String!, $lastName: String!) {
    updateAccount(input: { firstName: $fullName, lastName: $lastName }) {
      success
      errors
    }
  }
`;

export const SEEKER_PROFILE_MUTATION = gql`
  ${seekerFragment}
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
        ...Seeker
      }
    }
  }
`;

export const SEEKER_UPDATE_MUTATION = gql`
  ${seekerFragment}
  mutation SeekerCreate(
    $id: ID!
    $title: String
    $idNumber: Int
    $dateOfBirth: Date
    $description: JSONString
    $location: String
    $gender: SeekerGender
    $mobile: String
    $status: SeekerStatus
    $industries: [ID]!
  ) {
    seekerPatch(
      id: $id
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
        ...Seeker
      }
    }
  }
`;

export const EMPLOYER_PROFILE_MUTATION = gql`
  ${employerFragment}
  mutation EmployerCreate(
    $workForce: EmployerWorkForce
    $description: JSONString
    $descriptionPlaintext: String
    $name: String
    $website: String
    $country: String
    $location: String
    $mobile: String
    $regNo: Int
    $lookingFor: String
    $industries: [ID]
  ) {
    employerCreate(
      input: {
        workForce: $workForce
        description: $description
        descriptionPlaintext: $descriptionPlaintext
        name: $name
        website: $website
        country: $country
        location: $location
        mobile: $mobile
        regNo: $regNo
        lookingFor: $lookingFor
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

export const EMPLOYER_UPDATE_MUTATION = gql`
  ${employerFragment}
  mutation EmployerUpdate(
    $id: ID!
    $workForce: EmployerWorkForce
    $description: JSONString
    $descriptionPlaintext: String
    $name: String
    $website: String
    $country: String
    $location: String
    $mobile: String
    $regNo: Int
    $lookingFor: String
    $industries: [ID]
  ) {
    employerPatch(
      id: $id
      input: {
        workForce: $workForce
        description: $description
        descriptionPlaintext: $descriptionPlaintext
        name: $name
        website: $website
        country: $country
        location: $location
        mobile: $mobile
        regNo: $regNo
        lookingFor: $lookingFor
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

export const INSTITUTION_PROFILE_MUTATION = gql`
  ${institutionFragment}
  mutation InstitutionCreate(
    $studentCount: InstitutionStudentCount
    $description: JSONString
    $descriptionPlaintext: String
    $name: String
    $website: String
    $country: String
    $location: String
    $mobile: String
    $regNo: String
  ) {
    institutionCreate(
      input: {
        studentCount: $studentCount
        description: $description
        descriptionPlaintext: $descriptionPlaintext
        name: $name
        website: $website
        country: $country
        location: $location
        mobile: $mobile
        regNo: $regNo
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      institution {
        ...Institution
      }
    }
  }
`;

export const INSTITUTION_UPDATE_MUTATION = gql`
  ${institutionFragment}
  mutation InstitutionUpdate(
    $id: ID!
    $studentCount: InstitutionStudentCount
    $description: JSONString
    $descriptionPlaintext: String
    $name: String
    $website: String
    $country: String
    $location: String
    $mobile: String
    $regNo: String
  ) {
    institutionPatch(
      id: $id
      input: {
        studentCount: $studentCount
        description: $description
        descriptionPlaintext: $descriptionPlaintext
        name: $name
        website: $website
        country: $country
        location: $location
        mobile: $mobile
        regNo: $regNo
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      institution {
        ...Instituition
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
export const AVATAR_UPDATE_MUTATION = gql`
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
