import gql from "graphql-tag";

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
