import gql from "graphql-tag";

export const GET_ONLINE_CHECKOUT = gql`
  query OnlineCheckout($id: ID!) {
    onlineCheckout(id: $id) {
      id
      phone
      amount
      checkoutRequestId
      accountReference
      customerMessage
      responseDescription
    }
  }
`;
export const GET_ONLINE_CHECKOUT_RESPONSE = gql`
  query OnlineCheckoutResponses($checkoutRequestId: String!) {
    onlineCheckoutResponses(checkoutRequestId: $checkoutRequestId) {
      id
      checkoutRequestId
      resultDescription
      mpesaReceiptNumber
    }
  }
`;
