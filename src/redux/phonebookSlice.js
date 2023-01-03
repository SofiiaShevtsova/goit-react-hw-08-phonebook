import { createSlice } from '@reduxjs/toolkit';
import { getContacts, removeContact, addContact } from './operationPhonebook';

const initialState = {
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
        if (state.contacts.find(elem => elem.name === action.payload.name)) {
          alert('You have this contacts');
          state.isLoading = false;
          state.error = null;
          return state;
        }
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
          elem => elem.id !== action.payload
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
