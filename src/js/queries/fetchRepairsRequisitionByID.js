import gql from 'graphql-tag';

export default gql`
query getRepairsRequisition($id:ID!){
  initiatedRepairsRequisition(id:$id){
    id
    vehicleToBeRepaired{
      registrationNumber
    }
    approxCostOfRepair
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    otherDetails
    approvalStatus
  }
}
`;