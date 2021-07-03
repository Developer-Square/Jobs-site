import gql from "graphql-tag";

import { userFragment } from "fragments/auth";

export const GET_USER_DETAILs = gql`
  ${userFragment}
  query UserDetails {
    me {
      ...User
    }
  }
`;
