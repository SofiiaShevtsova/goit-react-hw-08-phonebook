import { createSlice } from '@reduxjs/toolkit';
import {
  getContacts,
  removeContact,
  addContact,
  registerNewUser,
  logInUser,
  logOutUser,
  getCurrentUser,
} from './operationPhonebook';

const initialState = {
  user: '',
  token: null,
  refreshToken: null,
  avatar: '',
  contacts: [],
  isLoading: false,
  error: null,
  filter: '',
};

const statusProgress = (state, action) => {
  state.isLoading = true;
};

const statusError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    findContact: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerNewUser.pending, state => {
        statusProgress(state);
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.user = action.payload.user.email;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        statusError(state, action);
      })
      .addCase(logInUser.pending, state => {
        statusProgress(state);
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.refreshToken = action.payload.refreshToken;
        state.avatar = action.payload.user.avatarURL;
        state.user = action.payload.user.name;
        state.token = action.payload.accessToken;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logInUser.rejected, (state, action) => {
        statusError(state, action);
      })
      .addCase(logOutUser.pending, state => {
        statusProgress(state);
      })
      .addCase(logOutUser.fulfilled, state => {
        state.user = '';
        state.token = null;
        state.refreshToken = null;
        state.avatar = '';
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        statusError(state, action);
      })
      .addCase(getCurrentUser.pending, state => {
        statusProgress(state);
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.refreshToken = action.payload.refreshToken;
        state.avatar = action.payload.user.avatarURL;
        state.user = action.payload.user.name;
        state.token = action.payload.accessToken;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
      })

      .addCase(getContacts.pending, state => {
        statusProgress(state);
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = [...action.payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getContacts.rejected, (state, action) => {
        statusError(state, action);
      })
      .addCase(addContact.pending, state => {
        statusProgress(state);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(addContact.rejected, (state, action) => {
        statusError(state, action);
      })
      .addCase(removeContact.pending, state => {
        statusProgress(state);
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          elem => elem._id !== action.payload
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeContact.rejected, (state, action) => {
        statusError(state, action);
      });
  },
});

export const { findContact } = phonebookSlice.actions;

export default phonebookSlice.reducer;
