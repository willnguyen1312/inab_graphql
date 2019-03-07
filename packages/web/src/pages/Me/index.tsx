import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { ChildProps, graphql } from 'react-apollo';
import { Flex, Text } from 'rebass';
import { ME_QUERY } from 'shared/queries';
import { MeQuery } from 'types/schemaTypes';

type Props = RouteComponentProps;

const MePage = (props: ChildProps<Props, MeQuery>) => {
  const { data } = props;

  return (
    <Flex pt={2} flexDirection="column">
      <Text mb={2} fontSize={20} fontWeight="bold">
        Me page:
      </Text>
      {data!.loading ? <Text>Loading...</Text> : <Text>{data!.me!.email}</Text>}
    </Flex>
  );
};

export default graphql<Props, MeQuery>(ME_QUERY)(MePage);
