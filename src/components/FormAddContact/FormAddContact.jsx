import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operationPhonebook';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, FormControl, FormLabel, FormErrorMessage, VStack, Button } from '@chakra-ui/react';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Required'),

  number: Yup.mixed().test({
    name: 'number',
    message:
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
    test: value => {
      return /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(
        value
      );
    },
  }),
});

const FormAddContact = props => {
  const dispatch = useDispatch();
  const contactsState = useSelector(state => state.phonebook.contacts);

  return (
    <>
      <Formik
        initialValues={{
          name: ``,
          number: ``,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm();

          if (contactsState.find(elem => elem.name === values.name.trim())) {
            alert('You have this contacts');
            return;
          }
          dispatch(
            addContact({
              name: values.name.trim(),
              number: values.number.trim(),
            })
          );
        }}
      >
        {props => (
          <Form>
            <VStack spacing={6} align="flex-start" w="400px">
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
              <FormLabel htmlFor="number">Number</FormLabel>
              <Input
                                  as={Field}
                    variant="outline"
                    focusBorderColor="teal.400"
type="tel" name="number"
              />{props.errors.number && (
              <FormErrorMessage id="feedback">
                {props.errors.number}
              </FormErrorMessage>
            )}
            </FormControl></VStack>
                
            <Button type="submit" colorScheme='teal' _hover={{ bg: 'gray', color: "white" }}>Add contact</Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormAddContact;
