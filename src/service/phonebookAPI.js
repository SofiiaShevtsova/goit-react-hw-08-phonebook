import axios from 'axios';

export const getContacts = async () => {
  try {
    const data = await axios.get(
      'https://63af5dd2cb0f90e514726ce0.mockapi.io/contacts/contacts'
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addContact = async contact => {
  try {
    await axios.post(
      'https://63af5dd2cb0f90e514726ce0.mockapi.io/contacts/contacts',
      contact
    );
  } catch (error) {
    console.log(error);
  }
};

export const removeContact = async id => {
  try {
    await axios.delete(
      `https://63af5dd2cb0f90e514726ce0.mockapi.io/contacts/contacts/:${id}`
    );
  } catch (error) {
    console.log(error);
  }
};
