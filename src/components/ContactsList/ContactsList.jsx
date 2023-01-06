import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux/es';
import { removeContact } from 'redux/operationPhonebook';
import {
  List,
  Heading,
  ListItem,
  ListIcon,
  Button,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { PhoneIcon, DeleteIcon } from '@chakra-ui/icons';

const ContactsList = props => {
  const { contacts } = props;
  return contacts.length > 0 ? (
    <List
      spacing={3}
      marginTop="20px"
      fontSize={{ base: '16px', sm: '24px', lg: '28px' }}
      textAlign="start"
    >
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

ContactsList.propTypes = {
  contacts: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        phone: PropTypes.string,
        id: PropTypes.string,
      }),
      PropTypes.array
    ),
  ]),
};

const Contact = props => {
  const dispatch = useDispatch();

  const contsctToRemove = event => {
    dispatch(removeContact(event.target.attributes.id.nodeValue));
  };

  const { name, phone, id } = props;
  return (
    <ListItem>
      <Flex>
        <Text noOfLines={1}>
          <ListIcon as={PhoneIcon} color="teal.500" marginRight="15px" />
          {name}: <span>{phone}</span>
        </Text>
        <Spacer />
        <Button
          colorScheme="teal"
          size="xs"
          display="inline-block"
          marginLeft="5px"
          type="button"
          id={id}
          onClick={contsctToRemove}
        >
          <DeleteIcon boxSize={4} />
        </Button>
      </Flex>
    </ListItem>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ContactsList;
