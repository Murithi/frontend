import gql from 'graphql-tag';
export default gql`
mutation approveRepairsRequisition($id:ID!, $approvalDate:DateTime!){
  approveRepairsRequistion(id:$id, approvalDate:$approvalDate){
    id
  }
}`;