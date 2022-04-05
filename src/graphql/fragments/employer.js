import gql from "graphql-tag";

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
    profileCompletion {
      id
      settings
    }
    logo {
      url
      alt
    }
  }
`;
