import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://63af5dd2cb0f90e514726ce0.mockapi.io/contacts';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async () => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return e;
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContacts',
  async contact => {
    try {
      const response = await axios.post('/contacts', contact);
      return response.data;
    } catch (e) {
      return e;
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContacts',
  async id => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data.id;
    } catch (e) {
      return e;
    }
  }
);
