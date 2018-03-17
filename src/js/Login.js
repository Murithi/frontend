import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { AUTH_TOKEN } from '../constants';

class LoginForm extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: ''
  };
  render() {
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="../logo.png" /> Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="mail"
                  placeholder="email"
                  iconPosition="left"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Choose a safe password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />

                <Button color="teal" fluid size="large" onClick={() => this._confirm()}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  _confirm = async () => {
    const { name, email, password } = this.state;
    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password
        }
      });
      const { token } = result.data.login;
      this._saveUserData(token);
    } else {
      const result = await this.props.signupMutation({
        variables: {
          name,
          email,
          password
        }
      });
      const { token } = result.data.signup;
      this._saveUserData(token);
    }
    this.props.history.push(`/`);
  };
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' })
)(LoginForm);
