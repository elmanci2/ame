import {createSlice} from '@reduxjs/toolkit';
import {Reminder} from '../types/types';

type Types = {
  reminder: Reminder[];
};

const initialState: Types = {
  reminder: [],
};

export const reminderSlice = createSlice({
  initialState,
  name: 'reminders',
  reducers: {
    addReminder: (state, action) => {
      state.reminder.push(action.payload);
    },

    deleteReminder: (state, action) => {
      state.reminder = state.reminder.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

export const {addReminder, deleteReminder} = reminderSlice.actions;

export default reminderSlice.reducer;
