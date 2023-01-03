import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/operationPhonebook';

import Section from './Section/Section';
import Contacts from './Contacts/Contacts';
import FormAddContact from './FormAddContact/FormAddContact';
import FilterContact from './FilterContact/FilterContact';
import Loading from './Loading/Loading';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const contactsState = useSelector(state => state.phonebook.contacts);
  const filterContacts = useSelector(state => state.phonebook.filter);
  const isLoading = useSelector(state => state.phonebook.isLoading);

  const contactToFind = contactsState.filter(elem =>
    elem.name.toLowerCase().includes(filterContacts)
  );

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: `column`,
        alignItems: `center`,
        color: '#010101',
      }}
    >
      <Section title={'Phonebook'}>
        <FormAddContact />
      </Section>
      <Section title={'Contacts'}>
        <FilterContact />
        {isLoading ? <Loading /> : <Contacts contacts={contactToFind} />}
      </Section>
    </div>
  );
};
