import gql from "graphql-tag";
import { simpleResumeFragment } from "graphql/fragments";

export const DUPLICATE_RESUME = gql`
  ${simpleResumeFragment}
  mutation DuplicateResume($id: ID!) {
    duplicateResume(resumeId: $id) {
      __typename
      success
      resume {
        ...Resume
      }
      errors {
        field
        message
      }
    }
  }
`;

export const DELETE_RESUME = gql`
  mutation ResumeDelete($id: ID!) {
    resumeDelete(id: $id) {
      __typename
      success
      found
      errors {
        field
        message
      }
      deletedRawId
      deletedId
    }
  }
`;

export const RESUME_MUTATION = gql`
  ${simpleResumeFragment}
  mutation ResumeCreate($name: String!) {
    resumeCreate(input: { name: $name }) {
      __typename
      success
      errors {
        field
        message
      }
      resume {
        ...Resume
      }
    }
  }
`;

export const RESUME_UPDATE_MUTATION = gql`
  ${simpleResumeFragment}
  mutation ResumeUpdate($id: ID!, $name: String!) {
    resumePatch(id: $id, input: { name: $name }) {
      __typename
      success
      errors {
        field
        message
      }
      resume {
        ...Resume
      }
    }
  }
`;
