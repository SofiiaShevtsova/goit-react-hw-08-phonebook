// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux/es';
import { removeContact } from 'redux/operationPhonebook';
import StyleList from '../ComponentStyles/PhonebookStyles';

const { ListOfContactsStyle, BtnDeleteContact, IsEmptyList } = StyleList;

const ContactsList = props => {
  const { contacts } = props;
  return contacts.length > 0 ? (
    <ListOfContactsStyle>
      {contacts.map(elem => (
        <Contact
          name={elem.name}
          phone={elem.number}
          id={elem.id}
          key={elem.id}
        />
      ))}
    </ListOfContactsStyle>
  ) : (
    <>
      <IsEmptyList>"There is no contacts"</IsEmptyList>
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
    <li>
      {name}: <span>{phone}</span>
      <BtnDeleteContact type="button" id={id} onClick={contsctToRemove}>
        Delete
      </BtnDeleteContact>
    </li>
  );
};

// Contact.propTypes = {
//   name: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };

export default ContactsList;
