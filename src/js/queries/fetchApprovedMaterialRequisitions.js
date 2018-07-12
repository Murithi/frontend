import gql from 'graphql-tag';

export default gql`
query approvedRequisitions{
    approvedMaterialRequisitionsFeed{
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
    paymentMode
    cashPaymentsDetails{
      id

    }
    otherPaymentDetails{
      id
    }
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
}
`;