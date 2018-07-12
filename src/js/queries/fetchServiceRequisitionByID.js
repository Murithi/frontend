import gql from 'graphql-tag';

export default gql`
query getServiceRequisition($id:ID!){
  initiatedRequisition(id:$id){
        id
    vehicleToBeServiced{
      registrationNumber
    }
    approxCostOFService
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    otherDetails
    approvalStatus
    createdAt
    approvalDate
  }
}

`;