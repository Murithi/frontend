import gql from 'graphql-tag';

export default gql`
  query getApprovedRequisitionsIssuedPayment{
  paymentsFeedIssuedPayment{
    id
    amountIssued
    recieptNumber
    createdAt
    repairsRequisitionPayment{
      id
      requestedBy{
        personnelDetails{
          firstName
          lastName
        }
      }
      otherDetails
      approxCostOfRepair
      vehicleToBeRepaired{
        registrationNumber   
      }      
    }
  }
}`;