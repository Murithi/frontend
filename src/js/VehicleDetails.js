import React, { Component } from 'react';
import { Form, Table, Segment, Grid, Header, Message, Icon, List, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { Query } from 'react-apollo';
import VehicleDetailQuery from './queries/fetchVehicleDetails';

const loadingMessage = (
  <Message icon info>
    <Icon name="circle notched" loading />
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      We are fetching that content for you.
    </Message.Content>
  </Message>
);

const emptyMessage = (
  <Message icon info>
    <Icon name="warning circle" />
    <Message.Content>
      <Message.Header>No Vehicle Owners with that ID Found</Message.Header>
    </Message.Content>
  </Message>
);

const timeoutMessage = (
  <Message icon negative>
    <Icon name="wait" />
    <Message.Content>
      <Message.Header>Error Processing Request</Message.Header>
      Is the backend server running?
    </Message.Content>
  </Message>
);

const VehicleDetails = props => {
  let id = props.match.params.id;

  return (
    <Query query={VehicleDetailQuery} variables={{ id }}>
      {({ loading, error, data: { vehicle } }) => {
        if (loading) return <div>{loadingMessage}</div>;
        if (error) return <div>{timeoutMessage}</div>;
        if (_.isEmpty(vehicle)) return <div>{emptyMessage}</div>;
        return (
          <div>
            <Link to={'/vehicles/list'}>
              {' '}
              <Icon name="reply" /> Back{' '}
            </Link>

            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 600 }}>
                <Header as="h4" color="green" textAlign="center">
                  Vehicle Owner Details
                </Header>
                <Segment>
                  <Table basic="very">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Registration Number</Table.Cell>
                        <Table.Cell>{vehicle.registrationNumber}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Log Book Number</Table.Cell>
                        <Table.Cell>{vehicle.logBookNumber}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Vehicle Model</Table.Cell>
                        <Table.Cell>{vehicle.model}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Vehicle Fuel Type</Table.Cell>
                        <Table.Cell>{vehicle.fuelType}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Vehicle Insurance Valuation</Table.Cell>
                        <Table.Cell>{vehicle.insuranceValuation}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Vehicle Insurance Renewal Date</Table.Cell>
                        <Table.Cell>{moment(vehicle.insuranceRenewalDate, 'YYYYMMDD').fromNow()}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Vehicle Manufacture Date</Table.Cell>
                        <Table.Cell>{moment(vehicle.manufactureDate, 'YYYYMMDD').fromNow()}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Vehicle Ower</Table.Cell>
                        <Table.Cell>{vehicle.owner.name}}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>''</Table.Cell>
                        <Table.Cell>''</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Segment>
              </Grid.Column>
            </Grid>
          </div>
        );
      }}
    </Query>
  );
};

export default VehicleDetails;
