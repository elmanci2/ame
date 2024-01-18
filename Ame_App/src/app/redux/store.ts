import {configureStore} from '@reduxjs/toolkit';
import reminderSlice from './ReminderSlice';
import ServiceList from './ServiceSlider';
import VitalSignSlider from './VitalsigneSlice';

export const store = configureStore({
  reducer: {
    reminder: reminderSlice,
    service: ServiceList,
    signe: VitalSignSlider,
  },
});
