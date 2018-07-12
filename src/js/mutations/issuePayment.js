
import gql from 'graphql-tag';
export default gql`
mutation issuePayment(
  $requestId: String!, 
  $amountIssued: Int!, 
  $dateIssued:DateTime!){
    addServicePaymentIssue(
      requestId:$requestId,
       dateIssued: $dateIssued,
        amountIssued:$amountIssued)
    {
      id
    }
  }`;