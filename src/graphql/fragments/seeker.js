import gql from "graphql-tag";

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
    industries {
      name
      id
    }
  }
`;
