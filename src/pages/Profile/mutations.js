import { TypedMutation } from "core/mutations";
import gql from "graphql-tag";

export const BASE_PROFILE_MUTATION = gql`
  mutation UpdateAccount($firstName: String!, $lastName: String!) {
    updateAccount(input: { firstName: $fullName, lastName: $lastName }) {
      success
      errors
    }
  }
`;

export const TypedBaseProfileMutation = TypedMutation(BASE_PROFILE_MUTATION);

export const accountErrorFragment = gql`
  fragment AccountErrorFragment on AccountError {
    code
    field
  }
`;
const AVATAR_UPDATE_MUTATION = gql`
  ${accountErrorFragment}
  mutation AvatarUpdate($image: Upload!) {
    userAvatarUpdate(image: $image) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
      success
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;
export const TypedAvatarUpdateMutation = TypedMutation(AVATAR_UPDATE_MUTATION);
