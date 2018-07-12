
import gql from 'graphql-tag';
export default gql`
mutation issueRepairsPayment(
    $amountIssued:Int!,
    $requestId: String!,
    $dateIssued: DateTime!){
    addRepairsPaymentIssue(
        amountIssued: $amountIssued,
        requestId: $requestId,
        dateIssued: $dateIssued
){
    id
}
}
`;