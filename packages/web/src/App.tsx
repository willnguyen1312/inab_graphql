import { Link, Router } from '@reach/router';
import React from 'react';
import { Flex } from 'rebass';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
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
  <Flex pl={15} pt={15} flexDirection="column">
    <Flex>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/me">Me</NavLink>
      <NavLink to="/login">Login</NavLink>
    </Flex>
    <React.Suspense fallback={'Loading...'}>
      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Me path="/me" />
      </Router>
    </React.Suspense>
  </Flex>
);

export default App;
