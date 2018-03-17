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
    localStorage.removeItem('auth-token')
    this.props.history.push(`/login`);
  }
  render() {
    return (
      <Segment>
        <Button
          icon="lock"
          color="green"
          iconPosition="right"
          floated="right"
          onClick={e=>this.logout()}
        >
          {' '}
          Log Out{' '}
        </Button>
        <div>
          <Header as="h2" icon textAlign="center">
            <Icon name="home" color="green" circular />

            <Header.Content>Karakana Inventory System</Header.Content>
          </Header>
        </div>

        <Divider clearing />
        <Grid>
          <Grid.Column width={3}>
            <SidebarMenu />
          </Grid.Column>
          <Grid.Column stretched width={13}>
            <Segment>Hey hya!</Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default HomePage;
