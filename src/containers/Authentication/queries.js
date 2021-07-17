import { TypedQuery } from "core/queries";
import { GET_INDUSTRIES } from "common/queries";
import gql from "graphql-tag";

export const homePageQuery = gql`
  query UserList($first: Int!) {
    users(first: $first) {
      edges {
        node {
          id
          isStaff
          isActive
        }
      }
    }
  }
`;

export const TypedHomePageQuery = TypedQuery(homePageQuery);

export const TypedIndustriesQuery = TypedQuery(GET_INDUSTRIES);

