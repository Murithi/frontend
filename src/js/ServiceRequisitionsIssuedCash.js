import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link, Route } from 'react-router-dom';

import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';
import moment from 'moment';
import gql from 'graphql-tag';
import getApprovedRequisitions from './queries/fetchServiceRequisitionsIssuedCash';
import getUserDetails from './queries/getUserDetails';


class ServiceRequisitionsIssuedCash extends Component {
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
                <Message.Header>No Requisitions Found</Message.Header>
                <p>Add some new requisitions to get started.</p>
               
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
      
          if (this.props.requisitionFeed.paymentsFeedIssuedPayment === undefined ||this.props.requisitionFeed.paymentsFeedIssuedPayment === 0) {
            return <div>{emptyMessage}</div>;
          }
        return ( 
            <React.Fragment>
                <Header as="h4" color="green" textAlign="center">
                    Service Requisitions Issued Cash
                </Header>
                <Table celled selectable>
                    <Table.Header>
                <Table.Row>
                  
                        <Table.HeaderCell>Vehicle Registration No</Table.HeaderCell>
                        <Table.HeaderCell>Requested By</Table.HeaderCell>
                        <Table.HeaderCell>Other Details </Table.HeaderCell>
                        <Table.HeaderCell> Amount Issued</Table.HeaderCell>
                        <Table.HeaderCell>Date Issued</Table.HeaderCell>                      
                        <Table.HeaderCell> Process</Table.HeaderCell>    
                        
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    </Table.Body>
                    {
                this.props.requisitionFeed.paymentsFeedIssuedPayment.map(request => {
                  if (request.requestedServicePayment !== null) {
                    return (
                            
                      <Table.Row>
                        <Table.Cell>{request.requestedServicePayment.vehicleToBeServiced.registrationNumber}</Table.Cell>
                        <Table.Cell>{request.requestedServicePayment.requestedBy.personnelDetails.firstName}  {request.requestedServicePayment.requestedBy.personnelDetails.lastName}</Table.Cell>
                        <Table.Cell>{request.requestedServicePayment.otherDetails}</Table.Cell>
                        <Table.Cell>{request.amountIssued}</Table.Cell>
                        <Table.Cell>{moment(request.createdAt).format('MMM Do YYYY')}</Table.Cell>
                                            
                                
                        <Table.Cell>
                          {(() => {
                        
                            if (this.props.userDetails.me.role === 'ACCOUNTANT') {
                              return (
                                <Link to={`/servicerequisitions/report/${request.id}`}>
                                  Report Cash Usage
                              <Icon name="angle double right" />
                                </Link>
                              )
                            } else {
                              return <Icon name='checkmark ' />
                            }
                        
                          }
                          )()
                          }
                       
                        </Table.Cell>
                    
                      </Table.Row>
                    )
                  }
                })
                    }
                    <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
               

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
  graphql(getApprovedRequisitions, { name: 'requisitionFeed' }),
  graphql(getUserDetails, {name: 'userDetails' }),
)(ServiceRequisitionsIssuedCash);