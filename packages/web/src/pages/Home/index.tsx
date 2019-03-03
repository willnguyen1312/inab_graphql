import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

const Home = (props: RouteComponentProps<{}>) => (
  <Query
    query={gql`
      query Hi {
        hi {
          message
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error :(</p>;
      }

      return <h1>{data.hi.message}</h1>;
    }}
  </Query>
);

export default Home;
