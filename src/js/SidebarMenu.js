import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';

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

        <Menu.Item>
          Workshop Management
          <Menu.Menu>
            <Menu.Item
              name="vehicles"
              as={Link}
              to="vehicles"
              active={activeItem === 'vehicles'}
              onClick={this.handleItemClick}
            >
              View Car List
            </Menu.Item>
            <Menu.Item name="add" active={activeItem === 'add'} onClick={this.handleItemClick}>
              Add Users
            </Menu.Item>
            <Menu.Item name="about" active={activeItem === 'about'} onClick={this.handleItemClick}>
              Remove Users
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item name="browse" active={activeItem === 'browse'} onClick={this.handleItemClick}>
          <Icon name="grid layout" />
          Browse
        </Menu.Item>
        <Menu.Item name="messages" active={activeItem === 'messages'} onClick={this.handleItemClick}>
          Messages
        </Menu.Item>

        <Dropdown item text="More">
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}
