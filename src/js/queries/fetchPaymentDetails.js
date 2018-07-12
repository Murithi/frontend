import gql from 'graphql-tag';

export default gql`
query getPaymentDetails{
  paymentIssue(id: $id) {
    id,
    amountIssued
    requestedServicePayment{
      id
      issuedCash
      otherDetails
      vehicleToBeServiced{
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