import gql from "graphql-tag";
import { seekerFragment } from "graphql/fragments";
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

export const GET_SPOTLIGHT_SEEKERS = gql`
  ${seekerFragment}
  query UserDetails {
    me {
      ...User
    }
  }
`;

export const GET_RECENT_SEEKERS = gql`
  query Seekers($first: Int, $sortBy: SeekerSortingInput) {
    seekers(first: $first, sortBy: $sortBy) {
      edges {
        node {
          id
          title
          idNumber
          createdAt
          dateOfBirth
          description
          descriptionPlaintext
          location
          gender
          mobile
          status
          skills {
            name
            id
          }
          course {
            name
            id
          }
          profession {
            name
            id
          }
          industries {
            name
            id
          }
          institution {
            id
            name
          }
          user {
            id
            email
            isSeeker
            isEmployer
            isInstitution
            productTour
            extra
            phone
            dateJoined
            updatedAt
            createdAt
            numberOfJobsBookmarked
            numberOfApplications
            numberOfActiveJobListings
            avatar {
              url
              alt
            }
            socials {
              id
              link
              network
              username
            }
          }
        }
      }
    }
  }
`;
