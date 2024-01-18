import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';

export interface Reminder {
  id: number;
  mensaje: string;
  medicamento: string;
  dosis: number;
  unidad: string;
  type: string;
  color: string;
  date: string;
  time: string;
  repeat: number;
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
