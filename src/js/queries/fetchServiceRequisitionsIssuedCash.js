import gql from 'graphql-tag';

export default gql`
    query getApprovedRequisitionsIssuedPayment{
  paymentsFeedIssuedPayment{
    id
    amountIssued
    recieptNumber
    createdAt
    requestedServicePayment{
      id
      requestedBy{
        personnelDetails{
          firstName
          lastName
        }
      }
      otherDetails
      approxCostOFService
      vehicleToBeServiced{
        registrationNumber   
      }      
    }
  }
}
`;