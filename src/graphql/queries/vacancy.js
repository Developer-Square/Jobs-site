import gql from "graphql-tag";
import { vacancyFragment } from "graphql/fragments";

export const BOOKMARKED_JOBS = gql`
  ${vacancyFragment}
  query BookmarkedJobsList {
    bookmarkedJobs {
      slug
      uuid
      createdAt
      updatedAt
      isDeleted
      isActive
      id
      job {
        ...Vacancy
      }
      user {
        id
        fullName
        email
        avatar {
          url
          alt
        }
      }
      bookmarked
    }
  }
`;

export const GET_APPLICATIONS = gql`
  query ApplicationsList {
    applications {
      slug
      uuid
      createdAt
      updatedAt
      isDeleted
      isActive
      id
      inbuiltResume {
        id
      }
      extraAttachment
      applicant {
        id
        fullName
        email
        phone
        seeker {
          id
          location
        }
        avatar {
          url
          alt
        }
      }
      job {
        id
        title
        creator {
          id
          fullName
          email
          phone
          avatar {
            url
            alt
          }
        }
      }
      appliedOn
      resume
      budget
      comment
      status
      favourite
    }
    __type(name: "ApplicationStatus") {
      enumValues {
        description
        name
      }
    }
  }
`;

export const GET_JOB_APPLICATIONS = gql`
  query JobApplications(
    $filter: ApplicationFilterInput
    $sortBy: ApplicationSortingInput
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    jobApplications(
      filter: $filter
      sortBy: $sortBy
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      __typename
      totalCount
      queryCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        __typename
        node {
          slug
          uuid
          createdAt
          updatedAt
          isDeleted
          isActive
          id
          inbuiltResume {
            id
          }
          extraAttachment
          applicant {
            id
            fullName
            email
            phone
            progress
            seeker {
              location
              status
              title
            }
            avatar {
              url
              alt
            }
          }
          job {
            id
            title
            creator {
              id
              fullName
              email
              phone
              avatar {
                url
                alt
              }
            }
          }
          appliedOn
          resume
          budget
          comment
          status
          favourite
          employerComment
        }
      }
    }
    __type(name: "ApplicationStatus") {
      enumValues {
        description
        name
      }
    }
  }
`;

export const VACANCIES_QUERY = gql`
  ${vacancyFragment}
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
      queryCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        __typename
        node {
          ...Vacancy
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

export const EMPLOYER_VACANCIES_QUERY = gql`
  ${vacancyFragment}
  query VacanciesList(
    $filter: VacancyFilterInput
    $sortBy: VacancySortingInput
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    employerVacancies(
      filter: $filter
      sortBy: $sortBy
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      __typename
      totalCount
      queryCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        __typename
        node {
          ...Vacancy
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

export const GET_MY_VACANCIES = gql`
  ${vacancyFragment}
  query MyVacancies {
    myVacancies {
      ...Vacancy
    }
    __type(name: "JobJobType") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const VACANCY_DETAIL_QUERY = gql`
  ${vacancyFragment}
  query VacancyDetail($id: ID!) {
    vacancy(id: $id) {
      ...Vacancy
    }
    __type(name: "JobJobType") {
      enumValues {
        name
        description
      }
    }
  }
`;
export const APPLICATION_DETAIL_QUERY = gql`
  query ApplicationDetail($id: ID!) {
    jobApplication(id: $id) {
      slug
      uuid
      createdAt
      updatedAt
      isDeleted
      isActive
      id
      inbuiltResume {
        id
      }
      extraAttachment
      applicant {
        id
        fullName
        email
        phone
        seeker {
          id
          location
        }
        avatar {
          url
          alt
        }
      }
      job {
        id
        title
        creator {
          id
          fullName
          email
          phone
          avatar {
            url
            alt
          }
        }
      }
      appliedOn
      resume
      budget
      comment
      status
      favourite
    }
  }
`;
