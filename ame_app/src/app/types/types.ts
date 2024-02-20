import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';

export interface Reminder {
  id: number;
  mensaje: string;
  medicamento: string;
  dosis: string;
  unidad: string;
  type: string;
  color: string;
  date: string;
  time: string;
  repeat: string;
  formate: string;
  originalTime: {
    time: string;
  };
}

// Define una interfaz para los parámetros dinámicos
export interface GridItemTypeParams {
  [key: string]: any;
}

// Define el tipo principal con propiedades fijas y dinámicas
export type GridItemType<T extends GridItemTypeParams = {}> = {
  label: string;
  route: string;
  icon: string;
  color: string;
  params?: T;
};

export type RoutListTypeProps = {
  route?: any;
  navigation?: any;
};

export type RoutListType = {
  name: string;
  components: ({route}: RoutListTypeProps) => React.JSX.Element;
  config?: StackNavigationOptions;
};

interface ServiceDate {
  fecha: string;
  hora: string;
}

export type Service = {
  id: string;
  location: any;
  type: number;
  serviceId: string;
  date: ServiceDate;
};

export interface Register_AddressType {
  country: string;
  state: string;
  city: string;
  address: string;
}

export interface INitial_Register {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date: string;
  documentType: string;
  document: string;
  password: '';
}

export interface RegisterType extends Register_AddressType, INitial_Register {}

export type patientsType = {
  photo?: string;
  name?: string;
  document?: string;
  edad?: number;
  id?:string
};


export interface UserData {
  active: number;
  address: string;
  barrio: string;
  city: number;
  country: number;
  date: string;
  document: string;
  documentType: string;
  email: string;
  id_usuario: string;
  lastName: string;
  name: string;
  password: string;
  phoneNumber: string;
  photo: null | string;
  state: number;
  type: string;
  verified: number;
}

export interface VitalSignType {
  add_by: string;
  blood_pressure: {
    en: string;
    sobre: string;
  };
  blood_sugar_level: string;
  creation_date: string;
  heart_rate: string;
  id: number;
  patient_id: string;
  weight: string;
}
