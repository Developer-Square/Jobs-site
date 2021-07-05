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
