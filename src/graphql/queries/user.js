import gql from "graphql-tag";

import { userFragment } from "graphql/fragments";

export const GET_USER_DETAILS = gql`
  ${userFragment}
  query UserDetails {
    me {
      ...User
    }
  }
`;

export const COUNTRIES_QUERY = gql`
  query COUNTRIESQUERY {
    __type(name: "CountryCode") {
      enumValues {
        name
        description
      }
    }
  }
`;
