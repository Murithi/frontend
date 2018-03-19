import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavLink, Redirect } from 'react-router-dom';
import { Button, Divider, Header, Segment, Icon, Image, Grid } from 'semantic-ui-react';
import SidebarMenu from './SidebarMenu';

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
          <Segment>Hey hya!</Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default HomePage;
