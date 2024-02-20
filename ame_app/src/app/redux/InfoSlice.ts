import {createSlice} from '@reduxjs/toolkit';
import {RegisterType, UserData, patientsType} from '../types/types';

type Types = {
  info: UserData;
};

const initialState: Types = {
  info: {
    active: 0,
    address: '',
    barrio: '',
    city: 0,
    country: 0,
    date: '',
    document: '',
    documentType: '',
    email: '',
    id_usuario: '',
    lastName: '',
    name: '',
    password: '',
    phoneNumber: '',
    photo: null,
    state: 0,
    type: '',
    verified: 0,
  },
};

export const InfoAdd = createSlice({
  initialState,
  name: 'info',
  reducers: {
    addInfoUser: (state, action) => {
      const newPatient = action.payload;
      const existingPatient: any = state.info;

      // Check if any property of newPatient is different from existingPatient
      const isDifferent = Object.keys(newPatient).some(
        key => newPatient[key] !== existingPatient[key],
      );

      if (isDifferent) {
        state.info = {...existingPatient, ...newPatient};
      } else {
        console.log('La información del paciente no ha cambiado.');
      }
    },
  },
});

export const {addInfoUser} = InfoAdd.actions;

export default InfoAdd.reducer;
