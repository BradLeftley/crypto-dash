import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, createHttpLink, InMemoryCache,ApolloProvider } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { gql } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'api.blocktap.io/graphql',
});

//may need this later if api need token
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      authorization: token ? `Bearer 18aed8dd3d1f1c19a9e44c3d40338b70f23bb4ad1afda12c055e784e2f527a15` : "Bearer 18aed8dd3d1f1c19a9e44c3d40338b70f23bb4ad1afda12c055e784e2f527a15",
    }
  }
});

const client = new ApolloClient({
  uri: 'https://api.blocktap.io/graphql',
  cache: new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
