import {createSlice} from '@reduxjs/toolkit';
import {RegisterType} from '../types/types';

type Types = {
  info: RegisterType;
  type: string;
};

const initialState: Types = {
  info: {
    email: '',
    lastName: '',
    name: '',
    phoneNumber: '',
    address: '',
    city: '',
    country: '',
    state: '',
    date: '',
    documentType: '',
    document: '',
    password: '',
  },
  type: 'Usuario',
};

export const RegisterSlice = createSlice({
  initialState,
  name: 'register_info',
  reducers: {
    addInfo: (state, action) => {
      state.info = {...state.info, ...action.payload};
    },
    type: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const {addInfo, type} = RegisterSlice.actions;

export default RegisterSlice.reducer;
