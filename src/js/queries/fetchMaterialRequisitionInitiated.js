import { gql } from 'apollo-boost'

export default gql`
query getInitiatedMaterialRequisitions{
  initiatedMaterialRequisitionsFeed{
    id
    materialType{
      
      materialName
    }
    proposedSupplier{
      supplierName
    }
    quantity
    approvalDate
    approxCost
    approvalDate
    approvalStatus
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    requestApprovedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    createdAt
    
  }
}
`;