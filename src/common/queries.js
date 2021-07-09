import gql from "graphql-tag";
import { TypedQuery } from "core/queries";

export const GET_INDUSTRIES = gql`
  query AllIndustries {
    allIndustries {
      name
      id
      icon
      backgroundImage {
        url
        alt
      }
      seoTitle
      seoDescription
      description
    }
  }
`;

export const TypedIndustriesQuery = TypedQuery(GET_INDUSTRIES);
