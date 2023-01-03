import { configureStore } from '@reduxjs/toolkit';

import phonebookSlice from './phonebookSlice';

export const store = configureStore({
  reducer: {
    phonebook: phonebookSlice,
  },
});
