import {createSlice} from '@reduxjs/toolkit';
import {RegisterType} from '../types/types';

type Types = {
  select_user_reminder: string;
};

const initialState: Types = {
  select_user_reminder: '',
};

export const  UtilSlice = createSlice({
  initialState,
  name: 'util',
  reducers: {
    add_select_user_reminder: (state, action) => {
      state.select_user_reminder = action.payload
    },
  },
});

export const {add_select_user_reminder} = UtilSlice.actions;

export default UtilSlice.reducer;
