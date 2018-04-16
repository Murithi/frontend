import gql from 'graphql-tag';
export default gql`
  query getVehicleDetailsQuery($id: ID!) {
    vehicle(id: $id) {
      id

      registrationNumber
      logBookNumber
      model
      fuelType
      manufactureDate
      insuranceValuation
      insuranceRenewalDate
      owner {
        id
        name
      }
    }
  }
`;
