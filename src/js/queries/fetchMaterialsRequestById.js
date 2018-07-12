import gql from 'graphql-tag'

export default gql`
query getMaterialRequisition($id:ID!){
  getMaterialRequisition(id:$id){
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
}`;