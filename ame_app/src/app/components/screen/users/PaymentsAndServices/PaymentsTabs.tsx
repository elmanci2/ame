import React, {memo} from 'react';
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {colors} from '../../../../../constants/Constants';
import {PaymentsTabsList} from './util/PaymentsTabsList';
import {useFetch} from '../../../../hook/http/useFetch';
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

export const PaymentsTabs = memo(() => {
  const {data} = useFetch('allServicesUser', 'allServicesUser');

  return (
    <Tab.Navigator screenOptions={configTab}>
      {PaymentsTabsList.map(({name = 'hola', componente}, index) => (
        <Tab.Screen
          name={name}
          component={componente}
          key={index}
          initialParams={{data: data ?? [], name}}
        />
      ))}
    </Tab.Navigator>
  );
});

export default PaymentsTabs;
