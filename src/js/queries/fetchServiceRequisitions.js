import gql from 'graphql-tag';

export default gql`
query serviceRequisitionFeed{
  serviceRequisitionFeed{
    id
    requestedBy{
      idNumber
      firstName
      lastName
    }
    vehicleToBeServiced{
      registrationNumber
    }
  	approvalStatus
    approvedBy {
      id
    }
    approxCost
    createdAt
    otherDetails
  }
}
`;