import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';
import { Box, Flex, Text } from 'rebass';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';

const LoadingOverlay = styled(Box)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: lightgray;
`;

const Me = (props: RouteComponentProps<{}>) => {
  const auth = useAuth();

  return (
    <Flex flexDirection="column" mt={20}>
      {(() => {
        switch (auth) {
          case undefined:
            return <LoadingOverlay>Loading...</LoadingOverlay>;
          case false:
            return <Redirect noThrow to="/login" />;
          default:
            return <Text fontSize={20}>Me</Text>;
        }
      })()}
    </Flex>
  );
};

export default Me;
