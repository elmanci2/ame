import {createSlice} from '@reduxjs/toolkit';
import {Service} from '../types/types';

type Types = {
  service: Service[];
};

const initialState: Types = {
  service: [],
};

export const ServiceList = createSlice({
  initialState,
  name: 'service',
  reducers: {
    addService: (state, action) => {
      state.service.push(action.payload);
    },

    deleteService: (state, action) => {
      state.service = state.service.filter(item => item.id !== action.payload);
    },
  },
});

export const {addService, deleteService} = ServiceList.actions;

export default ServiceList.reducer;
