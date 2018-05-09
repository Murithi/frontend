import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import { Link, Route } from 'react-router-dom';
import { Table, Grid, Message, Icon, Menu } from 'semantic-ui-react';
import Service_Requisition_Feed_Query from './queries/fetchServiceRequisitions';
class ServiceRequisitionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
            console.log(this.props.ServiceRequisitionFeed)
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
                    <p>Make a new requisitoin to get started.</p>
                    <Link to={'/createservicerequisition'} className="ui button primary">
                      Add New Requisition{' '}
                    </Link>
                  </Message.Content>
                </Message>
              );
          
              const timeoutMessage = (
                <Message icon negative>
                  <Icon name="wait" />
                  <Message.Content>
                    <Message.Header>{this.props.ServiceRequisitionFeed.errorl}</Message.Header>
                    Is the backend server running?
                  </Message.Content>
                </Message>
              );
              if (this.props.ServiceRequisitionFeed && this.props.ServiceRequisitionFeed.loading) {
                return <div>{loadingMessage}</div>;
              }
          
              if (this.props.ServiceRequisitionFeed && this.props.ServiceRequisitionFeed.error) {
                return <div>{timeoutMessage}</div>;
              }
          
              if (this.props.ServiceRequisitionFeed.ServiceRequisitionFeed !==[]) {
                return <div>{emptyMessage}</div>;
              }
              return (  
             <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reg. No</Table.HeaderCell>
              <Table.HeaderCell>Model</Table.HeaderCell>
              <Table.HeaderCell>Owner </Table.HeaderCell>
              <Table.HeaderCell> Edit</Table.HeaderCell>
              <Table.HeaderCell> Delete</Table.HeaderCell>
            </Table.Row>
                      </Table.Header>
                      <Table.Body>
                      </Table.Body>
              </Table>        
        )
    }
}
 
export default graphql(Service_Requisition_Feed_Query, {name:'ServiceRequisitionFeed'})(ServiceRequisitionsList);