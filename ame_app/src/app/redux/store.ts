import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import reminderSlice from './ReminderSlice';
import ServiceList from './ServiceSlider';
import VitalSignSlider from './VitalsigneSlice';
import RegisterSlice from './RegisterSlider';
import serviceListSlice from './tokenSlice';
import PatientsSlice from './PatientsSlice';
import InfoAdd from './InfoSlice';
import UtilSlice from './utilSlice';

// Correct import statement for PersistConfig
import {PersistConfig} from 'redux-persist/es/types';

const persist: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['reminder', 'tk', 'signe', 'Patients', 'Info'],
};

const rootReducers = combineReducers({
  reminder: reminderSlice,
  service: ServiceList,
  signe: VitalSignSlider,
  register: RegisterSlice,
  tk: serviceListSlice,
  Patients: PatientsSlice,
  Info: InfoAdd,
  util: UtilSlice,
});

const persistReducers = persistReducer(persist, rootReducers);

export const store = configureStore({
  reducer: persistReducers,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
