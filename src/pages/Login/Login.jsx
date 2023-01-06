import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { logInUser } from 'redux/operationPhonebook';

import Section from 'components/Section/Section';

const SignupSchema = Yup.object().shape({
  email: Yup.mixed().test({
    name: 'email',
    params: { a: 'test', b: 'qwe' },
    message: 'It is not a email',
    test: value => {
      return /\w+[^\s]\w+@\w+\.\w{1,5}/.test(value);
    },
  }),

  password: Yup.string()
    .min(2, 'Must min 2')
    .max(25, 'Must max 25')
    .required('Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Section>
        <Formik
          initialValues={{
            email: ``,
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            const user = {
              email: values.email.trim(),
              password: values.password.trim(),
            };
            dispatch(logInUser(user));
            actions.setSubmitting(false);
            actions.resetForm();
          }}
        >
          {props => (
            <Form>
              <VStack
                spacing={6}
                align="flex-start"
                w={[250, 400, 600]}
                mx="auto"
              >
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    as={Field}
                    variant="outline"
                    focusBorderColor="teal.400"
                    type="email"
                    name="email"
                  />
                  {props.errors.email && (
                    <FormErrorMessage id="feedback">
                      {props.errors.email}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    as={Field}
                    variant="outline"
                    focusBorderColor="teal.400"
                    type="text"
                    name="password"
                  />
                  {props.errors.password && (
                    <FormErrorMessage id="feedback">
                      {props.errors.password}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </VStack>

              <Button
                type="submit"
                colorScheme="teal"
                marginTop="30px"
                _hover={{ bg: 'gray', color: 'white' }}
              >
                Log in...
              </Button>
            </Form>
          )}
        </Formik>
      </Section>
    </>
  );
};

export default Login;
