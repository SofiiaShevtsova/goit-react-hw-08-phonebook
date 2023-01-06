// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { findContact } from 'redux/phonebookSlice';
import { Input, FormControl, FormLabel, VStack } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

const FilterContact = props => {
  const findState = useSelector(state => state.phonebook.filter);
  const dispatch = useDispatch();

  const filterFun = event => {
    dispatch(findContact(event.target.value.trim().toLowerCase()));
  };
  return (
    <Formik
      initialValues={{
        filter: '',
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
      }}
    >
      <Form>
        <VStack
          spacing={6}
          align="flex-start"
          w={[250, 400, 600]}
          mx="auto"
          py="20px"
        >
          <FormControl>
            <FormLabel htmlFor="filter">Find contacts by name</FormLabel>
            <Input
              as={Field}
              variant="outline"
              focusBorderColor="teal.400"
              type="text"
              name="filter"
              onChange={filterFun}
              value={findState}
            />
          </FormControl>
        </VStack>
      </Form>
    </Formik>
  );
};

export default FilterContact;
