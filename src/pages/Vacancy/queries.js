import { TypedQuery } from "core/queries";
import gql from "graphql-tag";

export const VACANCY_DETAIL_QUERY = gql`
  query VacancyDetail($id: ID!) {
    vacancy(id: $id) {
      __typename
      id
      title
      jobType
      description
      jobType
      minQualification
      positions
      yearsOfExp
      salary
      applicationEmail
      payRate
      closingDate
      location
      createdAt
      isActive
      creator {
        id
        fullName
        socials {
          id
          network
          link
          username
        }
      }
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
    __type(name: "JobJobType") {
      enumValues {
        name
        description
      }
    }
  }
`;

export const TypedVacancyDetailQuery = TypedQuery(VACANCY_DETAIL_QUERY);

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

export const TypedJobMinQualificationQuery = TypedQuery(JobMinQualification);

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

export const TypedJobYearsOfExpQuery = TypedQuery(JobYearsOfExp);

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

export const TypedJobJobTypeQuery = TypedQuery(JobJobType);

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

export const TypedJobPayRateQuery = TypedQuery(JobPayRate);
