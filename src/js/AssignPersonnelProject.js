import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Grid, Header } from 'semantic-ui-react';
import SearchPersonnelAssign from './SearchPersonnelAssign';
var personnelOptions = [];
var projectOptions = [];
class AssignPersonnelProject extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: '',
            personnelvalue: '',
            personnelID:'',
            projectAssignedTo: '',            
            projectValue: '',
            sections: {},
            errors: {},
            loading:false
         }
    }
    setValue = (e, data) => {
        
        personnelOptions.forEach(element => {
            if (element.value === data.value) { 
                console.log(element.value);
                console.log(data.value);
                this.setState({ personnelvalue: data.value });
                this.setState({ id: element.id });
                return;
            }            
        });

    };
    setProjectValue = (e, data) => {
        projectOptions.forEach(element => {
            console.log(data.value);
            if (element.value === data.value) {
                this.setState({ id: element.id });
                this.setState({ ProjectValue: element.Value });
            }
        })
    };

    validate = () => { 
        const errors = {};
        
        if (!this.state.projectAssignedTo) errors.projectAssignedTo = "Can't be blank";
        if (!this.state.sections) errors.sections = "Can't be blank";
        if (!this.state.id) errors.id = "Can't be blank";
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this._assignEmployeeProject();
        }
        return errors;
    }

    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
    }
    render() { 
        const { errors, loading } = this.state;
        return ( <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 900 }}>
          <Header as="h4" color="green" textAlign="center">
            Personnel Details
          </Header> 
          <SearchPersonnelAssign/>      
            </Grid.Column>
          </Grid>  
          )
                }
            }
            
            const PERSONNELFEEDQUERY = gql`
query DriversQueryFeed{
  driverFeed{
    id
      personnelDetails{
      id
      firstName
      lastName
      photoUrl
      assignedToProject
      projectAssignedTo
      
    }
  }
}
`;

export default AssignPersonnelProject;

