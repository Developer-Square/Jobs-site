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
