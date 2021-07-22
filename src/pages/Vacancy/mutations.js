import { TypedMutation } from "core/mutations";
import gql from "graphql-tag";

export const CREATE_VACANCY_MUTATION = gql`
  mutation VacancyCreate(
    $industry: ID!
    $title: String!
    $jobType: JobJobType
    $minQualification: JobMinQualification
    $payRate: JobPayRate
    $yearsOfExp: JobYearsOfExp
    $salary: Decimal
    $location: String
    $description: JSONString
    $positions: Int
    $closingDate: Date
    $applicationEmail: String!
  ) {
    createVacancy(
      input: {
        industry: $industry
        title: $title
        jobType: $jobType
        minQualification: $minQualification
        payRate: $payRate
        yearsOfExp: $yearsOfExp
        salary: $salary
        location: $location
        description: $description
        positions: $positions
        closingDate: $closingDate
        applicationEmail: $applicationEmail
      }
    ) {
      __typename
      success
      job {
        id
        title
        jobType
        minQualification
        yearsOfExp
        salary
        payRate
        location
        description
        positions
        closingDate
        createdAt
        applicationEmail
        postedBy {
          id
          name
          logo {
            url
            alt
          }
        }
      }
      vacancyErrors {
        message
        field
        code
      }
    }
  }
`;

export const TypedVacancyCreateMutation = TypedMutation(
  CREATE_VACANCY_MUTATION,
);
export const UPDATE_VACANCY_MUTATION = gql`
  mutation VacancyUpdate(
    $id: ID!
    $industry: ID
    $title: String
    $jobType: JobJobType
    $payRate: JobPayRate
    $minQualification: JobMinQualification
    $yearsOfExp: JobYearsOfExp
    $salary: Int
    $location: String
    $description: JSONString
    $positions: Int
    $closingDate: Date
    $applicationEmail: String
  ) {
    patchVacancy(
      id: $id
      input: {
        title: $title
        industry: $industry
        jobType: $jobType
        minQualification: $minQualification
        yearsOfExp: $yearsOfExp
        salary: $salary
        payRate: $payRate
        location: $location
        description: $description
        positions: $positions
        closingDate: $closingDate
        applicationEmail: $applicationEmail
      }
    ) {
      __typename
      success
      job {
        id
        title
        jobType
        minQualification
        yearsOfExp
        salary
        payRate
        applicationEmail
        location
        description
        positions
        closingDate
        createdAt
        applicationEmail
        postedBy {
          id
          name
          logo {
            url
            alt
          }
        }
      }
      vacancyErrors {
        message
        field
        code
      }
    }
  }
`;

export const TypedVacancyUpdateMutation = TypedMutation(
  UPDATE_VACANCY_MUTATION,
);
