import {
  seekerFragment,
  employerFragment,
  institutionFragment,
  addressFragment,
  userFragment,
} from "graphql/fragments";
import gql from "graphql-tag";

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($password: String!) {
    deleteAccount(input: { password: $password }) {
      __typename
      success
      errors
    }
  }
`;

export const CREATE_ADDRESS = gql`
  ${addressFragment}
  ${userFragment}
  mutation AddressCreate(
    $firstName: String
    $lastName: String
    $companyName: String
    $streetAddress1: String
    $streetAddress2: String
    $city: String
    $cityArea: String
    $postalCode: String
    $country: CountryCode
    $countryArea: String
    $phone: String
  ) {
    accountAddressCreate(
      input: {
        firstName: $firstName
        lastName: $lastName
        companyName: $companyName
        streetAddress1: $streetAddress1
        streetAddress2: $streetAddress2
        city: $city
        cityArea: $cityArea
        postalCode: $postalCode
        country: $country
        countryArea: $countryArea
        phone: $phone
      }
    ) {
      success
      accountErrors {
        field
        message
        code
      }
      user {
        ...User
      }
      address {
        ...Address
      }
    }
  }
`;
export const UPDATE_ADDRESS = gql`
  ${addressFragment}
  ${userFragment}
  mutation AddressUpdate(
    $firstName: String
    $lastName: String
    $companyName: String
    $streetAddress1: String
    $streetAddress2: String
    $city: String
    $cityArea: String
    $postalCode: String
    $country: CountryCode
    $countryArea: String
    $phone: String
    $id: ID!
  ) {
    accountAddressCreate(
      id: $id
      input: {
        firstName: $firstName
        lastName: $lastName
        companyName: $companyName
        streetAddress1: $streetAddress1
        streetAddress2: $streetAddress2
        city: $city
        cityArea: $cityArea
        postalCode: $postalCode
        country: $country
        countryArea: $countryArea
        phone: $phone
      }
    ) {
      success
      accountErrors {
        field
        message
        code
      }
      user {
        ...Seeker
      }
      address {
        ...Address
      }
    }
  }
`;
export const DELETE_ADDRESS = gql`
  ${addressFragment}
  ${userFragment}
  mutation AddressDelete($id: ID!) {
    accountAddressCreate(id: $id) {
      success
      accountErrors {
        field
        message
        code
      }
      user {
        ...Seeker
      }
      address {
        ...Address
      }
    }
  }
`;

export const BASE_PROFILE_MUTATION = gql`
  mutation UpdateAccount($firstName: String!, $lastName: String!) {
    updateAccount(input: { firstName: $firstName, lastName: $lastName }) {
      success
      errors
    }
  }
`;

export const SEEKER_PROFILE_COMPLETION = gql`
  mutation SeekerProfileCompletionPatch(
    $id: ID!
    $settings: Boolean
    $education: Boolean
    $skills: Boolean
    $experience: Boolean
    $socials: Boolean
  ) {
    seekerProfileCompletionPatch(
      id: $id
      input: {
        settings: $settings
        education: $education
        skills: $skills
        experience: $experience
        socials: $socials
      }
    ) {
      success
      errors {
        field
        message
      }
      seekerProfileCompletion {
        id
        seeker {
          id
        }
        settings
        education
        skills
        experience
        socials
      }
    }
  }
`;
export const EMPLOYER_PROFILE_COMPLETION = gql`
  mutation EmployerProfileCompletionPatch(
    $id: ID!
    $settings: Boolean
    $socials: Boolean
  ) {
    employerProfileCompletionPatch(
      id: $id
      input: { settings: $settings, socials: $socials }
    ) {
      success
      errors {
        field
        message
      }
      employerProfileCompletion {
        id
        employer {
          id
        }
        settings
        socials
      }
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
  mutation SeekerPatch(
    $id: ID!
    $title: String
    $idNumber: Int
    $dateOfBirth: Date
    $description: JSONString
    $location: String
    $gender: SeekerGender
    $mobile: String
    $status: SeekerStatus
    $industries: [ID]
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
    $regNo: String
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
    $regNo: String
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
