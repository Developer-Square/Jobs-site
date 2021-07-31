import { TypedQuery } from "core/queries";
import gql from "graphql-tag";

export const VACANCIES_QUERY = gql`
  query VacanciesList(
    $filter: VacancyFilterInput
    $sortBy: VacancySortingInput
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    vacancies(
      filter: $filter
      sortBy: $sortBy
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      __typename
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        __typename
        node {
          __typename
          id
          title
          jobType
          description
          jobType
          minQualification
          positions
          yearsOfExp
          payRate
          salary
          amount {
            currency
            amount
          }
          location
          createdAt
          industry {
            name
            id
          }
          postedBy {
            name
            id
            website
            logo {
              url
              alt
            }
          }
        }
      }
    }
    __type(name: "JobJobType") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const TypedVacanciesQuery = TypedQuery(VACANCIES_QUERY);
