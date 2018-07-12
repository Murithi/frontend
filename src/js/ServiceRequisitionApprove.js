import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Header, Table, Grid, Message, Button, Icon, Menu, Divider, Form, Segment, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Link, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import getServiceRequisition from './queries/fetchServiceRequisitionByID';
import approveServiceRequisition from './mutations/approveServiceRequisition';
import InitiatedRequisitionsQuery from './queries/fetchServiceRequisitionByUser'

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
        <Message.Header>No Requisition with that ID Found</Message.Header>
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
  
class ServiceRequisitionApprove extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        // console.log(moment().format())
        let id = this.props.match.params.id;
        
        return (
            <Query query={getServiceRequisition} variables={{ id }}>
            {({ loading, error, data: { initiatedRequisition } }) => {
          if (loading) return <div>{loadingMessage}</div>;
          if (error) return <div>{timeoutMessage}</div>;
          if (_.isEmpty(initiatedRequisition)) return <div>{emptyMessage}</div>;
            
            return (
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Service Request Details
                    </Header>
                    <Segment.Group horizontal>
                        <Segment>   
                        <p>
                        <b>Vehicle Registration:</b> {initiatedRequisition.vehicleToBeServiced.registrationNumber}
                        </p>
                        <Divider/>
                        <p>
                        <b>Approx Cost of Service:</b> {initiatedRequisition.approxCostOFService}
                      </p>          
                                <Divider />
                                <p>
                        <b>Other Details:</b> {initiatedRequisition.otherDetails}
                      </p>          
                                <Divider /> 
                                <p>
                        <b>Requested By:</b> {initiatedRequisition.requestedBy.personnelDetails.firstName} &nbsp; {initiatedRequisition.requestedBy.personnelDetails.lastName}
                      </p>          
                                <Divider /> 
                                <p>
                        <b>Requested On:</b> {moment(initiatedRequisition.createdAt).format('MMM Do YYYY')} 
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
                }}
                    
            </Query>
            
         )
    }

    _approveRequest = async() => {
      const id = this.props.match.params.id;
      const approvalDate = moment().format();
        await this.props.approveServiceRequisition({
            variables:{id, approvalDate},
            refetchQueries: [{ query: InitiatedRequisitionsQuery }]
        })
        this.props.history.push('/servicerequisitions/initiated');
    }
}
 
export default graphql(approveServiceRequisition, { name: 'approveServiceRequisition'}) (ServiceRequisitionApprove) ;
