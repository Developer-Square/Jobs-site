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
      applicant {
        id
        fullName
        email
        phone
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
    }
    __type(name: "ApplicationStatus") {
      enumValues {
        description
        name
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

export const JobMinQualification = gql`
  query JobMinQualification {
    __type(name: "JobMinQualification") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const JobYearsOfExp = gql`
  query JobYearsOfExp {
    __type(name: "JobYearsOfExp") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const JobJobType = gql`
  query JobJobType {
    __type(name: "JobJobType") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const JobPayRate = gql`
  query JobPayRate {
    __type(name: "JobPayRate") {
      enumValues {
        name
        description
      }
    }
  }
`;
