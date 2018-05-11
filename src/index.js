import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './js/App';
// import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { AUTH_TOKEN } from './constants';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag';

const cache = new InMemoryCache()
const defaultState = {
  usercredentials: {
    __typename: 'usercredentials',
    username: 'eric',
    loggedIn: false,
  },
  searchedPersonnelDetails: {
    __typename: 'usercredentials',
      firstName: '',
      lastName: '',
      personnelID: '',
      photoUrl:'',
      assignedAccount:'',
    
  },


}

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      updatePersonnel: (_, { index, value }, { cache }) => { 
        console.log("updating cache:")
        console.log(index, value)
        const query = gql`
         query {
          searchedPersonnelDetails @client {
            firstName
            lastName
            personnelID
            photoUrl
            assignedAccount
          }
        }
        `
        const previous = cache.readQuery({ query })
        const data = {
          searchedPersonnelDetails: {
            ...previous.searchedPersonnelDetails,
            [index]:value
          }
        }
        console.log(data);
        cache.writeData({query,data})
      }
    }  
  }
});
//const httpLink = new HttpLink({ uri: 'https://localhost:4000' });
// console.log(process.env.GRAPHCOOLURL);
// const httpLink = new HttpLink({ env.GRAPHCOOLURL });
const httpLink = new HttpLink({ uri: 'https://dodkyqakz5.execute-api.eu-west-1.amazonaws.com/staging' });
//configure apollo with authentication token
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);


const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    httpLinkWithAuthToken,
  ]),
  cache
});



ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
// registerServiceWorker();
