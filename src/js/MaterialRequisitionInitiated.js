import React, { Component, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import moment from 'moment'
import gql from 'apollo-boost';
import { Header, Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';

import InitiatedMaterialRequisitionQuery from './queries/fetchMaterialRequisitionInitiated';
import getUserDetails from './queries/getUserDetails';

class MaterialRequistionInitiated extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
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
                <p>Add some new Requisitions to get started.</p>
                <Link to={'/repairsrequisitions/new'} className="ui button primary">
                  Add New Requisition{' '}
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
    
        if (this.props.requisitionFeed.initiatedMaterialRequisitionsFeed === undefined ||this.props.requisitionFeed.initiatedMaterialRequisitionsFeed.length === 0) {
        return <div>{emptyMessage}</div>;
        }
       
        return ( 
            <Fragment>
            <Header as="h4" color="green" textAlign="center">
            Initiated Service Requisitions List
            </Header>
                <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Material</Table.HeaderCell>
                    <Table.HeaderCell> Supplier</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Cost </Table.HeaderCell>
                    <Table.HeaderCell> Requested By</Table.HeaderCell>  
                    <Table.HeaderCell> Date Requested </Table.HeaderCell>            
                    <Table.HeaderCell>Approval Status</Table.HeaderCell>    
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.requisitionFeed.initiatedMaterialRequisitionsFeed.map(request => (
                            <Table.Row>
                            <Table.Cell>{request.materialType.materialName}</Table.Cell>
                                <Table.Cell>{request.proposedSupplier.supplierName}</Table.Cell>
                                <Table.Cell>{request.quantity}</Table.Cell>
                                <Table.Cell>{request.approxCost}</Table.Cell>
                                <Table.Cell>{request.requestedBy.personnelDetails.firstName} {request.requestedBy.personnelDetails.lastName}</Table.Cell>
                                <Table.Cell>{moment(request.createdAt).format('MMM Do YYYY')}</Table.Cell>
                                <Table.Cell>
                                    {(() => {
                                       
                                        if (request.approvalStatus===true) {
                                        return <Icon name='checkmark ' />
                                        
                                        } else {
                                        if (this.props.userDetails.me.role === 'DIRECTOR') {
                                            return (
                                            <Link to={`/materialrequisitions/approve/${request.id}`}>
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
                        )
                        )

                        }
                    </Table.Body>
                    
                </Table>    
            </Fragment>
         )
    }
}
 
export default compose(
    graphql(InitiatedMaterialRequisitionQuery, { name: 'requisitionFeed' }),
    graphql(getUserDetails, {name:'userDetails'}),
) (MaterialRequistionInitiated);