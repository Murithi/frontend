import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Form, Segment, Grid, Header, Message, Dropdown, Divider, Image } from 'semantic-ui-react';
import InlineError from './messages/InlineError';

var personnelOptions = [];
var vehicleOptions = [];
class AssignVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            dateAssigned:'',
            id: '',
            vehicleValue:'',
            personnelvalue: '',
            personnelId:'',
            errors: {},
            loading: false
        }
    }
    handleDateAssignedChange = date => { 
        this.setState({ dateAssigned: date  });
    }
    setValue = (e, data) => {
        
        personnelOptions.forEach(element => {
            if (element.value === data.value) { 
            
                this.setState({ personnelvalue: data.value });
                this.setState({ personnelId: element.id });
                return;
            }
            
        });
        
        this.setState({ personnelvalue: data.value });
    };

    setVehicleValue = (e, data) => { 
        vehicleOptions.forEach(element => { 
            
            if (element.value === data.value) { 
                this.setState({ id: element.id });
                this.setState({ vehicleValue:element.Value  });
            }
        })
    }
    validate = () => { 
        const errors = {};
        if (!this.state.assigneeId) errors.assigneeId = "Can't be blank";
        if (!this.state.dateAssigned) errors.dateAssigned = "Can't be blank";
        if (!this.state.personnelId) errors.personnelId = "Can't be blank";
        if (!this.state.id) errors.id = "Can't be blank";
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this._assignVehicle();
        }
        return errors;
    }
    
    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
    }
    render() { 
        const { errors, loading } = this.state;
        console.log(this.props);
        if(this.props.personnelFeed.loading === false) { 
            let tempOps = this.props.personnelFeed.driverFeed;
            tempOps.map(element => {
                personnelOptions.push(
                    {
                        id: element.personnelDetails.id,
                        text: element.personnelDetails.firstName + " " + element.personnelDetails.lastName,
                        value: element.personnelDetails.firstName + " " + element.personnelDetails.lastName
                    }
                );
            });
        }
        if(this.props.vehicleFeed.loading === false) { 
            let tempOp = this.props.vehicleFeed.vehicleDisplayFeed;
            tempOp.map(element => {
                vehicleOptions.push({ id: element.id, text: element.registrationNumber, value: element.registrationNumber });
            });
        }
        return (
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
            <Header as="h2" color="green" textAlign="center">
                Assign Vehicle
             </Header>
            <Divider /> 
            <Form size="large" onSubmit={this.onSubmit} loading={loading}>
                {errors.global && (
                    <Message negative>
                        <Message.Header> Something went wrong </Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                )}        
                <Segment stacked>
                <Form.Field error={!!errors.vehicleValue}>
                        <label>Vehicle Registration Number</label>
                        <Dropdown
                        value={this.state.vehicleValue}
                        search
                        selection
                        options={vehicleOptions}
                        onChange={this.setVehicleValue.bind(this)}
                        />
                        {errors.vehicleValue && <InlineError text={errors.vehicleValue} />}
                            </Form.Field> 

                <Form.Field error={!!errors.personnelvalue}>
                        <label>Driver's Name</label>
                        <Dropdown
                        value={this.state.personnelvalue}
                        search
                        selection
                        options={personnelOptions}
                        onChange={this.setValue.bind(this)}
                        />
                        {errors.personnelvalue && <InlineError text={errors.personnelvalue} />}
                            </Form.Field>  
                            <Form.Button fluid positive> Submit </Form.Button>                            
                </Segment>        
            </Form>
          </Grid.Column>
            </Grid>      
          )
    }

    _assignVehicle = async () => { 
        const {
            personnelId,
            id
            
        } = this.state;
        let assigned = true;
        await this.props.createDriver({
            variables: {
                personnelId, id, assigned
            }
        });
    
        this.props.history.push('/drivers/list')
    }
}

const VEHICLEFEEDQUERY = gql`
query getVehicles{
  vehicleDisplayFeed{
    id
    registrationNumber
    
  }
}
`;

const PERSONNELFEEDQUERY = gql`
query DriversQueryFeed{
  driverFeed{
    id
      personnelDetails{
      id
      firstName
      lastName
    }
  }
}
`;

const CREATEASSIGNVEHICLEMUTATION = gql`
mutation assignVehicle(
  $vehicleId:ID!,
  $assigneeId: String!,
  $assignedStatus: BoolMean!
){
  editVehicleAssignee(
    id:$vehicleId,
  assigneeId:$assigneeId,
  assigned:$assignedStatus
  ){
    id
    
  }
}
`;
export default compose(
    graphql(PERSONNELFEEDQUERY, { name: 'personnelFeed' }),
    graphql(VEHICLEFEEDQUERY, { name: 'vehicleFeed' }),
    graphql(CREATEASSIGNVEHICLEMUTATION, { name: 'assignVehicle'}),
)(AssignVehicle);