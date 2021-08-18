import gql from "graphql-tag";

import { addressFragment } from "graphql/fragments";

export const institutionFragment = gql`
  fragment Institution on InstitutionNode {
    id
    studentCount
    description
    descriptionPlaintext
    name
    website
    country
    location
    mobile
    regNo
    logo {
      url
      alt
    }
  }
`;
export const employerFragment = gql`
  fragment Employer on EmployerNode {
    id
    workForce
    description
    descriptionPlaintext
    name
    website
    country
    location
    mobile
    regNo
    lookingFor
    industries {
      name
      id
    }
    logo {
      url
      alt
    }
  }
`;
export const seekerFragment = gql`
  fragment Seeker on SeekerNode {
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
`;

export const userFragment = gql`
  ${addressFragment}
  ${institutionFragment}
  ${employerFragment}
  ${seekerFragment}
  fragment User on User {
    id
    email
    username
    firstName
    lastName
    isSeeker
    isEmployer
    isInstitution
    extra
    phone
    dateJoined
    updatedAt
    createdAt
    numberOfJobsBookmarked
    numberOfApplications
    numberOfActiveJobListings
    socials {
      id
      link
      network
      username
    }
    resumes {
      id
      name
    }
    seeker {
      ...Seeker
    }
    employer {
      ...Employer
    }
    institution {
      ...Institution
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
