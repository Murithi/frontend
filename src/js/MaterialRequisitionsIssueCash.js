import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import moment from 'moment'
import { Message, Icon, Button, Grid, Divider, Segment, Header } from 'semantic-ui-react';
import getMaterialRequisition from './queries/fetchMaterialsRequestById';
import getApprovedRequisitions from './queries/fetchApprovedMaterialRequisitions'

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

class MaterialRequisitionsIssueCash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading :false,
         }
    }
    render() { 
        
            const { loading } = this.state;
            
            if (this.props.materialRequest.loading) {
                return <div>{loadingMessage}</div>            
            }
            if (this.props.materialRequest.loading) {
                return <div>{timeoutMessage}</div>
            }
            const { getMaterialRequisition } = this.props.materialRequest
            if (getMaterialRequisition.length === 0) {
                return <div>{emptyMessage}</div>
             }
        return (
                             <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                    <Header as="h4" color="green" textAlign="center">
                        Material Request Details
                    </Header>
                    <Segment.Group horizontal loading={loading}>
                        <Segment>
                                         
                        <React.Fragment>
                        <b>Material Requested:</b> {getMaterialRequisition.materialType.materialName}
                        </React.Fragment>
                        <Divider />   
                        <React.Fragment>
                        <b>Requested By:</b> {getMaterialRequisition.requestedBy.personnelDetails.firstName} {getMaterialRequisition.requestedBy.personnelDetails.lastName}
                        </React.Fragment>    
                        <Divider />  
                        <React.Fragment>
                        <b>Date Requested:</b> {moment(getMaterialRequisition.createdAt).format('MMM Do YYYY')}
                        </React.Fragment>    
                        </Segment>
                        <Segment>
                        <React.Fragment>
                        <b>Quantity Requested:</b> {getMaterialRequisition.quantity}
                        </React.Fragment>
                        <Divider />   
                        <React.Fragment>
                        <b>Approximate Cost:</b> {getMaterialRequisition.approxCost}
                        </React.Fragment>
                            <Divider />  
                            <Button
                                onClick={this._issueCash()}
                                fluid positive>Issue Cash</Button>
                        </Segment>
                       
                    </Segment.Group>
                    
            </Grid.Column>
            </Grid>
             )
          
    }

    _issueCash = async () => { 
        const { getMaterialRequisition } = this.props.materialRequest
        const id = this.props.match.params.id 
        const dateIssued = moment().format();
        const amountIssued = getMaterialRequisition.approxCost
        
        await this.props.issuePayment({
            variables: { requestId:id, amountIssued, dateIssued },
            refetchQueries: [{query: getApprovedRequisitions}]
        })
        this.props.history.push('/materialrequisitions/approved')
        
        
    }
    
}

const ADDMATERIALPAYMENTSMUTATION = gql`
mutation addMaterialsPaymentIssue( 
    $requestId:String!
    $amountIssued:Int!
    $dateIssued:DateTime!
    ){
  addMaterialsPaymentIssue(
    requestId:$requestId,
    amountIssued:$amountIssued,
    dateIssued:$dateIssued
  ){
    id
  }
}`
 
export default compose(
    graphql(getMaterialRequisition,
        {
            name: 'materialRequest',
            options: props => ({
                variables: {
                    id: props.match.params.id,
                }
            })
        }),
    graphql(ADDMATERIALPAYMENTSMUTATION,
        {
            name: 'issuePayment'
        }),
    
)(MaterialRequisitionsIssueCash);