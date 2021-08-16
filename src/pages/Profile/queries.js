import { GET_INDUSTRIES } from "common/queries";
import { TypedQuery } from "core/queries";
import gql from "graphql-tag";

export const GENDER_ENUM_QUERY = gql`
  query GetEnum {
    __type(name: "SeekerGender") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const STATUS_ENUM_QUERY = gql`
  query GetEnum {
    __type(name: "SeekerStatus") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const EmployerWorkForce = gql`
  query EmployerWorkForce {
    __type(name: "EmployerWorkForce") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const TypedEmployerWorkForceQuery = TypedQuery(EmployerWorkForce);

export const InstitutionStudentCount = gql`
  query InstitutionStudentCount {
    __type(name: "InstitutionStudentCount") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const TypedInstitutionStudentCountQuery = TypedQuery(
  InstitutionStudentCount,
);

export const TypedIndustriesQuery = TypedQuery(GET_INDUSTRIES);

export const SeekerProfile = gql`
  query User($id: ID!, $first: Int) {
    user (id: $id) {
          email
          username
          firstName
          lastName
          avatar
          phone
          verified
          seeker {
            title
            gender
            status
            idNumber
            industries(first: $first) {
              edges {
                node {
                  name
                }
              }
            }
          }
          isSeeker
          isEmployer
          defaultAddress {
            streetAddress1
            city
          }
    }
  }
`
export const TypedSeekerProfileQuery = TypedQuery(SeekerProfile);

export const EmployerProfile = gql`

  query Employer($id: ID!) {
    user (id: $id) {
      email
      username
      firstName
      lastName
      avatar
      phone
      verified
      employer {
        descriptionPlaintext
        name
        website
        country
        lookingFor
        industries {
          name
        }
        logo {
          url
          alt
        }
      }
      isSeeker
      isEmployer
      defaultAddress {
        streetAddress1
        city
      }
    }
  }
`
export const TypedEmployerProfileQuery = TypedQuery(EmployerProfile);
