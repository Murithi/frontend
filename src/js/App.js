import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import Vehicle from './Vehicle';
import LoginForm from './Login';
import HomePage from './HomePage';
import CreateVehicle from './CreateVehicle';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/vehicles" component={Vehicle} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
