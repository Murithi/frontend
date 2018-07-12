import gql from 'graphql-tag'
export default gql`
  query getPaymentDetails($id:ID! ) {
    paymentIssue(id: $id) {
    id,
    amountIssued
    repairsRequisitionPayment{
      id
      issuedCash
      otherDetails
      vehicleToBeRepaired{
        registrationNumber
      }
      requestedBy{
        personnelDetails{
          firstName
          lastName
        }
      }
    }
  }
}`;

