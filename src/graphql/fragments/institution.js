import gql from "graphql-tag";

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
