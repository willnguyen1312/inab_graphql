import { signUpSchema } from '@inab/common';
import { RouteComponentProps } from '@reach/router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Flex, Text } from 'rebass';

const Login = (props: RouteComponentProps<{}>) => (
  <Flex flexDirection="column">
    <Text my={20} fontSize={24}>
      Hi there!
    </Text>
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={signUpSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDirection="column">
            <Flex mb={2}>
              <Field placeholder="email" type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </Flex>
            <Flex mb={2}>
              <Field placeholder="password" type="password" name="password" />
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
  </Flex>
);

export default Login;
