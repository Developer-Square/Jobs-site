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
        recommended
        periodAmount
        renewalType
        collection
        setupAmount
        periodAmountMoney {
          amount
          currency
        }
        allPricing {
          id
          description
          isActive
          hasTrial
          recommended
          createdAt
          currency
          amount
          price {
            currency
            amount
          }
          periodType
          periodLength
          length
          renewalType
          allFeatures {
            id
            slug
            feature {
              slug
              createdAt
              updatedAt
              uuid
              isDeleted
              isActive
              id
              name
              description
              amount
              currency
              userType
              tag
              outOfTheBox
              limitFunction
              price {
                currency
                amount
              }
            }
            description
            isActive
            createdAt
            currency
            minCount
            maxCount
            amount
            price {
              currency
              amount
            }
          }
        }
      }
    }
  }
`;
export const planListsQuerytttttt = gql`
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
        recommended
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

export const planLiskjhkhkjhjktsQuery = gql`
  query {
    allPlanLists {
      id
      userType
      title
      allPlans {
        id
        title
        collection
        description
        isActive
        recommended
        isNotPriced
        createdAt
        packageType
        extraFeatures {
          slug
          createdAt
          updatedAt
          uuid
          isDeleted
          isActive
          id
          name
          description
          amount
          currency
          userType
          tag
          outOfTheBox
          limitFunction
          price {
            currency
            amount
          }
        }
        allPricing {
          id
          description
          isActive
          recommended
          createdAt
          currency
          amount
          price {
            currency
            amount
          }
          periodType
          periodLength
          length
          renewalType
          allFeatures {
            id
            slug
            feature {
              slug
              createdAt
              updatedAt
              uuid
              isDeleted
              isActive
              id
              name
              description
              amount
              currency
              userType
              tag
              outOfTheBox
              limitFunction
              price {
                currency
                amount
              }
            }
            description
            isActive
            createdAt
            currency
            minCount
            maxCount
            amount
            price {
              currency
              amount
            }
          }
        }
      }
    }
  }
`;
export const TypedPlanListsQuery = TypedQuery(planListsQuery);
