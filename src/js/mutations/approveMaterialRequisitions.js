import gql from 'graphql-tag'

export default gql`
mutation approveMaterials($id: ID!
$approvalDate: DateTime!)
{
  approveMaterialRequisition(
    id:$id,
    approvalDate:$approvalDate
  ){
    id
  }
}
`;