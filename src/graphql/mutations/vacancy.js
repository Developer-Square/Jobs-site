import gql from "graphql-tag";

export const VACANCY_VIEW_COUNT_MUTATION = gql`
  mutation ViewJob($job: ID!) {
    viewVacancy(input: { job: $job }) {
      errors {
        field
        message
      }
      success
      vacancyErrors {
        field
        code
        message
      }
      viewedJob {
        slug
        uuid
        createdAt
        updatedAt
        isDeleted
        isActive
        id
        job {
          id
          title
        }
        user {
          id
          fullName
          email
        }
      }
    }
  }
`;
export const BOOKMARK_VACANCY = gql`
  mutation BookmarkJob($job: ID!) {
    bookmarkVacancy(input: { job: $job }) {
      errors {
        field
        message
      }
      success
      vacancyErrors {
        field
        code
        message
      }
      bookmarkedJob {
        slug
        uuid
        createdAt
        updatedAt
        isDeleted
        isActive
        id
        job {
          id
          title
        }
        user {
          id
          fullName
          email
        }
        bookmarked
      }
    }
  }
`;

export const CREATE_APPLICATION = gql`
  mutation CreateApplication(
    $status: ApplicationStatus
    $isActive: Boolean
    $isDeleted: Boolean
    $applicant: ID
    $job: ID!
    $resume: Upload
    $budget: String
    $comment: String
  ) {
    createApplication(
      input: {
        status: $status
        isActive: $isActive
        isDeleted: $isDeleted
        applicant: $applicant
        job: $job
        resume: $resume
        budget: $budget
        comment: $comment
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      application {
        status
        isActive
        isDeleted
        applicant {
          id
          email
          fullName
        }
        job {
          id
          title
        }
        appliedOn
        resume
        budget
        comment
      }
    }
  }
`;

export const UPDATE_APPLICATION = gql`
  mutation PatchApplication(
    $id: ID!
    $status: ApplicationStatus
    $isActive: Boolean
    $isDeleted: Boolean
    $applicant: ID
    $job: ID
    $resume: Upload
    $budget: String
    $comment: String
  ) {
    patchApplication(
      id: $id
      input: {
        status: $status
        resume: $resume
        budget: $budget
        comment: $comment
      }
    ) {
      __typename
      success
      application {
        status
        isActive
        isDeleted
        applicant {
          id
          email
          fullName
        }
        job {
          id
          title
        }
        appliedOn
        resume
        budget
        comment
      }
      errors {
        field
        message
      }
    }
  }
`;
