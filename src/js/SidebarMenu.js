import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Divider, Dropdown, Icon, Input, Menu } from 'semantic-ui-react';

export default class SidebarMenu extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu vertical>
        <Menu.Item as={Link} to="search" name="search" active={activeItem === 'search'} onClick={this.handleItemClick}>
          <Input placeholder="Search..." />
        </Menu.Item>
        
       
         {/* Personnel Management */}
      {/* ___________________________________________________________________________________________________________________ */}
        <Menu.Item>
          Personnel Management
          <Divider />
            <Menu.Menu>
              <Menu.Item
                name="personnel"
                as={Link}
                to="/personnel/list"
                active={activeItem === 'personnel'}
                onClick={this.handleItemClick}
              >
                Employee List
              </Menu.Item>
              <Menu.Item
                name="createpersonnel"
                as={Link}
                to="/personnel/new"
                active={activeItem === 'createpersonnel'}
                onClick={this.handleItemClick}
              >
                Add Employee 
              </Menu.Item>
              <Menu.Item
                name="attendance"
                as={Link}
                to="/personnel/attendance"
                active={activeItem === 'attendance'}
                onClick={this.handleItemClick}
              >
                Add Employee Attendance 
              </Menu.Item>
              <Menu.Item
                name="terminatedpersonnel"
                as={Link}
                to="/personnel/termination/list"
                active={activeItem === 'terminatedpersonnel'}
                onClick={this.handleItemClick}
              >
                Employee Termination List
              </Menu.Item>
              <Menu.Item
                name="terminatepersonnel"
                as={Link}
                to="/personnel/termination/new"
                active={activeItem === 'terminatepersonnel'}
                onClick={this.handleItemClick}
              >
                Terminate Employee
              </Menu.Item>
              <Menu.Item
                name="personnelroles"
                as={Link}
                to="/personnel/roles/list"
                active={activeItem === 'personnelroles'}
                onClick={this.handleItemClick}
              >
                Employee Roles
              </Menu.Item>
              <Menu.Item
                name="addroles"
                as={Link}
                to="/personnel/roles/new"
                active={activeItem === 'addroles'}
                onClick={this.handleItemClick}
              >
                Add Roles
              </Menu.Item>
              <Menu.Item
                name="drivers"
                as={Link}
                to="/drivers/list"
                active={activeItem === 'drivers'}
                onClick={this.handleItemClick}
            >
              Drivers List
              </Menu.Item>
              <Menu.Item
                name="addDriver"
                as={Link}
                to="/drivers/new"
                active={activeItem === 'addDriver'}
                onClick={this.handleItemClick}
            >
              Add Driver
              </Menu.Item>
              <Menu.Item
                name="assignEmployeeToProject"
                as={Link}
                to="/projects/assignpersonnel"
                active={activeItem === 'assignEmployeeToProject'}
                onClick={this.handleItemClick}
            >
              Assign Employee Project
              </Menu.Item>
          </Menu.Menu>
          
        </Menu.Item>
         {/* Vehicle Management */}
        {/* ___________________________________________________________________________________________________________________ */}
        <Menu.Item>
          Vehicle Management
          <Divider />
          <Menu.Menu>
            <Menu.Item
              name="vehicleownerlist"
              active={activeItem === 'vehicleownerlist'}
              onClick={this.handleItemClick}
              as={Link}
              to="/vehicleowner/list"
            >
              View Vehicle Owners
            </Menu.Item>
            <Menu.Item
              name="vehicleownernew"
              active={activeItem === 'vehicleownernew'}
              onClick={this.handleItemClick}
              as={Link}
              to="/vehicleowner/new"
            >
              Add Vehicle Owners
            </Menu.Item>
            <Menu.Item
              name="vehicles"
              as={Link}
              to="/vehicles/list"
              active={activeItem === 'vehicles'}
              onClick={this.handleItemClick}
            >
              View Car List
            </Menu.Item>

            <Menu.Item
              name="addVehicle"
              to='/vehicles/new'
              as={Link}
              active={activeItem === 'addVehicle'}
              onClick={this.handleItemClick}
            >
              Add Vehicles
            </Menu.Item>
            <Menu.Item
              name="asignVehicle"
              to='/vehicles/assign'
              as={Link}
              active={activeItem === 'asignVehicle'}
              onClick={this.handleItemClick}
            >
              Assign Vehicles
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        {/* Stores Management */}
      {/* ___________________________________________________________________________________________________________________ */}
        <Menu.Item>
          Stores Management
          <Divider />
          <Menu.Menu>
            <Menu.Item>View Deliveries</Menu.Item>
          </Menu.Menu>
        </Menu.Item>
         {/* Project Management */}
      {/* ___________________________________________________________________________________________________________________ */}
        <Menu.Item>
          Project Management
          <Divider />
            <Menu.Menu>
              <Menu.Item
                name="listprojects"
                as={Link}
                to="/projects/list"
                active={activeItem === 'listprojects'}
                onClick={this.handleItemClick}
              >
                Project List
              </Menu.Item>
              <Menu.Item
                name="addprojects"
                as={Link}
                to="/projects/new"
                active={activeItem === 'addprojects'}
                onClick={this.handleItemClick}
              >
                Add Project
              </Menu.Item>
              <Menu.Item
                name="listsections"
                as={Link}
                to="/sections/list"
                active={activeItem === 'listsections'}
                onClick={this.handleItemClick}
              >
                Sections List
              </Menu.Item>
              <Menu.Item
                name="addsection"
                as={Link}
                to="/section/new"
                active={activeItem === 'addsection'}
                onClick={this.handleItemClick}
              >
                Add Section
              </Menu.Item>
              
          </Menu.Menu>
          
        </Menu.Item>

          {/* User Management */}
      {/* ___________________________________________________________________________________________________________________ */}
      <Menu.Item>
          User Management
          <Divider />
          <Menu.Menu>
            <Menu.Item
            name="viewUsers"
              to='/users/list'
              as={Link}
              active={activeItem === 'viewUsers'}
              onClick={this.handleItemClick}  
            >
              View Users
              </Menu.Item>
              <Menu.Item
            name="createUsers"
              to='/users/register'
              as={Link}
              active={activeItem === 'createUsers'}
              onClick={this.handleItemClick}  
            >
              Register New User
              </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
            </Menu>
    )
  }
}