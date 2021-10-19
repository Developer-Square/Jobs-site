import { TypedQuery } from "core/queries";
import { GET_INDUSTRIES } from "graphql/queries";
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

export const institutionsQuery = gql`
  query Institutions {
    allInstitutions {
      id
      name
    }
  }
`;
export const TypedInstitutionQuery = TypedQuery(institutionsQuery);

export const TypedIndustriesQuery = TypedQuery(GET_INDUSTRIES);
