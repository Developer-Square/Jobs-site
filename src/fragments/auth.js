import gql from "graphql-tag";

import { addressFragment } from "./address";

// export const institutionFragment = gql`
//   fragment Institution on InstitutionNode {
//     descriptionPlaintext
//     Id
//     Name
//     website
//     country
//     location
//     mobile
//     regNo
//   }
// `;
// export const employerFragment = gql`
//   fragment Employer on EmployerNode {
//     descriptionPlaintext
//     Id
//     Name
//     website
//     country
//     location
//     mobile
//     regNo
//   }
// `;

export const userFragment = gql`
  ${addressFragment}
  fragment User on User {
    id
    email
    username
    firstName
    lastName
    isSeeker
    isEmployer
    isInstitution
    seeker {
      title
      idNumber
      dateOfBirth
      location
      gender
      status
    }
    employer {
      lookingFor
      workForce
      descriptionPlaintext
      id
      name
      website
      country
      location
      mobile
      regNo
    }
    institution {
      studentCount
      descriptionPlaintext
      id
      name
      website
      country
      location
      mobile
      regNo
    }
    avatar {
      url
      alt
    }
    defaultAddress {
      ...Address
    }
    addresses {
      ...Address
    }
  }
`;
