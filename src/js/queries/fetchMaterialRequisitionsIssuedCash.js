import gql from 'graphql-tag';

export default gql`
query getApprovedMaterialRequisitionsIssuedCash{
  paymentsFeedIssuedPayment{
    id
    amountIssued
    recieptNumber
    createdAt
    requestedMaterialsPayment{
      id
      requestedBy{
        personnelDetails{
          firstName
          lastName
        }
      }
      otherDetails
      approxCost
      materialType{
        materialName   
      }      
    }
  }
}
`;