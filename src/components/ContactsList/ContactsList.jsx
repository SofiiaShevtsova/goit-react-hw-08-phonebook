// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux/es';
import { removeContact } from 'redux/operationPhonebook';
import { List, Heading, ListItem, ListIcon, Button } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';

const ContactsList = props => {
  const { contacts } = props;
  return contacts.length > 0 ? (
    <List spacing={3}>
      {contacts.map(elem => (
        <Contact
          name={elem.name}
          phone={elem.number}
          id={elem.id}
          key={elem.id}
        />
      ))}
    </List>
  ) : (
    <>
      <Heading as="h4" size="md" color="red.400">
        "There is no contacts"
      </Heading>
    </>
  );
};

// ContactsList.propTypes = {
//   contacts: PropTypes.oneOfType([
//     PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         phone: PropTypes.string.isRequired,
//         id: PropTypes.string.isRequired,
//       }),
//       PropTypes.array
//     ),
//   ]),
// };

const Contact = props => {
  const dispatch = useDispatch();

  const contsctToRemove = event => {
    dispatch(removeContact(event.target.attributes.id.nodeValue));
  };

  const { name, phone, id } = props;
  return (
    <ListItem>
      <ListIcon as={PhoneIcon} color="teal.500" />
      {name}: <span>{phone}</span>
      <Button
        colorScheme="teal"
        size="xs"
        type="button"
        id={id}
        onClick={contsctToRemove}
      >
        Delete
      </Button>
    </ListItem>
  );
};

// Contact.propTypes = {
//   name: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };

export default ContactsList;
