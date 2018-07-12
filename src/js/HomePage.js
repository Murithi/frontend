import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import {  Segment, Icon, Image, Grid } from 'semantic-ui-react';
import SidebarMenu from './SidebarMenu';
import Vehicles from './Vehicles';
import CreateVehicle from './CreateVehicle';
import CreateVehicleOwner from './CreateVehicleOwner';
import VehicleOwnerList from './VehicleOwnerList';
import VehicleOwnerDetail from './VehicleOwnerDetails';
import VehicleOwnerEdit from './VehicleOwnerEdit';
import VehicleDetails from './VehicleDetails';
import PersonnelList from './PersonnelList';
import PersonnelCreate from './PersonnelCreate';
import PersonnelDetails from './PersonnelDetails';
import TerminationList from './TerminationList';
import SearchPersonnel from './SearchPersonnel';
import PersonnelTerminate from './PersonnelTerminate';
import PersonnelRoles from './PersonnelRoles';
import PersonnelRolesCreate from './PersonnelRolesCreate';
import ProjectList from './ProjectList';
import ProjectDetails from './ProjectDetails';
import ProjectCreate from './ProjectCreate';
import SectionsList from './SectionsList';
import SectionsCreate from './SectionsCreate';
import DriversAdd from './DriversCreate';
import DriversList from './DriversList';
import AssignVehicle from './VehicleAssign';
import AssignPersonnelProject from './AssignPersonnelProject';
import PersonnelByRolesListing from './PersonnelByRolesListing';
import ServiceRequisitionsList from './ServiceRequisitionsList';
import ServiceRequisitionCreate from './ServiceRequisitionCreate';
import PersonnelAttendanceRecord from "./PersonnelAttendanceRecord";
import ServiceRequisitionsInitiated from './ServiceRequisitionsInitiated';
import ServiceRequisitionsByUser from './ServiceRequisitionsByUser';
import ServiceRequisitionApprove from './ServiceRequisitionApprove';
import ServiceRequisitionsApproved from './ServiceRequisitionsApproved';
import ServiceRequisitionsIssuedCash from './ServiceRequisitionsIssuedCash';
import RepairsRequisitionsCreate from './RepairsRequisitionsCreate';
import RepairsRequisitionsInititated from './RepairsRequisitionsInititated';
import RepairsRequisitionsApprove from './RepairsRequisitionsApprove';
import RepairsRequisitionsApproved from './RepairsRequisitionsApproved';
import RepairsRequisitionsIssuedCash from "./RepairsRequisitionsIssuedCash";
import RepairsRequisitionsList from './RepairsRequisitionsList';
import MaterialsList from './materialsList.';
import MaterialsCreate from './MaterialsCreate';
import MaterialsEdit from './MaterialsEdit';
import MaterialsDetails from './MaterialsDetails';
import IssueCash from './IssueCash';
import ReportCash from './ReportCash';
import IssueRepairsCash from './IssueRepairsCash';
import ReportRepairsRequisitionsCash from './ReportRepairsRequisitionsCash';
import SuppliersCreate from './SuppliersCreate';
import SuppliersEdit from './SuppliersEdit';
import SuppliersList from './SuppliersList';
import Users from './Users';
import RegisterUsers from './RegisterUsers'
import Signup from './Signup';
import MaterialRequisitionCreate from './MaterialRequisitionCreate';
import MaterialRequistionInitiated from './MaterialRequisitionInitiated';
import VehicleAssignmentList from './VehicleAssignmentList';
import MaterialRequisitionsApprove from './MaterialRequisitionsApprove';
import MaterialRequisitionsApproved from './MaterialRequisitionsApproved';
import MaterialRequisitionsIssueCash from './MaterialRequisitionsIssueCash'
import MaterialRequisitionsIssuedCash from './MaterialRequisitionsIssuedCash'
import MaterialRequisitionReport from './MaterialRequisitionsReport.js'
import MaterialRequisitionsIssueCheque from './MaterialRequisitionsIssueCheque'
import MaterialRequisitionsIssuedCheque from './MaterialRequisitionsIssuedCheque'
import StoreReciepts from './StoreReciepts'
import StoreIssues from './StoreIssues'
import StoreList from './StoreList'
import InspectionRequestCreate from './InspectionRequestCreate';
import InspectionRequestsInitiated from './InspectionRequestsInitiated';
import InspectionRequestApprove from './InspectionRequestApprove';
import InspectionRequisitionsApproved from './InspectionRequestApproved';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    localStorage.removeItem('auth-token');
    this.props.history.push(`/login`);
  };
  render() {
    return (
      <Grid>
        <Grid.Column width={3}>
          <SidebarMenu />
        </Grid.Column>
        <Grid.Column stretched width={13}>
          <Segment>
            <Switch>
              <Route exact path='/users/list' component={Users} />
              <Route exact path='/users/register' component={RegisterUsers} />
              <Route exact path="/vehicles/list" component={Vehicles} />  
              <Route exact path="/vehicles/new" component={CreateVehicle} />
              <Route exact path='/vehicles/assign' component={AssignVehicle}/>
              <Route exact path="/vehicles/edit/:id" component={VehicleOwnerEdit} />
              <Route exact path="/vehicles/:id" component={VehicleDetails} />
              <Route exact path='/vehicles/assignment/list' component={VehicleAssignmentList}/>
              
              <Route exact path="/vehicleowner/list" component={VehicleOwnerList} />
              <Route exact path="/vehicleowner/new" component={CreateVehicleOwner} />
              <Route exact path="/vehicleowner/edit/:id" component={VehicleOwnerEdit} />
              <Route exact path="/vehicleowner/:id" component={VehicleOwnerDetail} />
              
              
              <Route exact path="/personnel/list" component={PersonnelList} />              
              <Route exact path="/personnel/new" component={PersonnelCreate} />             
              <Route exact path='/personnel/termination/list' component={TerminationList} />
              <Route exact path='/personnel/termination/new' component={SearchPersonnel} />  
              <Route exact path='/personnel/search' component={SearchPersonnel}/>
              <Route exact path='/personnel/roles/list' component={PersonnelRoles} />  
              <Route exact path="/personnel/attendance" component={PersonnelAttendanceRecord}/>
              <Route exact path='/personnel/roles/new' component={PersonnelRolesCreate} /> 
              <Route exact path='/personnel/roles/:id' component={PersonnelByRolesListing} />  
              <Route exact path='/personnel/termination/:id' component={PersonnelTerminate} /> 
              
              <Route exact path="/personnel/:id" component={PersonnelDetails} />
              <Route exact path="/projects/list" component={ProjectList} />
              <Route exact path='/projects/new' component={ProjectCreate} />
              <Route exact path="/projects/assignpersonnel" component={AssignPersonnelProject}/>
              <Route exact path="/projects/:id" component={ProjectDetails} />
              <Route exact path='/sections/list' component={SectionsList} />
              <Route exact path='/sections/new' component={SectionsCreate} />
              <Route exact path = '/drivers/list' component={DriversList} />
              <Route exact path='/drivers/new' component={DriversAdd} />
              
              <Route exact path='/servicerequisitions/list' component={ServiceRequisitionsList} />
              <Route exact path='/servicerequisitions/new' component={ServiceRequisitionCreate} />
              <Route exact path='/servicerequisitions/initiated/all' component={ServiceRequisitionsInitiated}/>
              <Route exact path='/servicerequisitions/initiated' component={ServiceRequisitionsByUser} />
              <Route exact path='/servicerequisitions/approve/:id' component={ServiceRequisitionApprove} />
              <Route exact path='/servicerequisitions/approved' component={ServiceRequisitionsApproved} />
              <Route exact path='/servicerequisitions/issued' component={ServiceRequisitionsIssuedCash} />
              <Route exact path='/servicerequisitions/report/:id' component={ReportCash}/>
              <Route exact path='/servicerequisitions/issue/:id' component={IssueCash}/>
            
              <Route exact path='/repairsrequisitions/new' component={RepairsRequisitionsCreate} />
              <Route exact path='/repairsrequisitions/initiated' component={RepairsRequisitionsInititated} />
              <Route exact path='/repairsrequisitions/approve/:id' component={RepairsRequisitionsApprove} />
              <Route exact path='/repairsrequisitions/approved' component={RepairsRequisitionsApproved} />
              <Route exact path='/repairsrequisitions/issue/:id' component={IssueRepairsCash} />
              <Route exact path='/repairsrequisitions/issued' component={RepairsRequisitionsIssuedCash} />
              <Route exact path='/repairsrequisitions/report/:id' component={ReportRepairsRequisitionsCash} />
              <Route exact path='/repairsrequisitions/list' component={RepairsRequisitionsList}/>
              
              <Route exact path='/inspectionrequisitions/new' component={InspectionRequestCreate}/>
              <Route exact path='/inspectionrequisitions/initiated' component={InspectionRequestsInitiated} />
              <Route exact path='/inspectionrequisitions/approve/:id' component={InspectionRequestApprove}/>
              <Route exact path='/inspectionrequisitions/approved' component={InspectionRequisitionsApproved} />
              

              <Route exact path='/materials/list' component={MaterialsList} />
              <Route exact path='/materials/new' component={MaterialsCreate} />
              <Route exact path='/materials/edit/:id' component={MaterialsEdit} />
              <Route exact path='/materials/details/:id' component={MaterialsDetails}/>

              <Route exact path='/suppliers/new' component={SuppliersCreate} />
              <Route exact path='/suppliers/list' component={SuppliersList} />
              <Route exact path='/suppliers/edit/:id' component={SuppliersEdit} />
              
              <Route exact path='/materialrequisitions/new' component={MaterialRequisitionCreate} />
              <Route exact path='/materialrequisitions/initiated' component={MaterialRequistionInitiated} />
              <Route exact path='/materialrequisitions/approve/:id' component={MaterialRequisitionsApprove} />
              <Route exact path='/materialrequisitions/approved' component={MaterialRequisitionsApproved}/>
              <Route exact path='/materialrequisitions/issuecash/:id' component={MaterialRequisitionsIssueCash} />
              <Route exact path='/materialrequisitions/issuecheque/:id' component={MaterialRequisitionsIssueCheque}/>
              <Route exact path='/materialrequisitions/issued' component={MaterialRequisitionsIssuedCash} />
              <Route exact path='/materialrequisitions/report/:id' component={MaterialRequisitionReport} />
              <Route exact path='/materialrequisitions/chequed' component={MaterialRequisitionsIssuedCheque}/>
            
              <Route exact path='/store/reciepts' component={StoreReciepts}/>
              <Route exact path='/store/issues' component={StoreIssues} />
              <Route exact path='/store/list' component={StoreList} />
              
            </Switch>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(HomePage);
