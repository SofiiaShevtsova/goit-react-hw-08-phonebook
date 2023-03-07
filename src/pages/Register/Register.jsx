import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { registerNewUser } from 'redux/operationPhonebook';

import Section from 'components/Section/Section';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Required'),

  email: Yup.mixed().test({
    name: 'email',
    params: { a: 'test', b: 'qwe' },
    message: 'It is not a email',
    test: value => {
      return /\w+[^\s]\w+@\w+\.\w{1,5}/.test(value);
    },
  }),
  password: Yup.string()
    .min(7, 'Must min 7')
    .max(25, 'Must max 25')
    .required('Required'),
});

const Register = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Section>
        <Formik
          initialValues={{
            name: ``,
            email: ``,
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            actions.resetForm();
            const user = {
              name: values.name.trim(),
              email: values.email.trim(),
              password: values.password.trim(),
            };
            dispatch(registerNewUser(user));
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
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    as={Field}
                    variant="outline"
                    focusBorderColor="teal.400"
                    type="text"
                    name="name"
                  />
                  {props.errors.name && (
                    <FormErrorMessage id="feedback">
                      {props.errors.name}
                    </FormErrorMessage>
                  )}
                </FormControl>

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
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Section>
    </>
  );
};
export default Register;
