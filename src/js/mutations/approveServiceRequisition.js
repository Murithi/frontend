import gql from 'graphql-tag';
export default gql`
mutation approveServiceRequisition($id:ID!, $approvalDate:DateTime!){
  approveServiceRequisitionById(id:$id, approvalDate:$approvalDate){
      id
    }
  }`;