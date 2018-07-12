import gql from 'graphql-tag';

export default gql`
query InitiatedRequisitionsFeed{
  initiatedRepairsRequisitionsFeed{
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