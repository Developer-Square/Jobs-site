import gql from "graphql-tag";

import { userFragment } from "graphql/fragments";

export const GET_PROFILE_DETAILS = gql`
  ${userFragment}
  query UserProfileDetails($id: ID!) {
    user(id: $id) {
      ...User
    }
  }
`;

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

export const RECENT_ACTIVITIES_QUERY = gql`
  query RecentActivitiesList(
    $filter: ActivityFilterInput
    $sortBy: ActivitySortingInput
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    recentActivities(
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
          descriptionPlaintext
          modelName
          modelId
          modelData
          createdAt
          user {
            fullName
            id
            avatar {
              url
              alt
            }
          }
        }
      }
    }
  }
`;
