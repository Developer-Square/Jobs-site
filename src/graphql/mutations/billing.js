import { TypedMutation } from "core/mutations";
import gql from "graphql-tag";

export const MAKE_PAYMENT = gql`
  mutation onlinePayment(
    $billingPhone: String
    $amount: PositiveDecimal
    $planId: ID!
  ) {
    makePayment(
      planId: $planId
      input: { billingPhone: $billingPhone, amount: $amount }
    ) {
      success
      onlineCheckout {
        id
        phone
        amount
        isPaybill
        checkoutRequestId
        planId
        accountReference
        transactionDescription
        customerMessage
        merchantRequestId
        responseCode
        responseDescription
        dateAdded
      }
    }
  }
`;

export const TypedMakePayment = TypedMutation(MAKE_PAYMENT);
export const TypedPayment = TypedMutation(MAKE_PAYMENT);
