import { TypedMutation } from "core/mutations";
import gql from "graphql-tag";

export const BASE_PROFILE_MUTATION = gql`
  mutation VerifyAccount($token: String!) {
    verifyAccount(input: { token: $token }) {
      success
      errors
    }
  }
`;

export const TypedBaseProfileMutation = TypedMutation(BASE_PROFILE_MUTATION);
