import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, Header, Segment, Divider, Button, Icon } from 'semantic-ui-react';
import Vehicle from './Vehicle';
import LoginForm from './Login';
import HomePage from './HomePage';
import CreateVehicle from './CreateVehicle';
import CreateVehicleOwner from './CreateVehicleOwner';
class App extends Component {
  render() {
    return (
      <Segment>
        <Button icon="lock" color="green" iconPosition="right" floated="right" onClick={e => this.logout()}>
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
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/vehicles" component={Vehicle} />
          <Route exact path="/createvehicle" component={CreateVehicle} />
          <Route exact path="/createvehicleowner" component={CreateVehicleOwner} />
        </Switch>
      </Segment>
    );
  }
}

export default App;
