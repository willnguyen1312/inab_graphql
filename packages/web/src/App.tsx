import { Link, navigate, Router } from '@reach/router';
import { gql } from 'apollo-boost';
import React from 'react';
import { ApolloConsumer, graphql } from 'react-apollo';
import { Flex } from 'rebass';
import AuthRoute from './modules/auth/AuthRoute';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Me = React.lazy(() => import('./pages/Me'));

const LogoutMutation = gql`
  mutation LogOut {
    logout
  }
`;

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

const meQuery = gql`
  query MeQuery {
    me {
      email
    }
  }
`;

const App = props => {
  const {
    data: { loading, me },
  } = props;

  const isAuth = Boolean(me);
  return loading ? null : (
    <ApolloConsumer>
      {client => (
        <Flex pl={15} pt={15} flexDirection="column">
          <Flex>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/me">Me</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            {isAuth && (
              <button
                style={{
                  cursor: 'pointer',
                }}
                onClick={async () => {
                  await client.mutate({
                    mutation: LogoutMutation,
                  });
                  client.resetStore();
                  navigate('/login-');
                }}
              >
                Logout
              </button>
            )}
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
      )}
    </ApolloConsumer>
  );
};

export default graphql(meQuery)(App);
