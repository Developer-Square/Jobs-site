import gql from "graphql-tag";

export const GET_SKILLS = gql`
  query Skills {
    allSkills {
      id
      name
    }
  }
`;
