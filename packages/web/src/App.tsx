import { Link, Router } from '@reach/router';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { SERVER_URL } from 'config';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Flex } from 'rebass';
import AuthRoute from './modules/auth/AuthRoute';

const client = new ApolloClient({
  uri: SERVER_URL,
  credentials: 'include',
  cache: new InMemoryCache(),
});

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Me = React.lazy(() => import('./pages/Me'));

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: isCurrent ? 'blue' : 'black',
          textDecoration: 'none',
          marginRight: 20,
        },
      };
    }}
  />
);

const App = () => (
  <ApolloProvider client={client}>
    <Flex pl={15} pt={15} flexDirection="column">
      <Flex>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/me">Me</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </Flex>
      <React.Suspense fallback={'Loading...'}>
        <Router>
          <Home path="/" />
          <Login path="/login" />
          <Register path="/register" />
          <AuthRoute as={Me} path="/me" />
        </Router>
      </React.Suspense>
    </Flex>
  </ApolloProvider>
);

export default App;
