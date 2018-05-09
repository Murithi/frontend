import React, { Component } from 'react';
import { compose, graphql } from "react-apollo";
class CreateServiceRequisition extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            requestedById: ''
            vehicleToBeServicedId: '',
            approxCost: '',
            otherDetails: ''
            errors: {},
            loading:false
         }
    }
    validate = () => { 
        const errors = {};
        if (!this.state.requestedById) errors.requestedById = "Can't be blank";
        if (!this.state.vehicleToBeServicedId) errors.vehicleToBeServicedId = "Can't be blank";
        if (!this.state.approxCost) errors.approxCost = "Can't be blank";
        if (!this.state.otherDetails) errors.otherDetails = "Can't be blank";
            this.setState({ loading: true });
            this._createServiceRequisition();
        }
        return errors;
    }

    onSubmit = () => {
        const errors = this.validate();
        this.setState({ errors });
    };
    
    render() { 
        return (  )
    }
    _createServiceRequisition=async ()=>{ 
        const {
            requestedById,
            vehicleToBeServicedId,
            approxCost,
            otherDetails
        } = this.state;

        await this.props.createServiceRequisition({
            variables: {
                requestedById,
                vehicleToBeServicedId,
                approxCost,
                otherDetails
            }
        });
        this.props.history.push('/servicerequisitions/list');
    }
}

const CREATESERVICEREQUISITIONMUTATION = gql`
    mutation createServiceRequistion(
        $requestedById: String!
        $vehicleToBeServicedId: String!
        $approxCost: Int!
        $otherDetails:String
    ){
        addServiceRequisition(
            requestedById: $RequestedById
            vehicleToBeServicedId: $vehicleToBeServicedId
            approxCost: $approxCost
            otherDetails: $otherDetails
        ){
            id

        }
    }
`;

const PersonnelFeedQuery = gql`
`;

export default compose(
    graphql(Personnel)
    grapql(CREATESERVICEREQUISITIONMUTATION, {name:'createservicerequisition'})
) (CreateServiceRequisition);