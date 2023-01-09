import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const currentToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  remove() {
    axios.defaults.headers.common.Authorization = ``;
  },
};

export const registerNewUser = createAsyncThunk(
  'register/addUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', user);
      if (response.status !== 201) {
        return thunkAPI.rejectWithValue('Not register!');
      }
      currentToken.set(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Not register!');
    }
  }
);

export const logInUser = createAsyncThunk(
  'login/getUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', user);
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue('Not founded!');
      }
      currentToken.set(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Not founded!');
    }
  }
);

export const logOutUser = createAsyncThunk('login/outUser', async () => {
  try {
    await axios.post('/users/logout');
    currentToken.remove();
  } catch (e) {
    return alert(e);
  }
});

export const getCurrentUser = createAsyncThunk(
  'tokin/getUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    if (!state.phonebook.token) {
      return thunkAPI.rejectWithValue('Not founded!');
    }
    currentToken.set(state.phonebook.token);
    try {
      const response = await axios.get('/users/current');
            if (response.status !== 200) {
        return thunkAPI.rejectWithValue('Not founded!');
      }
      return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue('Not founded!');
    }
  }
);

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      if (response.statusText !== 'OK') {
        return thunkAPI.rejectWithValue('Not founded!');
      }
      return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue('Not founded!');
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
