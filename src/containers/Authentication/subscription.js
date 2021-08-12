import gql from "graphql-tag";

export const ONTRANSACTION_MESSAGE = gql`
subscription Transaction($transactionId: String){
    onTransactionMessage(transactionId: $transactionId) {
      transactionId
      payment
      data
    }
  }
`