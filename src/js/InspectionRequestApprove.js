import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Header, Table, Grid, Message, Button, Icon, Menu, Divider, Form, Segment, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Link, Route } from 'react-router-dom';
import { Query } from 'react-apollo';

import InitiatedRequisitionsQuery from './queries/fetchInspectionRequestsInitiated'
import getInspectionRequisition from './queries/fetchInspectionRequestById'

const loadingMessage = (<Message icon info>
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
      <Message.Header>No Request with that ID Found</Message.Header>
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

class InspectionRequestApprove extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { loading } = this.state;
        console.log(this.props)
        if (this.props.inspectionRequest.loading) {
            return <div>{loadingMessage}</div>            
        }
        if (this.props.inspectionRequest.loading) {
            return <div>{timeoutMessage}</div>
        }
        const { initiatedVehicleInspection } = this.props.inspectionRequest
        if (initiatedVehicleInspection.length === 0) {
            return <div>{emptyMessage}</div>
         }
        return (
                        
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Inspection Request Details
                    </Header>
                    <Segment.Group horizontal>
                        <Segment>   
                        <p>
                        <b>Vehicle Registration:</b> {initiatedVehicleInspection.vehicleToBeInspected.registrationNumber}
                        </p>
                        <Divider/>
                        <p>
                        <b>Approx Cost of Service:</b> {initiatedVehicleInspection.approxCostOfInspection}
                      </p>          
                                <Divider />
                                <p>
                        <b>Other Details:</b> {initiatedVehicleInspection.otherDetails}
                      </p>          
                                <Divider /> 
                                <p>
                        <b>Requested By:</b> {initiatedVehicleInspection.requestedBy.personnelDetails.firstName} &nbsp; {initiatedVehicleInspection.requestedBy.personnelDetails.lastName}
                      </p>          
                                <Divider /> 
                                <p>
                        <b>Requested On:</b> {moment(initiatedVehicleInspection.createdAt).format('MMM Do YYYY')} 
                      </p>          
                                <Divider /> 
                                
                                <Button
                                    attached='bottom'
                                    positive
                                    onClick={()=>this._approveRequest()}
                                >Approve</Button>
                                
                        </Segment>                        
                        </Segment.Group>
                        <Divider />
                       
                </Grid.Column>
            </Grid>
          );
    }
    _approveRequest = async () => {
        const id = this.props.match.params.id;
        const approvalDate = moment().format();
          await this.props.approveInspectionRequests({
              variables:{id, approvalDate},
              refetchQueries: [{ query: InitiatedRequisitionsQuery }]
          })
          this.props.history.push('/inspectionrequisitions/initiated');
      
    }
}

const APPROVEMUTATION = gql`
mutation approveInspection($id: ID!, $approvalDate:DateTime!){
    approveVehicleInspection(id:$id, 
      approvalDate:$approvalDate){
      id
    }
  }`
export default compose(
    graphql(getInspectionRequisition,
        {
            name: 'inspectionRequest',
            options: props => ({
                variables: {
                    id: props.match.params.id,
                    
                }
            })
        }),
    graphql(APPROVEMUTATION,
        {
            name:'approveInspectionRequests'
        })
    )
    (InspectionRequestApprove);