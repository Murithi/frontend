import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link, Route } from 'react-router-dom';

import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';
import moment from 'moment';
import gql from 'graphql-tag';
import InitiatedRequisitionsQuery from './queries/fetchServiceRequisitionByUser'
import getUserDetails from './queries/getUserDetails';


class ServiceRequisitionsInitiated extends Component {
  constructor(props) {
    super(props)
        
  }
 
  render() { 
   
      
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
                <Message.Header>No Sections Found</Message.Header>
                <p>Add some new sections to get started.</p>
                <Link to={'/sections/new'} className="ui button primary">
                  Add New Section{' '}
                </Link>
              </Message.Content>
            </Message>
          );
      
        const timeoutMessage = (
            <Message icon negative>
                <Icon name="wait" />
                <Message.Content>
                    <Message.Header>{this.props.requisitionFeed.errorl}</Message.Header>
                    Is the backend server running?
              </Message.Content>
            </Message>
        );
        if (this.props.requisitionFeed && this.props.requisitionFeed.loading) {
            return <div>{loadingMessage}</div>;
          }
      
          if (this.props.requisitionFeed && this.props.requisitionFeed.error) {
            return <div>{timeoutMessage}</div>;
          }
      
          if (this.props.requisitionFeed.InitiatedRequisitionsFeed === undefined ||this.props.requisitionFeed.InitiatedRequisitionsFeed === 0) {
            return <div>{emptyMessage}</div>;
          }
        return ( 
            <React.Fragment>
                <Header as="h4" color="green" textAlign="center">
                    Initiated Service Requisitions List
                </Header>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Vehicle Registration No</Table.HeaderCell>
                        <Table.HeaderCell> Approximate Cost</Table.HeaderCell>
                        <Table.HeaderCell>Requested By</Table.HeaderCell>
                        <Table.HeaderCell>Other Details </Table.HeaderCell>
                        <Table.HeaderCell> Approval Status</Table.HeaderCell>    
                        
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    </Table.Body>
                    {
                        this.props.requisitionFeed.InitiatedRequisitionsFeed.map(request => (
                            <Table.Row>
                                <Table.Cell>{request.vehicleToBeServiced.registrationNumber}</Table.Cell>
                                <Table.Cell>{request.approxCostOFService}</Table.Cell>
                                <Table.Cell>{request.requestedBy.personnelDetails.firstName}</Table.Cell>
                                <Table.Cell>{request.otherDetails}</Table.Cell>
                                <Table.Cell>
                      {(() => {
                        if (request.approvalStatus) {
                          return <Icon name='checkmark ' />
                          
                        } else {
                          if (this.props.userDetails.me.role === 'DIRECTOR') {
                            return (
                              <Link to={`/servicerequisitions/approve/${request.id}`}>
                                Approve
                              <Icon name="angle double right" />
                              </Link>
                            )
                          } else {
                            return <Icon name='remove ' />
                          }
                        }
                      }
                      )()
                      }
                       
                                </Table.Cell>
                                </Table.Row>
                        ))
                    }
                    <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Link to={'/servicerequisitions/new'}>
                  <Icon name="add circle green " size="huge" />
                </Link>

                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
                </Table>
            </React.Fragment>
         )
    }
}
 
export default compose(
  graphql(InitiatedRequisitionsQuery, { name: 'requisitionFeed' }),
  graphql(getUserDetails, {name: 'userDetails' }),
)(ServiceRequisitionsInitiated);