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

      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>
            {currency}: {rate}
          </p>
        </div>
      ));
    }}
  </Query>
);

export default Home;
