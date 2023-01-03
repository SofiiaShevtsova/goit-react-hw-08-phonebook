// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { findContact } from 'redux/phonebookSlice';

import { Formik } from 'formik';
import StyleList from '../ComponentStyles/PhonebookStyles';

const { FormStyle, FieldStyles } = StyleList;

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
      <FormStyle>
        <label htmlFor="filter">Find contacts by name</label>
        <FieldStyles
          type="text"
          name="filter"
          onChange={filterFun}
          value={findState}
        />
      </FormStyle>
    </Formik>
  );
};

export default FilterContact;
