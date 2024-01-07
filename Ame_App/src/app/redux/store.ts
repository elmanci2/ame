import {configureStore} from '@reduxjs/toolkit';
import reminderSlice from './ReminderSlice';

export const store = configureStore({
  reducer: {
    reminder: reminderSlice,
  },
});
