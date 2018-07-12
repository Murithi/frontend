import React, { Component } from 'react';
import { Header, Table, Grid, Message, Button, Input, Icon, Menu, Divider, Form, Segment, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import InlineError from './messages/InlineError';
import getPaymentDetails from './queries/fetchPaymentDetails';
import getApprovedRequisitions from './queries/fetchServiceRequisitionsIssuedCash';

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
        <Message.Header>No Payment with that ID Found</Message.Header>
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

class ReportCash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            errors: {},
            loading:false,
         }
    }
    validate = () => { 
        const errors = {};
    if (!this.state.amountCharged) errors.amountCharged = "Can't be blank";
    if (!this.state.recieptNumber) errors.recieptNumber = "Can't be blank";
    if (!this.state.amountReturned) errors.amountReturned = "Can't be blank";   
    if (Object.keys(errors).length === 0) {
        this.setState({ loading: true });
        this._addPaymentDetails();
      }
  
      return errors;
    }
    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
      };
    render() {
        let id = this.props.match.params.id;
        const { errors, loading } = this.state;
        return (
           
            <Query query={getPaymentDetails} variables={{ id }}>
                {({ loading, error, data: { paymentIssue } }) => {
                    if (loading) return <div>{loadingMessage}</div>;
                    if (error) return <div>{timeoutMessage}</div>;
                    if (_.isEmpty(paymentIssue)) return <div>{emptyMessage}</div>;
                    
                    return (
                        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Report Cash Usage
                    </Header>
                    <Segment.Group horizontal>
                            
                        <Segment>
                        <Divider />
                                <Table basic='very' celled >
                                            <Table.Body>
                                            <Table.Row>
                                            <Table.Cell><b>Requested By</b></Table.Cell>
                                            <Table.Cell>{paymentIssue.requestedServicePayment.requestedBy.personnelDetails.firstName} &nbsp; {paymentIssue.requestedServicePayment.requestedBy.personnelDetails.lastName}</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                        <Table.Cell><b>Amount Issued </b></Table.Cell>
                                        <Table.Cell>KES {paymentIssue.amountIssued}</Table.Cell>
                                                </Table.Row> 
                                                <Table.Row>
                                        <Table.Cell><b>Vehicle Serviced </b></Table.Cell>
                                        <Table.Cell>{paymentIssue.requestedServicePayment.vehicleToBeServiced.registrationNumber}</Table.Cell>
                                        </Table.Row>
                                                <Table.Row>
                                        <Table.Cell><b>Details </b></Table.Cell>
                                        <Table.Cell>{paymentIssue.requestedServicePayment.otherDetails}</Table.Cell>
                                        </Table.Row>        
                                            </Table.Body>
                                        </Table>   
                                        <Divider /> 
                                        <Form size="large" onSubmit={this.onSubmit} loading={loading}>
                                        {errors.global && (
                                            <Message negative>
                                            <Message.Header> Something went wrong </Message.Header>
                                            <p>{errors.global}</p>
                                            </Message>
                                            )}
                                            <Form.Field error={!!errors.amountCharged}>
                                            <label>Amount Charged</label>
                                            <input
                                                    
                                            type='number'        
                                            value={this.state.amountCharged}
                                            onChange={e => this.setState({ amountCharged: e.target.value })}
                                                /> 
                                                {errors.amountCharged && <InlineError text={errors.amountCharged} />}
                                            </Form.Field>
                                            <Form.Field error={!!errors.recieptNumber}>
                                            <label>Reciept/Invoice No. </label>
                                            <input
                                                    
                                                   
                                            value={this.state.recieptNumber}
                                            onChange={e => this.setState({ recieptNumber: e.target.value })}
                                                /> 
                                                {errors.recieptNumber && <InlineError text={errors.recieptNumber} />}
                                            </Form.Field>
                                            <Form.Field error={!!errors.amountReturned}>
                                            <label>Amount Returned</label>
                                            <input
                                                    
                                            type='number'        
                                            value={this.state.amountReturned}
                                            onChange={e => this.setState({ amountReturned: e.target.value })}
                                                /> 
                                                {errors.amountReturned && <InlineError text={errors.amountReturned} />}
                                            </Form.Field>
                                            <Form.Button fluid positive>Submit</Form.Button>
              </Form>                              
                        </Segment>
                        </Segment.Group>            
                    </Grid.Column>
                    </Grid>        
                    )
                }

                }
                </Query>
         )
    }
    _addPaymentDetails = async () => { 
        const {
            amountCharged,
            recieptNumber,
            amountReturned
        } = this.state;
        const id = this.props.match.params.id;
        const dateReported = moment().format();
        await this.props.addPaymentDetails({
            variables: {
                id,
                amountCharged,
                recieptNumber,
                amountReturned,
                dateReported
            },
            refetchQueries: [{ query: getApprovedRequisitions }]
        });
        this.props.history.push('/servicerequisitions/issued');
    }
}

const ADDPAYMENTDETAILSMUTATION = gql`
mutation addPaymentDetails($id:ID!, $amountCharged:Int!,
    $recieptNumber:String!, $amountReturned:Int!,
    $dateReported:DateTime!){
  reportPayments(id:$id, amountCharged:$amountCharged,
  recieptNumber:$recieptNumber, amountReturned:$amountReturned,
  dateReported:$dateReported){
    id
  }
}`
 
export default graphql(ADDPAYMENTDETAILSMUTATION, {name:'addPaymentDetails'}) (ReportCash);