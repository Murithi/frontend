import React, { Component } from 'react';
import { Header, Table, Grid, Message, Button, Input, Icon, Menu, Divider, Form, Segment, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import getServiceRequisition from './queries/fetchServiceRequisitionByID';
import addServicePaymentIssue from './mutations/issuePayment';
import getApprovedRequisitions from './queries/fetchServiceRequisitionsApproved'

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
        <Message.Header>No Personnel with that ID Found</Message.Header>
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
  
class IssueCash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amountRequested: '',
            errors: {},
            
         }
    }

    render() { 
       
        let id = this.props.match.params.id;
        return (
            <Query query={getServiceRequisition} variables={{ id }}>
            {({ loading, error, data:{initiatedRequisition} }) => {
            if (loading) return <div>{loadingMessage}</div>;
            if (error) return <div>{timeoutMessage}</div>;
            if (_.isEmpty(initiatedRequisition)) return <div>{emptyMessage}</div>;
                  
            return (
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Request Details
                    </Header>
                    <Segment.Group horizontal>
                            <Segment> 
                            <Divider />
                                <Table basic='very' celled >
                                    <Table.Body>
                                    <Table.Row>
                                        <Table.Cell><b>Requested By</b></Table.Cell>
                                        <Table.Cell>{initiatedRequisition.requestedBy.personnelDetails.firstName} &nbsp; {initiatedRequisition.requestedBy.personnelDetails.lastName}</Table.Cell>
                                        </Table.Row>  
                                        <Table.Row>
                                        <Table.Cell><b>Amount Requested </b></Table.Cell>
                                        <Table.Cell>{initiatedRequisition.approxCostOFService}</Table.Cell>
                                        </Table.Row> 
                                        <Table.Row>
                                        <Table.Cell><b>Date Requested </b></Table.Cell>
                                        <Table.Cell>{moment(initiatedRequisition.createdAt).format('MMM Do YYYY')} </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                        <Table.Cell><b>Date Approved </b></Table.Cell>
                                        <Table.Cell>{moment(initiatedRequisition.approvalDate).format('MMM Do YYYY')} </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                        <Table.Cell><b>Other Details </b></Table.Cell>
                                        <Table.Cell>{initiatedRequisition.otherDetails}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><b>Amount Issuing</b></Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                value={initiatedRequisition.approxCostOFService}
                                                onChange={e => { this.setState({ amountRequested: e.target.value }); }}
                                                type='number'
                                                    
                                            /></Table.Cell>    
                                            </Table.Row>
                                </Table.Body>
                                </Table>    
                       
                                <Divider /> 

                                
                                <Button
                                    attached='bottom'
                                    positive
                                    onClick={()=>this._issueCash(initiatedRequisition.id, initiatedRequisition.approxCostOFService)}
                                >Issue Cash</Button>
                                
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

    _issueCash = async (requestId, amountIssued) => {
       
        if (this.state.amountRequested !== '') { 
            amountIssued = this.state.amountRequested;
        }
        const dateIssued = moment().format();
        await this.props.issuePayment({
            variables: { requestId, amountIssued, dateIssued },
            refetchQueries: [{query: getApprovedRequisitions}]
        })
        this.props.history.push('/servicerequisitions/approved')
        
     }
}
 
export default graphql(addServicePaymentIssue, {name:'issuePayment'}) (IssueCash);