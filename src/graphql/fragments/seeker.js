import gql from "graphql-tag";

export const seekerFragment = gql`
  fragment Seeker on SeekerNode {
    id
    title
    idNumber
    dateOfBirth
    description
    descriptionPlaintext
    location
    gender
    mobile
    status
    industries {
      name
      id
    }
  }
`;
