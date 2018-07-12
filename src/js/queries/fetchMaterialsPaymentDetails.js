import gql from 'graphql-tag';

export default gql`
query getPaymentDetails($id:ID! ) {
    paymentIssue(id: $id) {
    id,
    amountIssued
    requestedMaterialsPayment{
      id
      approxCost
      otherDetails
      materialType{
        materialName
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