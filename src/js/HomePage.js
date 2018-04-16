import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { NavLink, Redirect } from 'react-router-dom';
import { Button, Divider, Header, Segment, Icon, Image, Grid } from 'semantic-ui-react';
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
              <Route exact path="/vehicles/list" component={Vehicles} />  
              <Route exact path="/vehicles/new" component={CreateVehicle} />
              <Route exact path='/vehicles/assign' component={AssignVehicle}/>
              <Route exact path="/vehicles/edit/:id" component={VehicleOwnerEdit} />
              <Route exact path="/vehicles/:id" component={VehicleDetails} />

              
              <Route exact path="/vehicleowner/list" component={VehicleOwnerList} />
              <Route exact path="/vehicleowner/new" component={CreateVehicleOwner} />
              <Route exact path="/vehicleowner/edit/:id" component={VehicleOwnerEdit} />
              <Route exact path="/vehicleowner/:id" component={VehicleOwnerDetail} />
              
              
              <Route exact path="/personnel/list" component={PersonnelList} />              
              <Route exact path="/personnel/new" component={PersonnelCreate} />             
              <Route exact path='/personnel/termination/list' component={TerminationList} />
              <Route exact path='/personnel/termination/new' component={SearchPersonnel} />              
              <Route exact path='/personnel/roles/list' component={PersonnelRoles} />  
              <Route exact path='/personnel/roles/new' component={PersonnelRolesCreate} />  
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
             
              
            </Switch>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(HomePage);
