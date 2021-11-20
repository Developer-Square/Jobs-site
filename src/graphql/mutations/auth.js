import { TypedMutation } from "core/mutations";
import gql from "graphql-tag";

export const SOCIAL_AUTH_GOOGLE = gql`
  mutation GoogleSocialLogin($accessToken: String) {
    googleSocialLogin(input: { accessToken: $accessToken }) {
      success
      refreshToken
      token
      user {
        id
        email
      }
      errors {
        field
        message
      }
    }
  }
`;

export const TypedGoogleAuthMutation = TypedMutation(SOCIAL_AUTH_GOOGLE);
