import React from 'react';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import UserHomeScreen from '../../../screen/user/UserHomeScreen';
import {CustomBottomComponent} from './CustomBottomComponent';
import UserRemindersScreen from '../../../screen/user/UserRemindersScreen';
import RequestService from '../../../screen/user/ RequestService';
import {MiniHeader} from '../../../components/custom/MiniHeader';
import VitalSigne from '../../../screen/user/VitalSigne';

const Bottom = createBottomTabNavigator();

const bottomConfig: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
};

const CustomBottom = (props: BottomTabBarProps) => {
  return <CustomBottomComponent {...props} />;
};

const MyBottom = () => {
  return (
    <Bottom.Navigator screenOptions={{...bottomConfig}} tabBar={CustomBottom}>
      <Bottom.Screen component={UserHomeScreen} name="Inicio" />
      <Bottom.Screen component={UserRemindersScreen} name="Medicamentos" />
      <Bottom.Screen
        component={RequestService}
        name="Servicios"
        initialParams={{title: 'Solicitar servicio'}}
      />
      <Bottom.Screen
        component={VitalSigne}
        name="Signos"
        initialParams={{title: 'Signos vitales'}}
      />
    </Bottom.Navigator>
  );
};

export default MyBottom;
