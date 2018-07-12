import gql from 'graphql-tag'

export default gql`
query getVehicleInspection($id:ID!){
  initiatedVehicleInspection(id:$id){
    id
    vehicleToBeInspected{
      registrationNumber
    }
    approxCostOfInspection
    
    requestedBy{
      personnelDetails{
        firstName
        lastName
      }
    }
    createdAt
  }
}
`