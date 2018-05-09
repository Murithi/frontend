import React, { Component } from 'react';
import { Form, Segment, Grid, Header, Message, Icon, List, Menu, Image, Divider, Button } from 'semantic-ui-react';
import _ from 'lodash';

import moment from 'moment';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';
import PersonnelDetailQuery from './queries/fetchPersonnelDetails';
import { Link } from 'react-router-dom';

const REACT_APP_CLOUD_NAME = 'https://res.cloudinary.com/murithi/image/upload/';
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

class PersonnelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let id = this.props.match.params.id;

    return (
      <Query query={PersonnelDetailQuery} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <div>{loadingMessage}</div>;
          if (error) return <div>{timeoutMessage}</div>;
          if (_.isEmpty(data)) return <div>{emptyMessage}</div>;
          console.log(data);
          return (
            
              <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 900 }}>
                  <Header as="h4" color="green" textAlign="center">
                    Personnel Details
                  </Header>
                  
                  
                  <Segment.Group horizontal>
                    <Segment>
                      <p>
                      <Image src={data.personnel.photoUrl} size="medium" centered /> 
                      
                      
                      </p>
                      <p>
                        <b>First Name:</b> {data.personnel.firstName}
                      </p>
                      <Divider />
                      <p>
                        <b>Gender:</b> {data.personnel.gender ? ' Male' : ' Female'}
                      </p>
                      <Divider />
                      <p>
                        <b>NSSF ID Number:</b> {data.personnel.nssfId}
                      </p>
                      <Divider />
                      <p>
                        <b>Designation:</b> {data.personnel.designation.roleName}
                      </p>
                      <Divider />
                      <p>
                        <b>Address:</b> {data.personnel.addressNo}
                      </p>
                      <Divider />
                      <p>
                        <b>Date of Employment:</b> {moment(data.personnel.dateOfEmployment).format('MMM Do YYYY')}
                      </p>
                      <Divider />
                      <p>
                        <b>Assigned Project:</b>{' '}
                        {data.personnel.dateOfTermination
                          ? moment(data.personnel.dateOfTermination).format('MMM Do YYYY')
                          : 'N/A'}
                      </p>
                      <Divider />
                      <p>
                        <b>Education Certificates:</b>

                        <Image src={data.personnel.certificatesUrl} size="medium" centered />
                        
                      </p>
                      <Divider />
                    

                  
                      <p>
                        <b>Last Name: </b> {data.personnel.lastName}
                      </p>
                      <Divider />
                      <p>
                        <b>ID Number:</b> {data.personnel.idNumber}
                      </p>
                      <Divider />
                      <p>
                        <b>NHIF ID Number:</b> {data.personnel.nhifId}
                      </p>
                      <Divider />
                      <p>
                        <b>Phone Number:</b> {data.personnel.phoneNumber}
                      </p>
                      <Divider />
                      <p>
                        <b>Location:</b> {data.personnel.location}
                      </p>
                      <Divider />
                      <p>
                        <b>Current Salary:</b> {data.personnel.currentSalary}
                      </p>
                      <Divider />
                      <p>
                        <b>Highest level of Education:</b> {data.personnel.highestEducationLevel}
                      </p>
                      <Divider />
                      <p>
                        <b>Curriculum Vitae:</b>
                        
                        <Image src={data.personnel.curriculumVitaeUrl} size="medium" centered />
                        
                      </p>
                      <Divider />
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid>
            
          );
        }}
      </Query>
    );
  }
}

export default PersonnelDetails;
