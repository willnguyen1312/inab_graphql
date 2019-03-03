import { Redirect, RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React from 'react';
import { ChildProps, graphql } from 'react-apollo';
import { MeQuery } from '../../types/schemaTypes';

type Props = RouteComponentProps & {
  as: React.FC;
};

const meQuery = gql`
  query MeQuery {
    me {
      email
    }
  }
`;

const MePage = (props: ChildProps<Props, MeQuery>) => {
  const { data, as: Comp, ...rest } = props;

  if (data!.loading) {
    return null;
  }

  if (!data!.me) {
    // user not logged in
    return (
      <Redirect
        noThrow
        to="/login"
        state={{
          prevRoute: rest.location!.pathname,
        }}
      />
    );
  }

  const Component = Comp as any;

  return <Component {...rest} />;
};

export default graphql<Props, MeQuery>(meQuery)(MePage);
