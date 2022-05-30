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
    $job: ID!
    $resume: Upload
    $extraAttachment: Upload
    $comment: String
    $inbuiltResume: ID
  ) {
    createApplication(
      input: {
        status: $status
        isActive: $isActive
        isDeleted: $isDeleted
        job: $job
        resume: $resume
        comment: $comment
        extraAttachment: $extraAttachment
        inbuiltResume: $inbuiltResume
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      application {
        id
        status
        isActive
        isDeleted
        inbuiltResume {
          id
        }
        extraAttachment
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
    $comment: String
    $favourite: Boolean
    $employerComment: String
  ) {
    patchApplication(
      id: $id
      input: {
        status: $status
        comment: $comment
        favourite: $favourite
        employerComment: $employerComment
      }
    ) {
      __typename
      success
      application {
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
      errors {
        field
        message
      }
    }
  }
`;

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
    $isPublished: Boolean
    $applicationUrl: String!
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
        applicationUrl: $applicationUrl
        isPublished: $isPublished
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
        isPublished
        applicationUrl
        postedBy {
          id
          name
          logo {
            url
            alt
          }
        }
      }
    }
  }
`;

export const UPDATE_VACANCY_MUTATION = gql`
  mutation VacancyUpdate(
    $id: ID!
    $industry: ID
    $title: String
    $jobType: JobJobType
    $payRate: JobPayRate
    $minQualification: JobMinQualification
    $yearsOfExp: JobYearsOfExp
    $salary: Decimal
    $location: String
    $description: JSONString
    $positions: Int
    $closingDate: Date
    $applicationUrl: String
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
        applicationUrl: $applicationUrl
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
        applicationUrl
        location
        description
        positions
        closingDate
        createdAt
        applicationUrl
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

export const CREATE_SCREENING_QUESTION = gql`
  mutation CreateQuestion(
    $questionType: ScreeningQuestionQuestionType
    $job: ID!
    $question: String
    $required: Boolean
    $order: Int
    $idealAnswer: String
  ) {
    createScreeningQuestion(
      input: {
        questionType: $questionType
        job: $job
        question: $question
        required: $required
        order: $order
        idealAnswer: $idealAnswer
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      screeningQuestion {
        id
        isActive
        isDeleted
        job {
          id
          title
        }
        questionType
        question
        required
        order
        idealAnswer
      }
    }
  }
`;

export const CREATE_SCREENING_ANSWER = gql`
  mutation CreateAnswer(
    $application: ID!
    $applicant: ID
    $question: ID!
    $answer: String!
  ) {
    createScreeningAnswer(
      input: {
        application: $application
        applicant: $applicant
        question: $question
        answer: $answer
      }
    ) {
      __typename
      success
      errors {
        field
        message
      }
      screeningAnswer {
        id
        isActive
        isDeleted
        application {
          id
        }
        applicant {
          id
          fullName
        }
        question {
          id
          question
        }
        answer
      }
    }
  }
`;
