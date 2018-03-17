import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Table } from 'semantic-ui-react';
import VehicleItem from './VehicleItem';
class Vehicle extends Component {
  state = {
    vehiclesToRender: []
  };
  render() {
    if (this.props.VehicleFeed && this.props.VehicleFeed.loading) {
      return <div>Loading</div>;
    }

    if (this.props.VehicleFeed && this.props.VehicleFeed.error) {
      return <div>Error</div>;
    }
    const recievedVehiclesToRender = this.props.VehicleFeed.vehicleFeed;

    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Reg. No</Table.HeaderCell>
            <Table.HeaderCell>Log Book No.</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Fuel Type</Table.HeaderCell>
            <Table.HeaderCell>Valuation </Table.HeaderCell>
            <Table.HeaderCell>Insurance Renewal </Table.HeaderCell>
            <Table.HeaderCell>Age </Table.HeaderCell>
            <Table.HeaderCell>Owner </Table.HeaderCell>
            <Table.HeaderCell> Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {recievedVehiclesToRender.map(Vehicle => (
            <VehicleItem
              key={Vehicle.id}
              registrationNumber={Vehicle.registrationNumber}
              logBookNumber={Vehicle.logBookNumber}
              model={Vehicle.model}
              fuelType={Vehicle.fuelType}
              insuranceValuation={Vehicle.insuranceValuation}
              insuranceRenewalDate={Vehicle.insuranceRenewalDate}
              age={Vehicle.age}
              owner={Vehicle.owner[0].name}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}

const Vehicle_Feed_Query = gql`
  query VehicleFeed {
    vehicleFeed {
      id
      registrationNumber
      logBookNumber
      model
      fuelType
      insuranceValuation
      insuranceRenewalDate
      age
      owner {
        id
        name
      }
    }
  }
`;
export default graphql(Vehicle_Feed_Query, { name: 'VehicleFeed' })(Vehicle);
