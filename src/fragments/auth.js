import gql from "graphql-tag";

import { addressFragment } from "./address";

export const userFragment = gql`
  ${addressFragment}
  fragment User on User {
    id
    email
    firstName
    lastName
    isSeeker
    isEmployer
    isInstitution
    avatar {
      url
      alt
    }
    defaultAddress {
      ...Address
    }
    addresses {
      ...Address
    }
  }
`;
