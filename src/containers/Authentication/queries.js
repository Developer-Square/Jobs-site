import { TypedQuery } from "core/queries";
import gql from "graphql-tag";

export const homePageQuery = gql`
  query UserList($first: Int!) {
    users(first: $first) {
      edges {
        node {
          id
          fullName
          isStaff
          isActive
        }
      }
    }
  }
`;

export const TypedHomePageQuery = TypedQuery(homePageQuery);
