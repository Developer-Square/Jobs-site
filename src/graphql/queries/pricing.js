import gql from "graphql-tag";
import { TypedQuery } from "core/queries";

export const planListsQuery = gql`
  query {
    allPlanLists {
      id
      userType
      title
      allPlans {
        id
        title
        description
        periodType
        periodAmount
        renewalType
        collection
        setupAmount
        periodAmountMoney {
          amount
          currency
        }
      }
    }
  }
`;

export const TypedPlanListsQuery = TypedQuery(planListsQuery);
