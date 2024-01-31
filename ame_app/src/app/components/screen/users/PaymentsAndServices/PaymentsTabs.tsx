import React, {memo} from 'react';
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {colors} from '../../../../../constants/Constants';
import {PaymentsTabsList} from './util/PaymentsTabsList';
const Tab = createMaterialTopTabNavigator();

const configTab: MaterialTopTabNavigationOptions = {
  animationEnabled: true,
  swipeEnabled: true,

  tabBarContentContainerStyle: {
    backgroundColor: colors.primary,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: '700',
  },
};

const data = {
  solicitado: Array.from({length: 20}, (_, index) => ({
    title: `Solicitado ${index + 1}`,
    type: `Type ${index + 1}`,
    fecha: new Date(),
    id: index + 1,
  })),

  realzados: Array.from({length: 20}, (_, index) => ({
    title: `Realizado ${index + 1}`,
    type: `Type ${index + 1}`,
    fecha: new Date(),
    id: index + 1,
  })),

  cancelados: Array.from({length: 20}, (_, index) => ({
    title: `Cancelado1 ${index + 20}`,
    type: `Type ${index + 1}`,
    fecha: new Date(),
    id: index + 1,
  })),

  reclamacion: Array.from({length: 20}, (_, index) => ({
    title: `Reclamación ${index + 1}`,
    type: `Type ${index + 1}`,
    fecha: new Date(),
    id: index + 1,
  })),
};

export const PaymentsTabs = memo(() => {
  return (
    <Tab.Navigator screenOptions={configTab}>
      {PaymentsTabsList.map(({name = '', componente}, index) => (
        <Tab.Screen
          name={name}
          component={componente}
          key={index}
          initialParams={{data, name}}
        />
      ))}
    </Tab.Navigator>
  );
});

export default PaymentsTabs;
