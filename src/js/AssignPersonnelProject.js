import React, { Component } from 'react';


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
            sections: {}
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
        return ( <h2>Hey There</h2> )
    }
}

const PERSONNELFEEDQUERY = gql`
query DriversQueryFeed{
  driverFeed{xc
    id
      personnelDetails{
      id
      firstName
      lastName
    }
  }
}
`;

export default AssignPersonnelProject;

