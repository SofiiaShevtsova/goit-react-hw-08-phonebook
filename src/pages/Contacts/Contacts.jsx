import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/operationPhonebook';

import Section from 'components/Section/Section';
import ContactsList from 'components/ContactsList/ContactsList';
import FormAddContact from 'components/FormAddContact/FormAddContact';
import FilterContact from 'components/FilterContact/FilterContact';
import Loading from 'components/Loading/Loading';

const Contacts = () => {
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

    return (    <><Section title={'Phonebook'}>
        <FormAddContact />
      </Section>
      <Section title={'Contacts'}>
        <FilterContact />
        {isLoading ? <Loading /> : <ContactsList contacts={contactToFind} />}
      </Section></>  
)
}
export default Contacts