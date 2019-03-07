import { signUpSchema } from '@inab/common';
import { RouteComponentProps } from '@reach/router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { ErrorType } from 'react-app-env';
import { Button, Flex, Text } from 'rebass';
import { ME_QUERY } from 'shared/queries';
import { Login, LoginVariables } from 'types/schemaTypes';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      path
      message
    }
  }
`;

const LoginPage = (props: RouteComponentProps<{}>) => {
  let prevRoute;

  if (props.location!.state) {
    prevRoute = props.location!.state.prevRoute;
  }
  const [state, setState] = useState({
    success: false,
    errors: [],
  } as {
    success: boolean;
    errors: ErrorType[];
  });

  const { success, errors } = state;

  return (
    <Flex pt={2} flexDirection="column">
      {!success ? (
        <>
          <Text mb={2} fontSize={24}>
            Hi there!
          </Text>
          <Mutation mutation={LOGIN_MUTATION}>
            {(login, { client }) => {
              return (
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={signUpSchema}
                  onSubmit={async (
                    values: LoginVariables,
                    { setSubmitting }
                  ) => {
                    const { data: response }: { data: Login } = (await login({
                      variables: values,
                      refetchQueries: [
                        {
                          query: ME_QUERY,
                        },
                      ],
                      awaitRefetchQueries: true,
                    })) as any;

                    if (!response.login) {
                      props!.navigate!(prevRoute ? prevRoute : '/');
                    } else {
                      setState({
                        success: false,
                        errors: response.login,
                      });
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Flex flexDirection="column">
                        <Flex mb={2}>
                          <Field
                            placeholder="email"
                            type="email"
                            name="email"
                          />
                          <ErrorMessage name="email" component="div" />
                        </Flex>
                        <Flex mb={2}>
                          <Field
                            placeholder="password"
                            type="password"
                            name="password"
                          />
                          <ErrorMessage name="password" component="div" />
                        </Flex>
                        <Flex>
                          <Button type="submit" disabled={isSubmitting}>
                            Submit
                          </Button>
                        </Flex>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              );
            }}
          </Mutation>
        </>
      ) : null}

      {errors.length
        ? errors.map(({ path, message }) => {
            return (
              <Text key={message}>
                {path} {message}
              </Text>
            );
          })
        : null}
    </Flex>
  );
};

export default LoginPage;
