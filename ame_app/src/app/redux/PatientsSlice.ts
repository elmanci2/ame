import {createSlice} from '@reduxjs/toolkit';
import {patientsType} from '../types/types';

type Types = {
  patients: patientsType[];
};

const initialState: Types = {
  patients: [],
};

export const PatientsAdd = createSlice({
  initialState,
  name: 'Patients',
  reducers: {
    addPatients: (state, action) => {
      const newPatient = action.payload;
      const isDuplicate = state.patients.some(
        patient => patient?.id === newPatient.id,
      );

      if (!isDuplicate) {
        state.patients.push(newPatient);
      } else {
        console.log(
          `El paciente con ID ${newPatient.id} ya existe en la lista.`,
        );
      }
    },
    removePatient: (state, action) => {
      const patientIdToRemove = action.payload;
      // Filtrar la lista para mantener solo los pacientes que no tienen el ID a eliminar
      state.patients = state.patients.filter(
        patient => patient?.id !== patientIdToRemove,
      );
    },
  },
});

export const {addPatients, removePatient} = PatientsAdd.actions;

export default PatientsAdd.reducer;
