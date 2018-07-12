import React,  { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { Form, Segment, Button, Grid, Header, Message, Dropdown, Divider, Modal } from 'semantic-ui-react';
import InlineError from './messages/InlineError';
import getMaterialCosting from './queries/fetchMaterials';
import MaterialRequisition_Feed_Query from './queries/fetchMaterialRequisitionFeed';

var materialOptions = [];
var supplierOptions = [];
class MaterialRequisitionCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            materialTypeId:'',
            quantity:'',
            supplierId:'',
            otherDetails:'',
            approxCost:'',
            paymentMode: '',
            modalOpen: false ,
            errors: {},
            loading:false
         }
    }

    setMaterialValue = (e, data) => {
        materialOptions.forEach(element => {
            if (element.value === data.value) {
                this.setState({ materialTypeId: element.id });
                this.setState({ material:element.value  });
            }
         })
       
    }
    handleOpen = () => {
        // t
        let supplier = this.props.supplierFeed.suppliersFeed.find(x => x.id === this.state.supplierId)
        let cost = supplier.negotiatedRate * this.state.quantity
        this.setState({ approxCost: cost });
        this.setState({ modalOpen: true })
    
    }
    handleClose = () => {
        this.setState({ modalOpen: false })             
    }

    onConfirmation = () => {
        this.setState({ loading: true });   
        this._createMaterialRequisition();
    }
    setSupplierValue = (e, data) => {
        supplierOptions.forEach(element => {
            if (element.value === data.value) {
                this.setState({ supplierId: element.id });
                this.setState({ supplier:element.value  });
                
            }
         })
    }

    setPaymentMode = (e, data) => {
        this.setState({ paymentMode:data.value  });
    }
   
    validate = () => { 
        const errors = {};
        
        if (!this.state.materialTypeId) errors.materialTypeId = "Can't be blank";
        if (!this.state.quantity) errors.quantity = "Can't be blank";
        if (!this.state.supplierId) errors.supplierId = "Can't be blank";
        if (!this.state.otherDetails) errors.otherDetails = "Can't be blank";
        if (!this.state.paymentMode) errors.paymentMode = "Can't be blank";
        if (Object.keys(errors).length === 0) {
            this.handleOpen();
        }
        return errors;
        }

    onSubmit = () => {
        const errors = this.validate();
       
        this.setState({ errors })
    }
    render() { 
        const { errors, loading } = this.state
        const paymentOptions = [{ id: 1, value: 'CASH', text:'CASH' }, { id: 2, value: 'CHEQUE', text:'CHEQUE' }]
        
       
        if (this.props.supplierFeed.loading === false) {
            if (this.props.supplierFeed.suppliersFeed !== undefined || this.props.supplierFeed.suppliersFeed.length !== 0) {
                let tempOp = [...(new Set(this.props.supplierFeed.suppliersFeed))];
                supplierOptions=[]
                tempOp.map(element => {
                 return   supplierOptions.push({ id: element.id, text: element.supplierName, value: element.supplierName });
                });
            }            
        }
        if (this.props.materialsCostFeed.loading === false) {
            if (this.props.materialsCostFeed.materialsCostingFeed !== undefined || this.props.materialsCostFeed.materialsCostingFeed.length !== 0) {
                let tempOp = [...(new Set(this.props.materialsCostFeed.materialsCostingFeed))];
                materialOptions=[]
                tempOp.map(element => {
                 return   materialOptions.push({ id: element.id, text: element.materialName, value: element.materialName });
                });
            }            
        }
        
        return ( 
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
            <Header as="h2" color="green" textAlign="center">
                Create Service Requisition
             </Header>
                    <Divider /> 
                    <Form size="large" onSubmit={this.onSubmit}  loading={loading}>
                {errors.global && (
                    <Message negative>
                        <Message.Header> Something went wrong </Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                        )}
                        <Segment stacked>
                            <Form.Field error={!!errors.materialTypeId}>
                            <Dropdown
                            value={this.state.material}
                            search
                            selection
                            options={materialOptions}
                            onChange={this.setMaterialValue.bind(this)}
                            />
                            {errors.materialTypeId && <InlineError text={errors.materialTypeId} />}
                           
                            </Form.Field>
                            <Form.Field error={!!errors.supplierId}>
                            <Dropdown
                            value={this.state.supplier}
                            search
                            selection
                            options={supplierOptions}
                            onChange={this.setSupplierValue.bind(this)}
                            />
                            {errors.supplierId && <InlineError text={errors.supplierId} />}
                            </Form.Field>
                                <Form.Field error={!!errors.quantity}>
                            <label>Quantity</label>
                            <input
                            placeholder="0000"
                            value={this.state.quantity}
                            type='number'                
                            onChange={e => this.setState({ quantity: e.target.value })}
                            />
                            {errors.quantity && <InlineError text={errors.quantity} />}
                            </Form.Field>
                            <Form.Field error={!!errors.paymentMode}>
                            <Dropdown
                            value={this.state.paymentMode}
                            search
                            selection
                            options={paymentOptions}
                            onChange={this.setPaymentMode.bind(this)}
                            />
                            {errors.paymentMode && <InlineError text={errors.paymentMode} />}
                            </Form.Field>
                            <Form.Field error={!!errors.otherDetails}>
                            <label>Other Details</label>
                            <Form.TextArea
                            autoHeight
                            rows={4}
                            value={this.state.otherDetails}
                                            
                            onChange={e => this.setState({ otherDetails: e.target.value })}
                            />
                            {errors.otherDetails && <InlineError text={errors.otherDetails} />}
                           
                            </Form.Field>
                            <Form.Button
                                fluid
                                positive
                              
                                
                            >Submit</Form.Button>
                            </Segment>
                    </Form> 
                    <Modal size='fullscreen' open={this.state.modalOpen}  onClose={this.handleClose} closeIcon>
                <Modal.Header>Requisition cost</Modal.Header>
                <Modal.Content>
                    <b>Material: {this.state.material}</b><br/>
                    <b>Supplier: {this.state.supplier}</b><br/>
                    <b>Quantity: {this.state.quantity}</b><br/>
                            <b>Amount Charged: {this.state.approxCost}</b><br/>
                    <p>Please confirm the cost & supplier chosen for the transaction</p>
                </Modal.Content>
                <Modal.Actions>
                            <Button negative
                                onClick={e=>this.setState({ modalOpen:false  })}
                            >No</Button>
                            <Button positive icon='checkmark' labelPosition='right'
                                onClick={this.onConfirmation}
                                content='Yes' />
                </Modal.Actions>
            </Modal>
            </Grid.Column>
            </Grid>
         )
    }
    _createMaterialRequisition = async () => {
        const {
            materialTypeId,
            quantity,
            supplierId,
            otherDetails,
            approxCost,
            paymentMode
        } = this.state
        await this.props.createMaterialRequest({
            variables: {
                materialTypeId,
                quantity,
                supplierId,
                otherDetails,
                approxCost,
                paymentMode
            },
            refetchQueries: [{query: MaterialRequisition_Feed_Query}]
        })
        this.props.history.push('/materialrequisitions/list')
    }
}



const SUPPLIERFEEDQUERY = gql`
query getSuppliers{
  suppliersFeed{
    id
    supplierName
    negotiatedRate
  }
}
`

const CREATEMATERIALREQUISITIONMUTATION = gql`
mutation addMaterialRequisition(
    $materialTypeId: String!
    $quantity: Int!
    $supplierId:String!
    $otherDetails:String
    $approxCost:Int!
    $paymentMode:String!
  
){
  addMaterialRequisition(
    materialTypeId:$materialTypeId,
    supplierId:$supplierId,
    quantity:$quantity,
    otherDetails:$otherDetails,
    paymentMode: $paymentMode
    approxCost:$approxCost
  ){
    id
  }
}`

export default compose(
    graphql(getMaterialCosting, { name: 'materialsCostFeed' }),
    graphql(SUPPLIERFEEDQUERY, { name: 'supplierFeed' }),
    graphql(CREATEMATERIALREQUISITIONMUTATION, { name: 'createMaterialRequest' })
    
) (MaterialRequisitionCreate)