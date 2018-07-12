import React, { Component } from 'react';
import { Header, Table, Grid, Message, Button, Input, Icon, Menu, Divider, Form, Segment, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import getRepairsRequisition from './queries/fetchRepairsRequisitionByID';
import addRepairsPaymentIssue from './mutations/issueRepairsPayment';
import getApprovedRequisitions from './queries/fetchRepairsRequisitionsApproved'


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
  
class IssueRepairsCash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amountRequested: '',
       }
    }
    render() { 
        let id = this.props.match.params.id;
        return (
            <Query query={getRepairsRequisition} variables={{ id }}>
            {({ loading, error, data:{initiatedRepairsRequisition} }) => {
            if (loading) return <div>{loadingMessage}</div>;
            if (error) return <div>{timeoutMessage}</div>;
            if (_.isEmpty(initiatedRepairsRequisition)) return <div>{emptyMessage}</div>;
               
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
                                        <Table.Cell>{initiatedRepairsRequisition.requestedBy.personnelDetails.firstName} &nbsp; {initiatedRepairsRequisition.requestedBy.personnelDetails.lastName}</Table.Cell>
                                        </Table.Row>  
                                        <Table.Row>
                                        <Table.Cell><b>Amount Requested </b></Table.Cell>
                                        <Table.Cell>{initiatedRepairsRequisition.approxCostOfRepair}</Table.Cell>
                                        </Table.Row> 
                                        <Table.Row>
                                        <Table.Cell><b>Date Requested </b></Table.Cell>
                                        <Table.Cell>{moment(initiatedRepairsRequisition.createdAt).format('MMM Do YYYY')} </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                        <Table.Cell><b>Date Approved </b></Table.Cell>
                                        <Table.Cell>{moment(initiatedRepairsRequisition.approvalDate).format('MMM Do YYYY')} </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                        <Table.Cell><b>Other Details </b></Table.Cell>
                                        <Table.Cell>{initiatedRepairsRequisition.otherDetails}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><b>Amount Issuing</b></Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                value={initiatedRepairsRequisition.approxCostOfRepair}
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
                                    onClick={()=>this._issueCash(initiatedRepairsRequisition.id, initiatedRepairsRequisition.approxCostOfRepair)}
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
        this.props.history.push('/repairsrequisitions/approved')
        
    }
}
 
export default graphql(addRepairsPaymentIssue, {name:'issuePayment'}) (IssueRepairsCash);