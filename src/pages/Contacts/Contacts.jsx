import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/operationPhonebook';
import { VStack } from '@chakra-ui/react';

import Section from 'components/Section/Section';
import ContactsList from 'components/ContactsList/ContactsList';
import FilterContact from 'components/FilterContact/FilterContact';
import Loading from 'components/Loading/Loading';
import { AddContact } from 'components/AddContact/AddContact';

const Contacts = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.phonebook.user);

  useEffect(() => {
    if (userState) {
      dispatch(getContacts());
    }
  }, [dispatch, userState]);

  const contactsState = useSelector(state => state.phonebook.contacts);
  const filterContacts = useSelector(state => state.phonebook.filter);
  const isLoading = useSelector(state => state.phonebook.isLoading);

  const contactToFind = contactsState.filter(elem =>
    elem.name.toLowerCase().includes(filterContacts)
  );

  return (
    <VStack>
      <Section>
        <AddContact />
      </Section>
      <Section title={'Contacts'}>
        <FilterContact />
        {isLoading ? <Loading /> : <ContactsList contacts={contactToFind} />}
      </Section>
    </VStack>
  );
};
export default Contacts;
