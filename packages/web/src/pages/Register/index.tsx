import { signUpSchema } from '@inab/common';
import { RouteComponentProps } from '@reach/router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import gql from 'graphql-tag';
import get from 'lodash/get';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { ErrorType } from 'react-app-env';
import { Button, Flex, Text } from 'rebass';

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

const Register = (props: RouteComponentProps<{}>) => {
  const [state, setState] = useState({
    success: false,
    errors: [],
  } as {
    success: boolean;
    errors: ErrorType[];
  });

  const { success, errors } = state;

  return (
    <Flex mt={20} flexDirection="column">
      {!success ? (
        <>
          <Text mb={20} fontSize={24}>
            Register form
          </Text>
          <Mutation mutation={REGISTER_MUTATION}>
            {register => {
              return (
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={signUpSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    const response = await register({ variables: values });
                    const listOfError = get(response, 'data.register');
                    if (!listOfError) {
                      setState({
                        success: true,
                        errors: [],
                      });
                    } else {
                      setState({
                        success: false,
                        errors: listOfError,
                      });
                    }
                    setSubmitting(false);
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
                            Sign up
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
      ) : (
        <Text fontSize={20}>Thanks!!!</Text>
      )}

      {errors.length
        ? errors.map(error => {
            return (
              <Text>
                {error.path} {error.message}
              </Text>
            );
          })
        : null}
    </Flex>
  );
};

export default Register;
